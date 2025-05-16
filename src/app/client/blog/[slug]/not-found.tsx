export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog introuvable</h1>
        <p className="text-gray-600 mb-8">Le blog que vous recherchez n'existe pas ou a été supprimé.</p>
        <a href="/" className="text-primary hover:underline">
          Retourner à la liste des blogs
        </a>
      </div>
    </div>
  );
}
