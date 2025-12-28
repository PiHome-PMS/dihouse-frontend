import { Logo } from '@/components/common/Logo';
import { Card, CardContent } from '@/components/ui';
import { Outlet } from 'react-router';

/**
 * Auth layout - centered card for login/register pages
 */
export default function AuthLayout() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-8">
          <div className="mb-8 text-center">
            <Logo className="mx-auto text-2xl" />
          </div>
          <Outlet />
        </CardContent>
      </Card>
    </main>
  );
}
