import AdminLogoutButton from '@/components/AdminLogoutButton';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ef] animate-fadeInUp">
      <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 drop-shadow-sm">Bienvenue sur le dashboard admin</h1>
      <p className="text-lg text-gray-600 mb-8 w-full text-center">Gérez vos articles, catégories et utilisateurs depuis une interface moderne et agréable.</p>
      <AdminLogoutButton />
      {/* Ici viendra la gestion des blogs et catégories */}
    </div>
  );
}
