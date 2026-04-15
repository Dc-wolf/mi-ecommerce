"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FiltroColor({ colores, colorActual, buscar }) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);

  const filtrar = (colorSeleccionado) => {
  const params = new URLSearchParams(window.location.search);

  if (buscar) params.set("q", buscar);

  if (colorSeleccionado) {
    params.set("color", colorSeleccionado);
  } else {
    params.delete("color");
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
        {abierto ? "Cerrar colores" : "Ver por color"}
      </button>

      {/* CONTENEDOR */}
      <div
        className={`bg-white rounded-xl shadow-sm border p-3
        ${abierto ? "block" : "hidden"} md:block`}
      >
        <h2 className="font-semibold text-base mb-3 text-black">
          Color
        </h2>

        <ul className="space-y-1 max-h-[250px] md:max-h-[350px] overflow-y-auto">

          {colores.map(({ color, _count }) => {
            const activo = colorActual === color;

            return (
              <li key={color}>
                <button
                  onClick={() => filtrar(activo ? "" : color)}
                  className={`flex justify-between items-center w-full px-2 py-1.5 rounded-md text-sm transition
                  ${
                    activo
                      ? "bg-black text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="truncate">{color}</span>

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