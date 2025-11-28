import { Link } from "react-router-dom";
import { Activity, Instagram, Twitter, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-8 w-8 text-primary-300" />
              <span className="text-xl font-montserrat font-bold text-white">
                Sport<span className="text-primary-300">Radar</span>
              </span>
            </div>
            <p className="text-neutral-300 mb-6">
              Votre coach numérique d'activités sportives locales, basé sur le
              bien-être, la proximité et la personnalisation.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-300 hover:text-primary-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-300 hover:text-primary-300 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-300 hover:text-primary-300 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-neutral-300 hover:text-primary-300 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-1">
            <h6 className="font-montserrat font-semibold mb-4 text-white">
              Liens rapides
            </h6>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/discover"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  Découvrir
                </Link>
              </li>
              <li>
                <Link
                  to="/business-info"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  Entreprise
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  Inscription
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h6 className="font-montserrat font-semibold mb-4 text-white">
              Informations légales
            </h6>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <Link
                  to="/politique-confidentialite"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  to="/mentions-legales"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-neutral-300 hover:text-primary-300 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h6 className="font-montserrat font-semibold mb-4 text-white">
              Contact
            </h6>
            <p className="text-neutral-300 mb-4">
              Une question ? N'hésitez pas à nous contacter !
            </p>
            <a
              href="mailto:contact@sportzen.fr"
              className="text-primary-300 hover:text-primary-400 transition-colors"
            >
              contact@sportzen.fr
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-700 mt-12 pt-6 text-center text-neutral-400 text-sm">
          <p>© {new Date().getFullYear()} SportRadar. Tous droits réservés.</p>
        </div>
      </div>
      {/* Liens secondaires */}
      <div className="mt-4 text-sm">
        <Link
          to="/mentions-legales"
          className="text-neutral-500 hover:text-neutral-700 mr-4"
        >
          Mentions légales
        </Link>
        <Link
          to="/politique-confidentialite"
          className="text-neutral-500 hover:text-neutral-700"
        >
          Politique de confidentialité
        </Link>
      </div>
    </footer>
  );
}