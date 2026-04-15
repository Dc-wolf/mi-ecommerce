"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FiltroPrecio({ precioActual, buscar }) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);

  const rangosPrecio = [
    { label: "Bs. 15 - Bs. 50", min: 15, max: 50 },
    { label: "Bs. 50 - Bs. 100", min: 50, max: 100 },
    { label: "Bs. 100 - Bs. 200", min: 100, max: 200 },
    { label: "Bs. 200 - Bs. 325", min: 200, max: 325 },
    { label: "Bs. 325+", min: 325, max: null },
  ];

  const filtrar = (min, max) => {
  const params = new URLSearchParams(window.location.search);

  if (buscar) params.set("q", buscar);

  if (min !== null) params.set("precioMin", min);
  else params.delete("precioMin");

  if (max !== null) params.set("precioMax", max);
  else params.delete("precioMax");

  params.set("pagina", "1");

  router.push(`/?${params.toString()}`);
  setAbierto(false);
};

const limpiar = () => {
  const params = new URLSearchParams(window.location.search);

  if (buscar) params.set("q", buscar);

  params.delete("precioMin");
  params.delete("precioMax");

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
        {abierto ? "Cerrar precio" : "Ver por precio"}
      </button>

      {/* CONTENEDOR */}
      <div
        className={`bg-white rounded-xl shadow-sm border p-3
        ${abierto ? "block" : "hidden"} md:block`}
      >
        <h2 className="font-semibold text-base mb-3 text-black">
          Precio
        </h2>

        <ul className="space-y-1 max-h-[250px] md:max-h-[350px] overflow-y-auto">
          {rangosPrecio.map((r) => {
            const activo =
              precioActual?.min === r.min &&
              precioActual?.max === r.max;

            return (
              <li key={r.label}>
                <button
                  onClick={() =>
                    activo ? limpiar() : filtrar(r.min, r.max)
                  }
                  className={`flex justify-between items-center w-full px-2 py-1.5 rounded-md text-sm transition
                  ${
                    activo
                      ? "bg-black text-white font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>{r.label}</span>

                  {activo && (
                    <span className="text-[10px] bg-white text-black px-1.5 py-0.5 rounded-full">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}