import { AuthProvider } from '@/components/AuthContext';
import AdminNavigation from '@/components/AdminNavigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminNavigation />
      <main className="pt-8 pb-16 min-h-screen bg-gray-50">
        {children}
      </main>
    </AuthProvider>
  );
}
