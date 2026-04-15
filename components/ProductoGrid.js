import ProductoCard from './ProductoCard'

export default function ProductoGrid({ productos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {productos.map((p) => (
        <ProductoCard key={p.id} producto={p} />
      ))}
    </div>
  )
}