import ProductoCard from './ProductoCard'

export default function ProductoGrid({ productos }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {productos.map((p) => (
        <ProductoCard key={p.id} producto={p} />
      ))}
    </div>
  )
}