import { CheckCircle2, Rocket, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PartnersPage() {
  const benefits = [
    {
      title: "Visibilité accrue",
      desc: "Touchez une nouvelle audience de sportifs locaux en Île-de-France.",
      icon: <Zap className="text-primary-600" size={24} />
    },
    {
      title: "Gestion simplifiée",
      desc: "Planning, réservations et paiements centralisés sur une seule interface.",
      icon: <CheckCircle2 className="text-primary-600" size={24} />
    },
    {
      title: "Paiements sécurisés",
      desc: "Fini les relances. Recevez vos virements automatiquement après chaque séance.",
      icon: <ShieldCheck className="text-primary-600" size={24} />
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-neutral-900 text-white py-20 px-4">
        <div className="container-custom text-center">
          <h1 className="mb-6 text-primary-400">Boostez votre activité sportive</h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-10">
            Vous êtes coach indépendant ou responsable d'association ? Rejoignez SportRadar pour digitaliser vos réservations et attirer de nouveaux membres.
          </p>
          <Link to="/register" className="btn-primary text-lg px-10 py-4">
            Inscrire ma structure gratuitement
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 container-custom">
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                {b.icon}
              </div>
              <h3 className="text-xl mb-4 text-neutral-800">{b.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary-50 border-y border-primary-100">
        <div className="container-custom text-center">
          <h2 className="mb-6 text-neutral-800 italic">"SportRadar a multiplié mes inscriptions par deux en seulement 3 mois."</h2>
          <p className="font-bold text-primary-700 mb-8">— Marc, Coach de Yoga à Paris</p>
          <Link to="/register" className="btn-primary px-8">
            Rejoindre l'aventure
          </Link>
        </div>
      </section>
    </div>
  );
}