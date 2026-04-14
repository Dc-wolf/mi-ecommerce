'use client'
import { useRouter } from 'next/navigation'

export default function FiltroCategoria({ categorias, categoriaActual, buscar }) {
  const router = useRouter()

  const filtrar = (cat) => {
    const params = new URLSearchParams()
    if (buscar) params.set('q', buscar)
    if (cat) params.set('categoria', cat)
    params.set('pagina', '1')
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="w-56 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm p-4 border">
        <h2 className="font-semibold text-lg mb-4">Categorías</h2>

        <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          
          {/* TODAS */}
          <li>
            <button
              onClick={() => filtrar('')}
              className={`flex justify-between items-center w-full px-3 py-2 rounded-lg transition
                ${!categoriaActual 
                  ? 'bg-black text-white font-semibold' 
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              <span>Todas</span>
            </button>
          </li>

          {/* CATEGORÍAS */}
          {categorias.map(({ category, _count }) => {
            const activo = categoriaActual === category

            return (
              <li key={category}>
                <button
                  onClick={() => filtrar(category)}
                  className={`flex justify-between items-center w-full px-3 py-2 rounded-lg transition
                    ${activo 
                      ? 'bg-black text-white font-semibold shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  <span className="truncate">{category}</span>

                  <span className={`text-xs px-2 py-0.5 rounded-full
                    ${activo 
                      ? 'bg-white text-black' 
                      : 'bg-gray-200 text-gray-700'}
                  `}>
                    {_count}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}