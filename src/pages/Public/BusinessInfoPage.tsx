import { Building2, Users, Trophy, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BusinessInfoPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">SportRadar pour les entreprises</h1>
          <p className="text-xl text-neutral-600">
            Améliorez le bien-être de vos employés avec notre solution complète
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-card">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Engagement des employés</h3>
            <p className="text-neutral-600">
              Motivez vos équipes avec des activités sportives adaptées et des défis d'entreprise personnalisés.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-card">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Défis d'entreprise</h3>
            <p className="text-neutral-600">
              Créez des challenges stimulants pour renforcer l'esprit d'équipe et promouvoir un mode de vie actif.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-card">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mb-4">
              <BarChart className="h-6 w-6 text-accent-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Analyses détaillées</h3>
            <p className="text-neutral-600">
              Suivez la participation et mesurez l'impact de vos initiatives bien-être avec des rapports détaillés.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-card">
            <div className="w-12 h-12 bg-highlight rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Solution personnalisée</h3>
            <p className="text-neutral-600">
              Adaptez la plateforme à votre image de marque et aux besoins spécifiques de votre entreprise.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Prêt à transformer le bien-être de vos employés ?</h2>
          <p className="mb-6">
            Contactez-nous pour découvrir comment SportRadar peut s'adapter à votre entreprise.
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-100 transition-colors"
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </div>
  );
}