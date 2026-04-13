import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-2xl">👟</span>
        <span className="text-xl font-bold tracking-wide">TapTap Store</span>
      </div>
      <div className="flex gap-6 text-sm">
        <Link href="/" className="hover:text-gray-300">Inicio</Link>
      </div>
    </nav>
  )
}