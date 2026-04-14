import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Buscador from '@/components/Buscador'
import ProductoGrid from '@/components/ProductoGrid'
import Paginacion from '@/components/Paginacion'
import FiltroCategoria from '@/components/FiltroCategoria'

export default async function Home({ searchParams }) {
  const buscar = searchParams?.q || ''
  const pagina = parseInt(searchParams?.pagina || '1')
  const categoria = searchParams?.categoria || ''
  const porPagina = 12

  const where = {
    status: 'active',
    visibility: 'public',
    name: { contains: buscar },
    ...(categoria && { category: categoria })
  }

  const [total, productos, categorias] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      skip: (pagina - 1) * porPagina,
      take: porPagina,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.product.groupBy({
      by: ['category'],
      where: { status: 'active', visibility: 'public' },
      _count: true,
      orderBy: { category: 'asc' }
    })
  ])

  const totalPaginas = Math.ceil(total / porPagina)

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Buscador valorInicial={buscar} />
      <div className="flex gap-8 px-8 mt-4">
        <FiltroCategoria 
          categorias={categorias} 
          categoriaActual={categoria}
          buscar={buscar}
        />
        <div className="flex-1">
          <p className="text-gray-500 mb-4">{total} productos encontrados</p>
          <ProductoGrid productos={productos} />
          <Paginacion paginaActual={pagina} totalPaginas={totalPaginas} buscar={buscar} />
        </div>
      </div>
    </main>
  )
}