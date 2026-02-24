import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem('sportradar-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sportradar-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('sportradar-cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-neutral-900 border-t-2 border-primary-500 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white">
          <h4 className="font-bold text-lg mb-1">🍪 Respect de votre vie privée</h4>
          <p className="text-neutral-300 text-sm max-w-2xl leading-relaxed">
            SportRadar utilise des cookies pour améliorer votre expérience, analyser le trafic et personnaliser nos conseils sportifs. 
            Certains sont essentiels au fonctionnement du système d'abonnement.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button 
            onClick={handleDecline}
            className="px-6 py-2.5 text-sm font-medium text-white border border-neutral-600 hover:bg-neutral-800 transition-colors rounded-lg"
          >
            Refuser
          </button>
          <button 
            onClick={handleAccept}
            className="px-6 py-2.5 text-sm font-bold text-neutral-900 bg-primary-400 hover:bg-primary-300 transition-transform active:scale-95 rounded-lg shadow-lg"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}