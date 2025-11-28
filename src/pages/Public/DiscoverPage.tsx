import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import { Star } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configuration des icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Icône personnalisée pour les événements
const eventIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3502/3502689.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

// Icônes sport personnalisées
const getSportIcon = (sportType: string) => {
  const icons = {
    football: '⚽',
    tennis: '🎾',
    basket: '🏀',
    yoga: '🧘',
    rugby: '🏉',
    default: '📍'
  };
  const key = sportType.toLowerCase();
  return icons[key as keyof typeof icons] || icons.default;
};

type Spot = {
  _id: string;
  name: string;
  type_sport: string;
  address: string;
  lat: number;
  lng: number;
  gratuit: boolean;
  payant: boolean;
  rating: number;
};

type Event = {
  uid: string;
  title: string;
  description: string;
  location: {
    name: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  timings: {
    start: string;
    end: string;
  }[];
  price?: number; // Nouvelle propriété optionnelle
};

// Fonction utilitaire de distance
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Fonction de formatage des événements
const formatEvents = (events: Event[]) => {
  return events.map(event => ({
    ...event,
    timings: event.timings.map(timing => ({
      start: new Date(timing.start).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }),
      end: new Date(timing.end).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }))
  }));
};

// Nouvelle fonction pour charger les événements mockés
const loadMockEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get('/data/mockEvents.json');
    let eventsData = response.data;

    // Gestion des différents formats de réponse
    if (eventsData && eventsData.events) {
      eventsData = eventsData.events;
    } else if (eventsData && eventsData.data) {
      eventsData = eventsData.data;
    }

    // Vérification finale que c'est bien un tableau
    if (!Array.isArray(eventsData)) {
      console.error('Format de données inattendu:', eventsData);
      return [];
    }

    return eventsData.map((event: any) => ({
      uid: `mock-${event.id}`,
      title: event.title || "Événement sportif",
      description: event.description || "",
      location: {
        name: event.location_name || event.location?.name || "Lieu inconnu",
        coordinates: [
          event.longitude || event.location?.coordinates?.[0] || 2.3522,
          event.latitude || event.location?.coordinates?.[1] || 48.8566
        ]
      },
      timings: [{
        start: event.start_date || event.start,
        end: event.end_date || event.end
      }],
      price: event.price
    }));
  } catch (err) {
    console.error('Erreur chargement données mockées:', err);
    return [];
  }
};

// Fonction utilitaire pour filtrer les événements mockés selon le sport sélectionné
const filterMockEventsBySport = (events: Event[], selectedSport: string) => {
  if (selectedSport === 'all') return events;
  const sport = selectedSport.toLowerCase();
  return events.filter(event =>
    event.title?.toLowerCase().includes(sport) ||
    event.description?.toLowerCase().includes(sport)
  );
};

export default function DiscoverPage() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [position, setPosition] = useState<[number, number]>([48.8566, 2.3522]);
  const [zoom, setZoom] = useState(11);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'france' | 'paris' | 'user'>('paris');
  const [error, setError] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [page, setPage] = useState(1);

  const mapRef = useRef<any>(null);

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  const sportsKeywords = ["sport", "football", "basket", "tennis", "yoga", "handball", "rugby"];

  // Fetch spots
  const fetchSpots = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/spots');
      setSpots(res.data);
    } catch (err) {
      console.error('Erreur fetch spots:', err);
      setSpots([
        {
          _id: '1',
          name: 'Stade de France',
          type_sport: 'Football',
          address: 'Saint-Denis, 93',
          lat: 48.9244,
          lng: 2.3604,
          gratuit: false,
          payant: true,
          rating: 4.5
        },
        {
          _id: '2',
          name: 'Parc de la Villette',
          type_sport: 'Yoga',
          address: 'Paris 19e',
          lat: 48.8947,
          lng: 2.3874,
          gratuit: true,
          payant: false,
          rating: 4.2
        },
        {
          _id: '3',
          name: 'Tennis Club de Paris',
          type_sport: 'Tennis',
          address: 'Paris 16e',
          lat: 48.8566,
          lng: 2.3522,
          gratuit: false,
          payant: true,
          rating: 4.0
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events sportifs avec pagination
  const fetchEvents = async (lat: number, lng: number) => {
    try {
      setEventsLoading(true);
      setError(null);

      // Charge les événements mockés
      const mockEvents = await loadMockEvents();

      // Filtre de proximité
      let filteredEvents = mockEvents;
      if (!isNaN(lat) && !isNaN(lng)) {
        filteredEvents = mockEvents.filter(event => {
          if (!event.location.coordinates || event.location.coordinates.length < 2) {
            return false;
          }
          return calculateDistance(lat, lng, event.location.coordinates[1], event.location.coordinates[0]) < 50;
        });
      }

      // Filtre sport
      filteredEvents = filterMockEventsBySport(filteredEvents, selectedSport);

      setEvents(formatEvents(filteredEvents));
    } catch (err: any) {
      setEvents([]);
      setError('Impossible de charger les événements mockés.');
    } finally {
      setEventsLoading(false);
    }
  };

  useEffect(() => {
    fetchSpots();
    changeView('paris');
  }, []);

  useEffect(() => {
    // Refiltrer les événements quand le sport sélectionné change
    fetchEvents(position[0], position[1]);
  }, [selectedSport]);

  // Pagination infinie sur déplacement de la carte
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      fetchEvents(bounds.getCenter().lat, bounds.getCenter().lng);
    };

    map.on('moveend', handleMoveEnd);
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, []);

  const changeView = (view: 'france' | 'paris' | 'user') => {
    setCurrentView(view);
    switch (view) {
      case 'france':
        setPosition([46.603354, 1.888334]);
        setZoom(6);
        fetchEvents(46.603354, 1.888334);
        break;
      case 'paris':
        setPosition([48.8566, 2.3522]);
        setZoom(11);
        fetchEvents(48.8566, 2.3522);
        break;
      case 'user':
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition([pos.coords.latitude, pos.coords.longitude]);
            setZoom(13);
            fetchEvents(pos.coords.latitude, pos.coords.longitude);
          },
          () => {
            setPosition([48.8566, 2.3522]);
            setZoom(11);
            fetchEvents(48.8566, 2.3522);
          }
        );
        break;
    }
  };

  const handleToggleFavorite = async (spot: Spot) => {
    try {
      if (isFavorite(spot._id)) {
        await removeFavorite(spot._id);
      } else {
        await addFavorite(spot);
      }
    } catch (err) {
      console.error('Erreur toggle favorite:', err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Découvrir les activités sportives</h1>

      {/* Filtres sports */}
      <div className="flex justify-center gap-3 mb-4 flex-wrap">
        <button
          onClick={() => setSelectedSport('all')}
          className={`px-4 py-2 rounded-full ${selectedSport === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Tous
        </button>
        {['Football', 'Tennis', 'Basket', 'Yoga', 'Rugby'].map(sport => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-4 py-2 rounded-full ${selectedSport === sport ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {sport}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => changeView('france')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${currentView === 'france'
            ? 'bg-blue-600 text-white shadow-lg scale-105'
            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
        >
          🇫🇷 Vue France
        </button>
        <button
          onClick={() => changeView('paris')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${currentView === 'paris'
            ? 'bg-green-600 text-white shadow-lg scale-105'
            : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
        >
          🗼 Vue Paris
        </button>
        <button
          onClick={() => changeView('user')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${currentView === 'user'
            ? 'bg-purple-600 text-white shadow-lg scale-105'
            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
        >
          📍 Ma position
        </button>
      </div>

      <div className="text-center mb-4">
        <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
          {currentView === 'france' && 'Vue France entière - Zoom: 6x'}
          {currentView === 'paris' && 'Vue Paris métropole - Zoom: 11x'}
          {currentView === 'user' && 'Vue ma position - Zoom: 13x'}
        </span>

        {eventsLoading && (
          <div className="mt-2 text-blue-600">
            Chargement des événements sportifs en cours...
          </div>
        )}
        {error && (
          <div className="mt-2 text-red-600">
            {error}
          </div>
        )}
      </div>

      <div className="mb-8">
        <MapContainer
          center={position}
          zoom={zoom}
          scrollWheelZoom={true} // <--- zoom activé
          className="h-96 rounded-lg shadow-md"
          whenReady={() => { if (mapRef.current) return; mapRef.current = (document.querySelector('.leaflet-container') as any)?._leaflet_map; }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {spots
            .filter(spot => selectedSport === 'all' || spot.type_sport.toLowerCase() === selectedSport.toLowerCase())
            .map(spot => (
              <Marker
                key={spot._id}
                position={[spot.lat, spot.lng]}
                icon={L.divIcon({
                  html: `<div class="sport-marker">${getSportIcon(spot.type_sport)}</div>`,
                  className: 'sport-icon'
                })}
              >
                <Popup>
                  <div className="flex items-center">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs mr-2">
                      SPOT
                    </span>
                    <div className="text-lg font-semibold">{spot.name}</div>
                  </div>
                  <div className="text-sm text-gray-500">{spot.address}</div>
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{spot.rating.toFixed(1)}</span>
                  </div>
                  <div className="mt-2">
                    <button
                      onClick={() => handleToggleFavorite(spot)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isFavorite(spot._id)
                        ? 'bg-red-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {isFavorite(spot._id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          {events.map(event => {
            const [lng, lat] = event.location.coordinates;
            return (
              <Marker key={event.uid} position={[lat, lng]} icon={eventIcon}>
                <Popup>
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs mr-2">
                      ÉVÉNEMENT
                    </span>
                    <div className="text-lg font-semibold">{event.title}</div>
                    {/* Ajout du logo sport */}
                    <span className="ml-2 text-2xl">
                      {getSportIcon(event.title)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{event.location.name}</div>
                  {event.price !== undefined && (
                    <div className="mt-1 text-green-600 font-medium">
                      Prix: {event.price}€
                    </div>
                  )}
                  <div className="mt-2">
                    {event.timings.map((timing, index) => (
                      <div key={index} className="text-sm text-gray-700">
                        🕒 {timing.start} - {timing.end}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-col gap-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      onClick={() => window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')}
                    >
                      Itinéraire
                    </button>
                    <button
                      className={`px-3 py-1 rounded font-semibold transition-all duration-200 ${isFavorite(event.uid)
                        ? 'bg-red-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      onClick={async () => {
                        if (isFavorite(event.uid)) {
                          removeFavorite(event.uid);
                        } else {
                          // Utiliser la route /api/favorites/event pour les événements mockés
                          try {
                            await axios.post('/api/favorites/event', {
                              uid: event.uid,  // Maintenant stocké dans event_uid
                              title: event.title,
                              address: event.location.name,
                              lat,
                              lng,
                              price: event.price
                            }, {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                              }
                            });
                            addFavorite({
                              _id: event.uid,
                              name: event.title,
                              type_sport: event.title,
                              address: event.location.name,
                              lat,
                              lng,
                              gratuit: event.price === 0,
                              payant: typeof event.price === 'number' && event.price > 0,
                              rating: 0
                            });
                          } catch (err) {
                            console.error('Erreur ajout favori événement mocké:', err);
                            alert('Erreur lors de l\'ajout du favori événement mocké.');
                          }
                        }
                      }}
                    >
                      {isFavorite(event.uid) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="text-center">
        <button
          onClick={fetchSpots}
          className="px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white transition-all duration-200 hover:bg-blue-700"
        >
          Rafraîchir les données
        </button>
      </div>

      {/* Ajout du CSS pour les icônes sport */}
      <style>{`
        .sport-icon {
          background: none !important;
          border: none !important;
        }
        .sport-marker {
          font-size: 24px;
          text-shadow: 1px 1px 2px black;
        }
      `}</style>

      {/* Ajout d'un bouton de test pour les données mockées (à placer dans le JSX, par exemple juste avant le MapContainer) */}
      <div className="text-center mt-4">
        <button
          onClick={async () => {
            const mockEvents = await loadMockEvents();
            console.log('Événements mockés:', mockEvents);
            alert(`${mockEvents.length} événements mockés chargés. Voir la console pour les détails.`);
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
        >
          Tester les données mockées
        </button>
      </div>
    </div>
  );
}

