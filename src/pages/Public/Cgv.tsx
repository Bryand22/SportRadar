import React from 'react';

export default function CGV() {
  return (
    <div className="container-custom py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-neutral-800">Conditions Générales de Vente (CGV)</h1>
      
      <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600">
        <section>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">1. Objet</h2>
          <p>Les présentes CGV régissent l'accès et l'utilisation de la plateforme SportRadar, proposant des abonnements pour des activités sportives personnalisées en Île-de-France.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">2. Abonnements et Paiement</h2>
          <p>SportRadar propose des formules d'abonnement avec facturation récurrente. Les paiements sont sécurisés et effectués via notre prestataire de paiement.</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Les tarifs sont indiqués en Euros TTC.</li>
            <li>L'abonnement est prélevé mensuellement à la date anniversaire.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">3. Droit de rétractation</h2>
          <p>Conformément à la loi, vous disposez de 14 jours pour vous rétracter. Toutefois, l'utilisation du service avant la fin de ce délai vaut renonciation au droit de rétractation pour la période entamée.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-neutral-800 mb-3">4. Résiliation</h2>
          <p>Vous pouvez résilier votre abonnement à tout moment depuis votre espace "Mon Profil". La résiliation sera effective à la fin de la période de facturation en cours.</p>
        </section>
        
        <p className="text-sm italic mt-8">Dernière mise à jour : 16 février 2026</p>
      </div>
    </div>
  );
}