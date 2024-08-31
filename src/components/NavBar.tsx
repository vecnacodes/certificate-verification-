import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">CertifyMe</Link>
        <div>
          <Link href="/" className="mr-4 hover:text-indigo-200">Home</Link>
          <Link href="/admin" className="hover:text-indigo-200">Admin</Link>
        </div>
      </div>
    </nav>
  )
}