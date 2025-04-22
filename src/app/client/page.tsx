// Cette page est dépréciée. Redirection automatique vers /blogs.
import { redirect } from 'next/navigation';

export default function DeprecatedClientPage() {
  redirect('/blogs');
  return null;
}