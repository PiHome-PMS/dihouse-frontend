import { Link } from 'react-router';

/**
 * 404 Not Found page
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="mt-4 text-xl text-gray-600">Trang không tìm thấy</p>
      <Link
        to="/"
        className="mt-6 rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
      >
        Về trang chủ
      </Link>
    </main>
  );
}
