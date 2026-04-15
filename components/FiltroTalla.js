"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FiltroTalla({ tallas, tallaActual, buscar }) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);

  const filtrar = (tallaSeleccionada) => {
  const params = new URLSearchParams(window.location.search);

  if (buscar) params.set("q", buscar);

  if (tallaSeleccionada) {
    params.set("talla", tallaSeleccionada);
  } else {
    params.delete("talla");
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
        {abierto ? "Cerrar tallas" : "Ver por talla"}
      </button>

      {/* CONTENEDOR */}
      <div
        className={`bg-white rounded-xl shadow-sm border p-3
        ${abierto ? "block" : "hidden"} md:block`}
      >
        <h2 className="font-semibold text-base mb-3 text-black">
          Talla
        </h2>

        <ul className="space-y-1 max-h-[250px] md:max-h-[350px] overflow-y-auto">

          {tallas.map(({ size, _count }) => {
            const activo = tallaActual === size;

            return (
              <li key={size}>
                <button
                  onClick={() => filtrar(activo ? "" : size)}
                  className={`flex justify-between items-center w-full px-2 py-1.5 rounded-md text-sm transition
                  ${
                    activo
                      ? "bg-black text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="truncate">{size}</span>

                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full
                    ${
                      activo
                        ? "bg-white text-black"
                        : "bg-gray-200 text-gray-700"
                    }
                  `}
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