import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Award } from 'lucide-react'; // Icons for the boxes

const FooterLayout = () => {
  const location = useLocation();

  // Hide footer on authentication pages
  if (location.pathname && location.pathname.startsWith('/auth')) {
    return null;
  }
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">

          {/* Brand Section - 5 columns width */}
          <div className="md:col-span-5">
            <div className="mb-6 flex items-center">
              <img src="/logo-white.png" alt="CASAGEN" className="h-10 brightness-0 invert" />
              {/* Note: If your logo is already white, remove brightness-0 invert */}
            </div>
            <p className="mb-8 max-w-sm text-base text-white ">
              Créez des annonces immobilières professionnelles en quelques minutes seulement.
            </p>

            {/* Info Boxes from Image */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <Award className="mt-1 h-5 w-5 flex-shrink-0 opacity-80" />
                <p className="text-base text-white">
                  Développé par un agent immobilier titulaire d'un brevet fédéral en Suisse.
                </p>
              </div>
              <div className="flex items-start space-x-3 rounded-xl bg-white p-4 text-[#3D7A6D]">
                <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0" />
                <p className="text-base font-medium leading-snug">
                  Casagen est un outil d'aide à la rédaction uniquement.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links - 3 columns width */}
          <div className="md:col-span-3">
            <h3 className="mb-6 text-lg font-semibold text-white">Liens rapides</h3>
            <ul className="space-y-3 text-base opacity-80 text-white">
              <li><Link to="/" className="hover:opacity-100 transition-opacity text-white">Accueil</Link></li>
              <li><Link to="/tarifs" className="hover:opacity-100 transition-opacity text-white">Tarifs</Link></li>
              <li><Link to="/about" className="hover:opacity-100 transition-opacity text-white">À propos de nous</Link></li>
              <li><Link to="/how-it-works" className="hover:opacity-100 transition-opacity text-white">Comment ça marche ? </Link></li>
              <li><Link to="/legals" className="hover:opacity-100 transition-opacity text-white">Mentions légales</Link></li>
            </ul>
          </div>

          {/* Assistance & Legal - 4 columns width */}
          <div className="md:col-span-4">
            <h3 className="mb-6 text-lg font-semibold leading-tight text-white">
              Assistance et informations juridiques
            </h3>
            <ul className="space-y-3 text-base opacity-80 text-white">
              <li><Link to="/auth" className="hover:opacity-100 transition-opacity text-white">Connexion / Tableau de bord</Link></li>
              <li><Link to="/legals" className="hover:opacity-100 transition-opacity text-white">Mentions légales</Link></li>
              <li><Link to="/privacy" className="hover:opacity-100 transition-opacity text-white">Politique de confidentialité</Link></li>
              <li><Link to="/terms" className="hover:opacity-100 transition-opacity text-white">Conditions générales</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-white pt-8 text-center">
          <p className="text-base opacity-70 text-white">
            © {currentYear} Casagen. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;