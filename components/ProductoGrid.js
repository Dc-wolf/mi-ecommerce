"use client";
import { useState } from "react";
import ProductoCard from "./ProductoCard";
import ProductoModal from "./ProductoModal";

export default function ProductoGrid({ productos }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {productos.map((p) => (
          <div
            key={p.id}
            onClick={() => setProductoSeleccionado(p)}
            className="cursor-pointer"
          >
            <ProductoCard producto={p} />
          </div>
        ))}
      </div>

      {productoSeleccionado && (
        <ProductoModal
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
        />
      )}
    </>
  );
}