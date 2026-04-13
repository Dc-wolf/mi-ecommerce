import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Buscador from '@/components/Buscador'
import ProductoGrid from '@/components/ProductoGrid'
import Paginacion from '@/components/Paginacion'

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
      <Navbar />
      <Buscador valorInicial={buscar} />
      <div className="px-8">
        <p className="text-gray-500 mb-4">{total} productos encontrados</p>
        <ProductoGrid productos={productos} />
        <Paginacion paginaActual={pagina} totalPaginas={totalPaginas} buscar={buscar} />
      </div>
    </main>
  )
}