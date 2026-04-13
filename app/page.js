import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home({ searchParams }) {
  const buscar = searchParams?.q || ''
  const pagina = parseInt(searchParams?.pagina || '1')
  const porPagina = 12

  const total = await prisma.product.count({
    where: {
      status: 'active',
      visibility: 'public',
      name: { contains: buscar }
    }
  })

  const productos = await prisma.product.findMany({
    where: {
      status: 'active',
      visibility: 'public',
      name: { contains: buscar }
    },
    skip: (pagina - 1) * porPagina,
    take: porPagina,
    orderBy: { createdAt: 'desc' }
  })

  const totalPaginas = Math.ceil(total / porPagina)

  return (
    <main className="min-h-screen bg-gray-50">

      {/* NAV */}
      <nav className="bg-black text-white px-8 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👟</span>
          <span className="text-xl font-bold tracking-wide">TapTap Store</span>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-gray-300">Inicio</Link>
          <Link href="/" className="hover:text-gray-300">Productos</Link>
          <Link href="/" className="hover:text-gray-300">Contacto</Link>
        </div>
      </nav>

      {/* HEADER con buscador */}
      <div className="bg-white shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-center mb-4">Ropa Deportiva</h1>
        <form className="flex justify-center">
          <input
            type="text"
            name="q"
            defaultValue={buscar}
            placeholder="Buscar productos..."
            className="border rounded-l-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-r-lg hover:bg-gray-800"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Resultados */}
      <div className="px-8">
        <p className="text-gray-500 mb-4">{total} productos encontrados</p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((p) => (
            <div key={p.id} className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden">
              <img
                src={p.image || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-sm font-semibold line-clamp-2 mb-1">{p.name}</h2>
                <p className="text-xs text-gray-400 mb-2 line-clamp-1">{p.description}</p>
                <p className="text-green-600 font-bold text-lg">Bs. {p.price}</p>
                <p className="text-xs text-gray-400">Stock: {p.stock}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center gap-2 mt-10 mb-10">
          {pagina > 1 && (
            <Link
              href={`/?pagina=${pagina - 1}&q=${buscar}`}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              ← Anterior
            </Link>
          )}

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <Link
              key={num}
              href={`/?pagina=${num}&q=${buscar}`}
              className={`px-4 py-2 rounded-lg border ${
                num === pagina
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {num}
            </Link>
          ))}

          {pagina < totalPaginas && (
            <Link
              href={`/?pagina=${pagina + 1}&q=${buscar}`}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Siguiente →
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}