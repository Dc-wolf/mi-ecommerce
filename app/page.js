import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Buscador from "@/components/Buscador";
import ProductoGrid from "@/components/ProductoGrid";
import Paginacion from "@/components/Paginacion";
import FiltroCategoria from "@/components/FiltroCategoria";
import FiltroColor from "@/components/FiltroColor";
import FiltroTalla from "@/components/FiltroTalla";
import FiltroPrecio from "@/components/FiltroPrecio";

export default async function Home({ searchParams }) {
  const buscar = searchParams?.q || "";
  const pagina = parseInt(searchParams?.pagina || "1");
  const categoria = searchParams?.categoria || "";
  const color = searchParams?.color || "";
  const talla = searchParams?.talla || "";
  const precioMin = searchParams?.precioMin ? parseInt(searchParams.precioMin) : null;
  const precioMax = searchParams?.precioMax ? parseInt(searchParams.precioMax) : null;

  const porPagina = 12;

  const where = {
    status: "active",
    visibility: "public",
    name: { contains: buscar },
    ...(categoria && { category: categoria }),
    ...(color && { description: { contains: color } }),
    ...(talla && { description: { contains: talla } }),
  };

  if (precioMin !== null && precioMax !== null) {
    where.price = { gte: precioMin, lte: precioMax };
  } else if (precioMin !== null) {
    where.price = { gte: precioMin };
  } else if (precioMax !== null) {
    where.price = { lte: precioMax };
  }

  const [total, productos, categorias, colores, tallas] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip: (pagina - 1) * porPagina,
      take: porPagina,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.groupBy({
      by: ["category"],
      where: { status: "active", visibility: "public" },
      _count: true,
      orderBy: { category: "asc" },
    }),
    // Lista fija de colores basada en tus descripciones
    Promise.resolve([
      { color: "Negro", _count: 0 },
      { color: "Azul", _count: 0 },
      { color: "Rojo", _count: 0 },
      { color: "Verde", _count: 0 },
      { color: "Rosado", _count: 0 },
      { color: "Blanco", _count: 0 },
      { color: "Cafe", _count: 0 },
      { color: "Plomo", _count: 0 },
      { color: "Beige", _count: 0 },
      { color: "Celeste", _count: 0 },
    ]),
    // Lista fija de tallas
    Promise.resolve([
      { size: "S", _count: 0 },
      { size: "M", _count: 0 },
      { size: "L", _count: 0 },
    ]),
  ]);

  const totalPaginas = Math.ceil(total / porPagina);

  const precioActual =
    precioMin !== null || precioMax !== null
      ? { min: precioMin, max: precioMax }
      : null;

 return (
  <main className="min-h-screen bg-gray-50">
    <Navbar />
    <Buscador valorInicial={buscar} />

    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 mt-4">
      
      <aside className="w-full md:w-64 md:shrink-0 space-y-6">
        <FiltroCategoria
          categorias={categorias}
          categoriaActual={categoria}
          buscar={buscar}
        />
        <FiltroColor colores={colores} colorActual={color} buscar={buscar} />
        <FiltroTalla tallas={tallas} tallaActual={talla} buscar={buscar} />
        <FiltroPrecio precioActual={precioActual} buscar={buscar} />
      </aside>

      <div className="flex-1 min-w-0">
        <p className="text-gray-500 mb-4">{total} productos encontrados</p>
        <ProductoGrid productos={productos} />
        <Paginacion
          paginaActual={pagina}
          totalPaginas={totalPaginas}
          buscar={buscar}
        />
      </div>

    </div>
  </main>
);
}