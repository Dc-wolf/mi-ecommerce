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

  // 🔥 FILTRO PRINCIPAL (COMBINADO)
  const where = {
    status: "active",
    visibility: "public",

    ...(buscar && {
      name: { contains: buscar },
    }),

    ...(categoria && { category: categoria }),

    ...(color && {
      description: { contains:`color ${color}`},
    }),

    ...(talla && {
      description: { contains: `talla ${talla}` },
    }),
  };

  if (precioMin !== null && precioMax !== null) {
    where.price = { gte: precioMin, lte: precioMax };
  } else if (precioMin !== null) {
    where.price = { gte: precioMin };
  } else if (precioMax !== null) {
    where.price = { lte: precioMax };
  }

  // 🔹 LISTAS
  const listaColores = ["negro","azul","celeste","rojo","verde","rosado","blanco","cafe","plomo","beige"];
  const listaTallas = ["s","m","l"];

  // 🔥 COLORES (SIN USAR EL MISMO FILTRO)
  const colores = [];
  for (const c of listaColores) {
    const count = await prisma.product.count({
      where: {
        status: "active",
        visibility: "public",

        ...(buscar && { name: { contains: buscar } }),
        ...(categoria && { category: categoria }),
        ...(talla && { description: { contains: talla } }),

        ...(precioMin !== null || precioMax !== null
          ? {
              price:
                precioMin !== null && precioMax !== null
                  ? { gte: precioMin, lte: precioMax }
                  : precioMin !== null
                  ? { gte: precioMin }
                  : { lte: precioMax },
            }
          : {}),

        description: { contains: c },
      },
    });

    colores.push({
      color: c.charAt(0).toUpperCase() + c.slice(1),
      _count: count,
    });
  }

  // 🔥 TALLAS (SIN USAR TALLA MISMA)
  const tallas = [];
  for (const t of listaTallas) {
    const count = await prisma.product.count({
      where: {
        status: "active",
        visibility: "public",

        ...(buscar && { name: { contains: buscar } }),
        ...(categoria && { category: categoria }),
        ...(color && { description: { contains: color } }),

        ...(precioMin !== null || precioMax !== null
          ? {
              price:
                precioMin !== null && precioMax !== null
                  ? { gte: precioMin, lte: precioMax }
                  : precioMin !== null
                  ? { gte: precioMin }
                  : { lte: precioMax },
            }
          : {}),

        description: { contains: t },
      },
    });

    tallas.push({
      size: t.toUpperCase(),
      _count: count,
    });
  }

  // 🔥 DATA PRINCIPAL
  const total = await prisma.product.count({ where });

  const productos = await prisma.product.findMany({
    where,
    skip: (pagina - 1) * porPagina,
    take: porPagina,
    orderBy: { createdAt: "desc" },
  });

  const categorias = await prisma.product.groupBy({
    by: ["category"],
    where: { status: "active", visibility: "public" },
    _count: true,
  });

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

        <aside className="w-full md:w-64 space-y-6">
          <FiltroCategoria categorias={categorias} categoriaActual={categoria} buscar={buscar} />
          <FiltroColor colores={colores} colorActual={color} buscar={buscar} />
          <FiltroTalla tallas={tallas} tallaActual={talla} buscar={buscar} />
          <FiltroPrecio precioActual={precioActual} buscar={buscar} />
        </aside>

        <div className="flex-1">
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