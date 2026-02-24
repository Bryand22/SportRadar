import { Link } from "react-router-dom";
import { Activity, Instagram, Twitter, Facebook, Mail } from "lucide-react";

export default function Footer() {
  const resetCookies = () => {
    localStorage.removeItem('sportradar-cookie-consent');
    window.location.reload();
  };

  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-8 w-8 text-primary-300" />
              <span className="text-xl font-montserrat font-bold text-white">
                Sport<span className="text-primary-300">Radar</span>
              </span>
            </div>
            <p className="text-neutral-200 mb-6 leading-relaxed">
              Votre coach numérique d'activités sportives locales, basé sur le
              bien-être, la proximité et la personnalisation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-200 hover:text-primary-300 transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" className="text-neutral-200 hover:text-primary-300 transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="text-neutral-200 hover:text-primary-300 transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="mailto:contact@sportradar.com" className="text-neutral-200 hover:text-primary-300 transition-colors" aria-label="Mail"><Mail size={20} /></a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h6 className="font-montserrat font-bold mb-4 text-white text-lg">Liens rapides</h6>
            <ul className="space-y-3">
              <li><Link to="/" className="text-neutral-200 hover:text-primary-300 transition-colors">Accueil</Link></li>
              <li><Link to="/discover" className="text-neutral-200 hover:text-primary-300 transition-colors">Découvrir</Link></li>
              <li><Link to="/business-info" className="text-neutral-200 hover:text-primary-300 transition-colors">Entreprise</Link></li>
              {/* AJOUT DU LIEN COACHS ICI */}
              <li><Link to="/partenaires" className="text-primary-300 font-semibold hover:text-primary-200 transition-colors">Espace Coachs & Assos</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h6 className="font-montserrat font-bold mb-4 text-white text-lg">Informations légales</h6>
            <ul className="space-y-3">
              <li><Link to="/cgv" className="text-neutral-200 hover:text-primary-300 transition-colors">Conditions de Vente (CGV)</Link></li>
              <li><Link to="/politique-confidentialite" className="text-neutral-200 hover:text-primary-300 transition-colors">Politique de confidentialité</Link></li>
              <li><Link to="/mentions-legales" className="text-neutral-200 hover:text-primary-300 transition-colors">Mentions légales</Link></li>
              <li><button onClick={resetCookies} className="text-neutral-200 hover:text-primary-300 transition-colors text-left">Gestion des cookies</button></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h6 className="font-montserrat font-bold mb-4 text-white text-lg">Contact</h6>
            <p className="text-neutral-200 mb-4">Une question ? N'hésitez pas à nous contacter !</p>
            <a href="mailto:contact@sportradar.com" className="text-primary-300 font-bold hover:text-primary-200 transition-colors underline decoration-2 underline-offset-4">
              contact@sportradar.com
            </a>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-12 pt-6 text-center text-neutral-300 text-sm">
          <p>© {new Date().getFullYear()} SportRadar. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}