import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FavoritesList from '../../components/FavoritesList';

type Activity = {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  weatherDependent: boolean;
};

type WeatherForecast = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
};

export default function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoadingWeather(true);
        const res = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FParis`
        );
        setForecast(res.data.daily);
      } catch (err) {
        console.error("Erreur API météo :", err);
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchWeather();
  }, []);

  const getWeatherForDate = (dateStr: string) => {
    if (!forecast) return null;
    const index = forecast.time.findIndex(d => d === dateStr);
    if (index === -1) return null;

    return {
      rain: forecast.precipitation_probability_max[index],
      tempMax: forecast.temperature_2m_max[index],
      tempMin: forecast.temperature_2m_min[index],
    };
  };

  const renderWeatherIndicator = (rain: number, dependent: boolean) => {
    if (!dependent) return null;
    if (rain > 80) return <span className="text-red-500 text-xl">❌</span>;
    if (rain > 50) return <span className="text-yellow-500 text-xl">⚠️</span>;
    return <span className="text-green-500 text-xl">☀️</span>;
  };

  const plannedActivities: Activity[] = [
    {
      id: '1',
      name: 'Yoga matinal',
      description: 'Yoga détente en extérieur',
      date: forecast?.time?.[0] || '2025-06-02',
      time: '08:00',
      weatherDependent: true,
    },
    {
      id: '2',
      name: 'Piscine municipale',
      description: 'Natation libre',
      date: forecast?.time?.[1] || '2025-06-03',
      time: '18:00',
      weatherDependent: false,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Bienvenue, {user?.firstName}</h1>

      {/* Météo */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Prévisions météo</h2>
        {loadingWeather ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des prévisions...</p>
          </div>
        ) : forecast ? (
          <div className="flex space-x-4 overflow-x-auto">
            {forecast.time.map((day, i) => (
              <div key={day} className="flex-shrink-0 bg-neutral-50 border p-4 rounded-lg text-center w-40">
                <p className="font-medium">{new Date(day).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                <div className="my-2">
                  {forecast.precipitation_probability_max[i] > 80 ? '❌' : forecast.precipitation_probability_max[i] > 50 ? '⚠️' : '☀️'}
                </div>
                <p>{forecast.temperature_2m_min[i]}°C / {forecast.temperature_2m_max[i]}°C</p>
                <p className="text-sm text-neutral-500">{forecast.precipitation_probability_max[i]}% pluie</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-red-500">Impossible de charger la météo.</p>
        )}
      </div>

      {/* Favoris */}
      <FavoritesList />

      {/* Planning */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Planning hebdomadaire</h2>
        <div className="space-y-4">
          {plannedActivities.map(activity => {
            const weather = getWeatherForDate(activity.date);
            return (
              <div key={activity.id} className="flex justify-between items-center border rounded-lg p-3 bg-neutral-50">
                <div>
                  <h4 className="font-semibold">{activity.name}</h4>
                  <p className="text-sm text-neutral-500">{activity.date} à {activity.time}</p>
                </div>
                {weather && renderWeatherIndicator(weather.rain, activity.weatherDependent)}
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Découvrir */}
      <div className="text-center">
        <button
          onClick={() => navigate('/discover')}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors"
        >
          🗺️ Découvrir de nouveaux spots
        </button>
      </div>
    </div>
  );
}
