"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface UserProfile {
  email: string;
  role: string;
  name?: string;
  phone?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.replace("/admin/login");
        return;
      }
      // Fetch additional profile info from a custom table if needed
      let name = session.user.user_metadata?.name || "";
      let phone = session.user.user_metadata?.phone || "";
      let role = session.user.role || "";
      setUser({
        email: session.user.email ?? "",
        role,
        name,
        phone,
      });
      setLoading(false);
    }
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  if (loading) return <div className="p-8">Chargement…</div>;
  if (!user) return null;

  return (
    <main className="max-w-lg mx-auto mt-12 bg-white rounded shadow p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Profil utilisateur</h1>
      <div className="flex flex-col gap-2">
        <div><span className="font-semibold">Nom :</span> {user.name || <span className="italic text-gray-400">Non renseigné</span>}</div>
        <div><span className="font-semibold">Email :</span> {user.email}</div>
        <div><span className="font-semibold">Rôle :</span> {user.role}</div>
        <div><span className="font-semibold">Téléphone :</span> {user.phone || <span className="italic text-gray-400">Non renseigné</span>}</div>
      </div>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded font-semibold hover:bg-red-600 transition-colors mt-4">Se déconnecter</button>
    </main>
  );
}
