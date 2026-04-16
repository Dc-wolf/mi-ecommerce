"use client";
import { useState } from "react";

function generarGaleria(producto) {
  // si tiene imágenes en BD
  if (producto.image && producto.image.includes(",")) {
    return producto.image.split(",");
  }

  // si tiene solo 1 imagen
  if (producto.image && producto.image.trim() !== "") {
    return [
      producto.image,
      producto.image,
      producto.image,
    ];
  }

  // 🔥 si no tiene → generar galería automática
  return [
    `https://picsum.photos/400/300?random=${producto.id}a`,
    `https://picsum.photos/400/300?random=${producto.id}b`,
    `https://picsum.photos/400/300?random=${producto.id}c`,
  ];
}

export default function ProductoModal({ producto, onClose }) {
  const imagenes = generarGaleria(producto);
  const [imagenActiva, setImagenActiva] = useState(imagenes[0]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-xl max-w-lg w-full p-4 relative">
        
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black text-xl"
        >
          ✕
        </button>

        {/* IMAGEN PRINCIPAL */}
        <img
          src={imagenActiva}
          className="w-full h-60 object-cover rounded-lg mb-3"
        />

        {/* GALERÍA */}
        <div className="grid grid-cols-3 gap-2 mb-4 justify-items-center">
          {imagenes.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setImagenActiva(img)}
              className={`w-16 h-16 object-cover rounded cursor-pointer border
                ${imagenActiva === img ? "border-black" : "border-gray-200"}
              `}
            />
          ))}
        </div>

        {/* INFO */}
        <h2 className="text-xl font-bold mb-2">
          {producto.name}
        </h2>

        <p className="text-gray-600 mb-3">
          {producto.description || "Sin descripción"}
        </p>

        <p className="text-green-600 font-bold text-lg">
          Bs. {producto.price}
        </p>

        <p className="text-sm text-gray-500">
          Stock: {producto.stock}
        </p>

      </div>
    </div>
  );
}