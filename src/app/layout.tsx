import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { StudentProvider } from '../components/ui/Studentcontext'; // Corrected the path

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Certificate Verification App',
  description: 'Verify student certificates and manage student data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StudentProvider> {/* Wrap your layout with StudentProvider */}
          <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">
                Certificate Verifier
              </Link>
              <div>
                <Link href="/" className="mr-4 hover:text-gray-300">
                  Home
                </Link>
                <Link href="/admin" className="hover:text-gray-300">
                  Admin
                </Link>
              </div>
            </div>
          </nav>
          <main className="container mx-auto mt-8 px-4">
            {children}
          </main>
        </StudentProvider>
      </body>
    </html>
  );
}
