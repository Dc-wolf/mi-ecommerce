import Link from 'next/link'

export default function Paginacion({ paginaActual, totalPaginas, buscar }) {
  const q = buscar ? `&q=${buscar}` : '';

  // En móvil solo muestra páginas cercanas a la actual
  const paginasVisibles = Array.from({ length: totalPaginas }, (_, i) => i + 1).filter((num) => {
    if (totalPaginas <= 5) return true;
    if (num === 1 || num === totalPaginas) return true;
    if (Math.abs(num - paginaActual) <= 1) return true;
    return false;
  });

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 mt-10 mb-10 px-4">
      {/* Botón Anterior */}
      {paginaActual > 1 ? (
        <Link
          href={`/?pagina=${paginaActual - 1}${q}`}
          className="px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
        >
          ← <span className="hidden sm:inline">Anterior</span>
        </Link>
      ) : (
        <span className="px-3 py-2 bg-gray-200 text-gray-400 rounded-lg text-sm cursor-not-allowed">
          ←
        </span>
      )}

      {/* Números de página */}
      {paginasVisibles.map((num, index) => {
        const anterior = paginasVisibles[index - 1];
        const hayEllipsis = anterior && num - anterior > 1;

        return (
          <span key={num} className="flex items-center gap-1">
            {hayEllipsis && (
              <span className="px-2 py-2 text-gray-400 text-sm">...</span>
            )}
            <Link
              href={`/?pagina=${num}${q}`}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                num === paginaActual
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              {num}
            </Link>
          </span>
        );
      })}

      {/* Botón Siguiente */}
      {paginaActual < totalPaginas ? (
        <Link
          href={`/?pagina=${paginaActual + 1}${q}`}
          className="px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
        >
          <span className="hidden sm:inline">Siguiente</span> →
        </Link>
      ) : (
        <span className="px-3 py-2 bg-gray-200 text-gray-400 rounded-lg text-sm cursor-not-allowed">
          →
        </span>
      )}
    </div>
  )
}