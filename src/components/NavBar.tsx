import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const { pathname } = router

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          CertifyMe
        </Link>
        <div>
          <Link
            href="/"
            className={`mr-4 hover:text-indigo-200 ${pathname === '/' ? 'text-indigo-300' : ''}`}
            aria-label="Home"
          >
            Home
          </Link>
          <Link
            href="/admin"
            className={`hover:text-indigo-200 ${pathname === '/admin' ? 'text-indigo-300' : ''}`}
            aria-label="Admin"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
