import DashboardLayout from '@/components/layout/DashboardLayout';
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { slug: string[] } }) {
  const pathname = params?.slug?.join('/') || ''; // Construct the pathname from the slug array
  const isDashboard = pathname.startsWith('dashboard');

  return (
    <html lang="en">
      <body className="h-screen bg-gray-100">
        {/* Conditional Layout for Dashboard */}
        {isDashboard ? (
          <DashboardLayout>
            <main className="flex-1 p-6 overflow-auto">
              <div className="container mx-auto">{children}</div>
            </main>
          </DashboardLayout>
        ) : (
          // Default Layout for Non-Dashboard Pages
          <div className="flex h-full">
            <aside className="bg-gray-800 text-white w-64 p-6 hidden md:block">
              <h2 className="text-lg font-semibold mb-4">Navigation</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="block p-2 rounded hover:bg-gray-700">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </aside>

            <main className="flex-1 p-6 overflow-auto">
              <div className="container mx-auto">{children}</div>
            </main>
          </div>
        )}

        {/* Shared Footer */}
        <footer className="bg-gray-200 text-center p-4">
          <p>&copy; 2024 Pulppo</p>
        </footer>
      </body>
    </html>
  );
}