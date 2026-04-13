export default function Buscador({ valorInicial }) {
  return (
    <div className="bg-white shadow-sm p-6 mb-6">
      <h1 className="text-2xl font-bold text-center mb-4">Ropa Deportiva</h1>
      <form className="flex justify-center">
        <input
          type="text"
          name="q"
          defaultValue={valorInicial}
          placeholder="Buscar productos..."
          className="border rounded-l-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
        />
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-r-lg hover:bg-gray-800">
          Buscar
        </button>
      </form>
    </div>
  )
}