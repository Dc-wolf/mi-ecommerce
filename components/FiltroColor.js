"use client";
import { useRouter } from "next/navigation";

export default function FiltroColor({ colores, colorActual, buscar }) {
  const router = useRouter();

  const filtrar = (colorSeleccionado) => {
    const params = new URLSearchParams();
    if (buscar) params.set("q", buscar);
    if (colorSeleccionado) params.set("color", colorSeleccionado);
    params.set("pagina", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border">
      <h2 className="font-semibold text-lg mb-4 text-black">COLOR</h2>
      <ul className="space-y-2">
        {colores.map(({ color, _count }) => {
          const activo = colorActual === color;
          return (
            <li key={color}>
              <button
                onClick={() => filtrar(activo ? "" : color)}
                className={`flex justify-between items-center w-full px-3 py-2 rounded-lg transition
                  ${activo ? "bg-black text-white font-semibold shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <span className="truncate">{color}</span>
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