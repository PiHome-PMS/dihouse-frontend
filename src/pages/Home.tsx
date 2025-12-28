import { Link } from 'react-router';

/**
 * Home page - public landing page
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-brand-500">DiHouse</h1>
      <p className="mt-2 text-gray-600">Chào mừng đến với DiHouse</p>
      <nav className="mt-6 flex gap-4" aria-label="Điều hướng chính">
        <Link
          to="/login"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Đăng nhập
        </Link>
        <Link
          to="/dashboard"
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          Dashboard
        </Link>
      </nav>
    </main>
  );
}
