"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FiltroCategoria({
  categorias,
  categoriaActual,
  buscar,
}) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);

  const filtrar = (cat) => {
  const params = new URLSearchParams(window.location.search);

  if (buscar) params.set("q", buscar);

  if (cat) {
    params.set("categoria", cat);
  } else {
    params.delete("categoria");
  }

  params.set("pagina", "1");

  router.push(`/?${params.toString()}`);
  setAbierto(false);
};

  return (
    <div className="w-full md:w-56 md:shrink-0">

      {/* BOTÓN MÓVIL */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="md:hidden w-full mb-3 px-3 py-2 bg-black text-white rounded-lg text-sm font-medium"
      >
        {abierto ? "Cerrar filtros" : "Ver categorías"}
      </button>

      {/* CONTENEDOR */}
      <div
        className={`bg-white rounded-xl shadow-sm border p-3
        ${abierto ? "block" : "hidden"} md:block`}
      >
        <h2 className="font-semibold text-base mb-3 text-black">
          Categorías
        </h2>

        <ul className="space-y-1 max-h-[250px] md:max-h-[350px] overflow-y-auto">

          {/* TODAS */}
          <li>
            <button
              onClick={() => filtrar("")}
              className={`flex justify-between items-center w-full px-2 py-1.5 rounded-md text-sm transition
              ${
                !categoriaActual
                  ? "bg-black text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>Todas</span>
            </button>
          </li>

          {/* CATEGORÍAS */}
          {categorias.map(({ category, _count }) => {
            const activo = categoriaActual === category;

            return (
              <li key={category}>
                <button
                  onClick={() => filtrar(category)}
                  className={`flex justify-between items-center w-full px-2 py-1.5 rounded-md text-sm transition
                  ${
                    activo
                      ? "bg-black text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="truncate">{category}</span>

                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full
                    ${
                      activo
                        ? "bg-white text-black"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {_count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}