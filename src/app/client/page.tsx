// Cette page est dépréciée. Redirection automatique vers la page d'accueil.
import { redirect } from 'next/navigation';

export default function DeprecatedClientPage() {
  redirect('/');
  return null;
}