import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import {
  MapPin, Calendar, Award, Heart,
  MapIcon, Clock, User, CreditCard
} from 'lucide-react';
import OpenWeatherMap from '@/components/OpenWeatherMap';

export default function HomePage() {
  return (
    <>
      <OpenWeatherMap />

      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
        {/* Vidéo de fond */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          controls
          loop
          playsInline
        >
          <source src="Public/videos/hero-video.mp4" type="video/mp4" />
          Votre navigateur ne prend pas en charge les vidéos HTML5.
        </video>

        {/* Overlay sombre */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

        {/* Contenu principal */}
        <div className="relative z-20 container-custom h-full flex items-center">
          <div className="text-white max-w-2xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bougez localement, vivez mieux
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Découvrez des activités sportives près de chez vous, adaptées à vos préférences et aux conditions extérieures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn bg-white text-primary-700 hover:bg-neutral-100">
                Commencer maintenant
              </Link>
              <Link to="/discover" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pourquoi SportRadar ?</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Nous révolutionnons la façon dont vous pratiquez le sport en tenant compte de votre environnement et de vos préférences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-neutral-50 rounded-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Activités locales</h4>
              <p className="text-neutral-600">
                Trouvez des activités sportives à proximité de chez vous, adaptées à vos goûts.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 rounded-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-secondary-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Planification intelligente</h4>
              <p className="text-neutral-600">
                Organisez vos activités selon la météo, la qualité de l'air et vos disponibilités.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 rounded-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-accent-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Badge SportZen</h4>
              <p className="text-neutral-600">
                Débloquez des badges et suivez votre progression pour rester motivé.
              </p>
            </div>

            <div className="p-6 bg-neutral-50 rounded-xl flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-highlight rounded-full flex items-center justify-center mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Bien-être global</h4>
              <p className="text-neutral-600">
                Améliorez votre santé physique et mentale grâce à des activités adaptées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              En quelques étapes simples, commencez à profiter d'activités sportives adaptées à vos besoins.
            </p>
          </div>

          <div className="relative">
            {/* Desktop connector line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-primary-500 flex items-center justify-center mb-4 z-10">
                  <User className="h-6 w-6 text-primary-600" />
                </div>
                <h5 className="text-lg font-semibold mb-2">Inscription</h5>
                <p className="text-neutral-600">
                  Créez votre compte et renseignez vos préférences sportives.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-primary-500 flex items-center justify-center mb-4 z-10">
                  <MapIcon className="h-6 w-6 text-primary-600" />
                </div>
                <h5 className="text-lg font-semibold mb-2">Découverte</h5>
                <p className="text-neutral-600">
                  Explorez les activités recommandées selon vos critères.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-primary-500 flex items-center justify-center mb-4 z-10">
                  <Calendar className="h-6 w-6 text-primary-600" />
                </div>
                <h5 className="text-lg font-semibold mb-2">Planification</h5>
                <p className="text-neutral-600">
                  Ajoutez des activités à votre calendrier personnel.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-primary-500 flex items-center justify-center mb-4 z-10">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <h5 className="text-lg font-semibold mb-2">Progression</h5>
                <p className="text-neutral-600">
                  Suivez vos performances et gagnez des badges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ce que nos utilisateurs disent</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Découvrez les expériences de personnes de tous âges qui ont transformé leur routine sportive grâce à SportRadar.
            </p>
          </div>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {/* Étudiant */}
            <SwiperSlide>
              <div className="bg-neutral-50 p-6 rounded-xl h-full">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Thomas"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold">Thomas, 21 ans</h5>
                    <p className="text-sm text-neutral-500">Étudiant en informatique</p>
                  </div>
                </div>
                <p className="text-neutral-700">
                  "Entre les cours et les projets, je n'avais plus le temps de faire du sport. SportRadar m'a permis de trouver des séances courtes et intenses près de ma fac. Top !"
                </p>
              </div>
            </SwiperSlide>

            {/* Femme senior */}
            <SwiperSlide>
              <div className="bg-neutral-50 p-6 rounded-xl h-full">
                <div className="flex items-start mb-4">
                  <img
                    src="https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg"
                    alt="Jacqueline"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold">Jacqueline, 68 ans</h5>
                    <p className="text-sm text-neutral-500">Retraitée</p>
                  </div>
                </div>
                <p className="text-neutral-700">
                  "À mon âge, on me disait de ne pas forcer. Grâce aux activités adaptées suggérées par SportRadar, je retrouve une mobilité que je pensais perdue !"
                </p>
              </div>
            </SwiperSlide>

            {/* Original testimonials */}
            <SwiperSlide>
              <div className="bg-neutral-50 p-6 rounded-xl h-full">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Sophie"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold">Sophie, 34 ans</h5>
                    <p className="text-sm text-neutral-500">Mère de famille</p>
                  </div>
                </div>
                <p className="text-neutral-700">
                  "Grâce à SportRadar, j'ai enfin pu reprendre une activité physique régulière qui s'adapte à mon emploi du temps chargé et à la météo. Je me sens revivre !"
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-neutral-50 p-6 rounded-xl h-full">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Marc"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold">Marc, 52 ans</h5>
                    <p className="text-sm text-neutral-500">Cadre en entreprise</p>
                  </div>
                </div>
                <p className="text-neutral-700">
                  "J'avais du mal à trouver des activités adaptées à mon âge et à mes capacités. SportRadar m'a fait découvrir le yoga en plein air et des randonnées accessibles près de chez moi."
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-neutral-50 p-6 rounded-xl h-full">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
                    alt="Léa"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h5 className="font-semibold">Léa, 28 ans</h5>
                    <p className="text-sm text-neutral-500">Freelance</p>
                  </div>
                </div>
                <p className="text-neutral-700">
                  "Les badges SportZen sont vraiment motivants ! Je n'aurais jamais cru que je pourrais maintenir une routine sportive aussi longtemps. L'application est devenue indispensable."
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>


      {/* Pricing */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nos offres</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choisissez la formule qui correspond le mieux à vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-card p-8 border border-neutral-200">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold mb-4">Gratuit</h4>
                <p className="text-4xl font-bold">0€</p>
                <p className="text-neutral-500 mt-2">Pour toujours</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Recommandations d'activités locales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Planification basique</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Suivi des badges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-neutral-300 mr-2">✗</span>
                  <span className="text-neutral-400">Filtres avancés</span>
                </li>
              </ul>

              <Link
                to="/register"
                className="btn-outline w-full text-center"
              >
                S'inscrire gratuitement
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-card p-8 border-2 border-primary-500 relative transform md:scale-105">
              <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                Populaire
              </div>

              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold mb-4">Premium</h4>
                <p className="text-4xl font-bold">9,99€</p>
                <p className="text-neutral-500 mt-2">Par mois</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Tout ce qui est inclus dans l'offre gratuite</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Filtres avancés personnalisés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Données météo et qualité d'air en temps réel</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Badges exclusifs</span>
                </li>
              </ul>

              <Link
                to="/register"
                className="btn-primary w-full text-center"
              >
                Commencer l'essai gratuit
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-card p-8 border border-neutral-200">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold mb-4">Entreprise</h4>
                <p className="text-4xl font-bold">Contact</p>
                <p className="text-neutral-500 mt-2">Tarifs personnalisés</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Licences multiples pour les employés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Défis d'entreprise personnalisés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Tableau de bord et analyses RH</span>
                </li>
                <li className="flex items-start">
                  <span className="text-secondary-500 mr-2">✓</span>
                  <span>Intégration de votre image de marque</span>
                </li>
              </ul>

              <Link
                to="/business-info"
                className="btn-accent w-full text-center"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer votre expérience sportive ?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui ont déjà amélioré leur bien-être grâce à des activités sportives locales et personnalisées.
          </p>
          <Link
            to="/register"
            className="btn bg-white text-primary-700 hover:bg-neutral-100 text-lg px-8 py-4"
          >
            Je m'inscris gratuitement
          </Link>
        </div>
      </section>
    </>
  );
}