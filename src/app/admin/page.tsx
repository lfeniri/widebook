import AdminLogoutButton from '@/components/AdminLogoutButton';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur le dashboard admin</h1>
      <AdminLogoutButton />
      {/* Ici viendra la gestion des blogs et catégories */}
    </div>
  );
}
