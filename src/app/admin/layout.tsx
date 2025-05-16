import { AuthProvider } from '@/components/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <main className="pt-8 pb-16 min-h-screen bg-gray-50">
        {children}
      </main>
    </AuthProvider>
  );
}
