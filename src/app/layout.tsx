import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">Pulppo Dashboard</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:underline">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="hover:underline">
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex h-full">
          <aside className="bg-gray-800 text-white w-64 p-6 hidden md:block">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="block p-2 rounded hover:bg-gray-700">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="block p-2 rounded hover:bg-gray-700">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/settings" className="block p-2 rounded hover:bg-gray-700">
                  Settings
                </Link>
              </li>
            </ul>
          </aside>

          <main className="flex-1 p-6 overflow-auto">
            <div className="container mx-auto">{children}</div>
          </main>
        </div>

        <footer className="bg-gray-200 text-center p-4">
          <p>&copy; 2024 Pulppo</p>
        </footer>
      </body>
    </html>
  );
}