"use client";
import { useRouter } from "next/navigation";

export default function FiltroPrecio({ precioActual, buscar }) {
  const router = useRouter();

  const rangosPrecio = [
    { label: "EGP15 - EGP25", min: 15, max: 25 },
    { label: "EGP25 - EGP50", min: 25, max: 50 },
    { label: "EGP50+", min: 50, max: null },
  ];

  const filtrar = (min, max) => {
    const params = new URLSearchParams();
    if (buscar) params.set("q", buscar);
    params.set("precioMin", min);
    if (max !== null) params.set("precioMax", max);
    params.set("pagina", "1");
    router.push(`/?${params.toString()}`);
  };

  const limpiar = () => {
    const params = new URLSearchParams();
    if (buscar) params.set("q", buscar);
    params.set("pagina", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border">
      <h2 className="font-semibold text-lg mb-4 text-black">PRECIO</h2>
      <ul className="space-y-2">
        {rangosPrecio.map((r) => {
          const activo = precioActual?.min === r.min && precioActual?.max === r.max;
          return (
            <li key={r.label}>
              <button
                onClick={() => activo ? limpiar() : filtrar(r.min, r.max)}
                className={`flex justify-between items-center w-full px-3 py-2 rounded-lg transition
                  ${activo ? "bg-black text-white font-semibold shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}
              >
                <span>{r.label}</span>
                {activo && <span className="text-xs bg-white text-black px-2 py-0.5 rounded-full">✓</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}