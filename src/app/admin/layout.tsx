import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Vérification de la session côté serveur (Next.js App Router)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /*if (!session) {
    redirect('/admin/login');
  }*/

  return <>{children}</>;
}
