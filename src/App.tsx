import { AuthProvider, PermissionProvider, QueryProvider, ThemeProvider } from '@/providers';
import { router } from '@/routes';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router';

/**
 * Error fallback component for root error boundary
 */
function ErrorFallback({
  error,
  resetErrorBoundary,
}: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-semibold text-red-600">Đã xảy ra lỗi</h1>
      <p className="text-gray-600">{error.message}</p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Thử lại
      </button>
    </div>
  );
}

/**
 * Loading fallback for Suspense
 */
function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-gray-500">Đang tải...</div>
    </div>
  );
}

/**
 * App root component with providers and error boundary
 */
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <PermissionProvider>
              <Suspense fallback={<LoadingFallback />}>
                <RouterProvider router={router} />
              </Suspense>
            </PermissionProvider>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
