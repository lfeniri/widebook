import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4 animate-fadeInUp">
      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center gap-10 mb-16 animate-fadeInUp">
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-2 leading-tight drop-shadow-sm">
            widebook&nbsp;: Le blog qui inspire et fait progresser
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-xl">
            Plateforme collaborative de partage d’articles, conseils et retours d’expérience pour tous les passionnés d’apprentissage et de développement personnel.
          </p>
          <a href="/blogs" className="btn w-fit animate-fadeIn delay-200">Découvrir les blogs</a>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="/globe.svg" alt="Inspiration" width={320} height={320} className="w-80 h-80 object-contain drop-shadow-lg animate-fadeIn" />
        </div>
      </section>
      <section className="w-full flex flex-col items-center gap-6 animate-fadeInUp">
        <h2 className="text-2xl font-bold mb-2">Pourquoi widebook&nbsp;?</h2>
        <ul className="grid md:grid-cols-3 gap-8 w-full">
          <li className="card flex flex-col items-center gap-2 p-6 animate-fadeInUp">
            <Image src="/file.svg" alt="Qualité" width={48} height={48} />
            <span className="font-semibold text-lg">Contenus de qualité</span>
            <span className="text-gray-500 text-center">Des articles rédigés par des experts et passionnés, validés par notre équipe.</span>
          </li>
          <li className="card flex flex-col items-center gap-2 p-6 animate-fadeInUp" style={{ animationDelay: '80ms' }}>
            <Image src="/window.svg" alt="Communauté" width={48} height={48} />
            <span className="font-semibold text-lg">Communauté active</span>
            <span className="text-gray-500 text-center">Partagez, commentez et échangez avec d’autres membres autour de vos sujets favoris.</span>
          </li>
          <li className="card flex flex-col items-center gap-2 p-6 animate-fadeInUp" style={{ animationDelay: '160ms' }}>
            <Image src="/globe.svg" alt="Accessibilité" width={48} height={48} />
            <span className="font-semibold text-lg">Accessible à tous</span>
            <span className="text-gray-500 text-center">Une plateforme intuitive, responsive et ouverte à tous les curieux et créateurs.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
