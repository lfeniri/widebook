import React from "react";

const Footer = () => (  <footer className="footer animate-fadeInUp">
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      <div className="font-semibold tracking-wide">© {new Date().getFullYear()} widebook. Tous droits réservés.</div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-yellow-400 transition-colors">Mentions légales</a>
        <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
        <a href="#" className="hover:text-yellow-400 transition-colors">Instagram</a>
      </div>
    </div>
  </footer>
);

export default Footer;
