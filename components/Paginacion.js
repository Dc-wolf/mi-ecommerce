import Link from 'next/link'

export default function Paginacion({ paginaActual, totalPaginas, buscar }) {
  return (
    <div className="flex justify-center gap-2 mt-10 mb-10">
      {paginaActual > 1 && (
        <Link href={`/?pagina=${paginaActual - 1}&q=${buscar}`} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          ← Anterior
        </Link>
      )}
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
        <Link
          key={num}
          href={`/?pagina=${num}&q=${buscar}`}
          className={`px-4 py-2 rounded-lg border ${num === paginaActual ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
        >
          {num}
        </Link>
      ))}
      {paginaActual < totalPaginas && (
        <Link href={`/?pagina=${paginaActual + 1}&q=${buscar}`} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Siguiente →
        </Link>
      )}
    </div>
  )
}