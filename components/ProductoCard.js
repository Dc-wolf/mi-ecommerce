export default function ProductoCard({ producto }) {
  return (
    <div className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={producto.image || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
        alt={producto.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-sm font-semibold line-clamp-2 mb-1">{producto.name}</h2>
        <p className="text-xs text-gray-400 mb-2 line-clamp-1">{producto.description}</p>
        <p className="text-green-600 font-bold text-lg">Bs. {producto.price}</p>
        <p className="text-xs text-gray-400">Stock: {producto.stock}</p>
      </div>
    </div>
  )
}