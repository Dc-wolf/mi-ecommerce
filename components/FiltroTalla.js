"use client";
import { useRouter } from "next/navigation";

export default function FiltroTalla({ tallas, tallaActual, buscar }) {
  const router = useRouter();

  const filtrar = (tallaSeleccionada) => {
    const params = new URLSearchParams();
    if (buscar) params.set("q", buscar);
    if (tallaSeleccionada) params.set("talla", tallaSeleccionada);
    params.set("pagina", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border">
      <h2 className="font-semibold text-lg mb-4 text-black">TALLA</h2>
      <ul className="space-y-2">
        {tallas.map(({ size, _count }) => {
          const activo = tallaActual === size;
          return (
            <li key={size}>
              <button
                onClick={() => filtrar(activo ? "" : size)}
                className={`flex justify-between items-center w-full px-3 py-2 rounded-lg transition
                  ${activo ? "bg-black text-white font-semibold shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <span className="truncate">{size}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activo ? "bg-white text-black" : "bg-gray-200 text-gray-700"}`}>
                  {_count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}