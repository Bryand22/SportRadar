import { useEffect, useState } from 'react';
import { weatherService, WeatherData } from '@/services/weatherservice';

export default function OpenWeatherMap() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [hidden, setHidden] = useState<boolean>(() => {
    return localStorage.getItem('weatherWidgetHidden') === 'true';
  });

  useEffect(() => {
    const reverseGeocode = async (lat: number, lon: number) => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        if (!res.ok) return 'Localisation inconnue';
        const data = await res.json();
        return data.address?.city || data.address?.town || data.address?.village || data.display_name || 'Localisation inconnue';
      } catch {
        return 'Localisation inconnue';
      }
    };

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        setLoading(true);
        setError(null);
        const name = await reverseGeocode(lat, lon);
        setLocationName(name);

        // Appel direct frontal: primary wttr.in, fallback open-meteo géré dans weatherService
        const w = await weatherService.getCurrentWeather(lat, lon);
        setWeather(w);
      } catch (err: any) {
        console.error('OpenWeatherMap component error:', err);
        setError(err?.message || 'Impossible de charger la météo');
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(48.8566, 2.3522), // fallback Paris
        { timeout: 10000 }
      );
    } else {
      fetchWeather(48.8566, 2.3522);
    }
  }, []);

  if (loading) return (
    <div className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-xl animate-pulse">
      <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-24 bg-gray-300 rounded"></div>
    </div>
  );

  if (error) return (
    <div className="fixed top-6 right-6 z-50 bg-red-100 text-red-800 text-xs p-3 rounded-xl max-w-xs">
      {error}
    </div>
  );

  if (hidden) {
    return (
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => {
            setHidden(false);
            localStorage.removeItem('weatherWidgetHidden');
          }}
          className="px-3 py-2 bg-white/90 text-sm rounded-xl shadow-md hover:bg-white"
        >
          Afficher la météo
        </button>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="fixed top-6 right-6 z-50 max-w-xs w-full">
      {/* close / hide */}
      <div className="absolute right-3 top-3 z-50">
        <button
          onClick={() => {
            setHidden(true);
            localStorage.setItem('weatherWidgetHidden', 'true');
          }}
          aria-label="Masquer météo"
          className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full"
        >
          ✕
        </button>
      </div>
      <div className="relative p-6 rounded-2xl shadow-2xl bg-cover bg-center text-white border border-white/20"
        style={{ backgroundImage: "url('https://unsplash.it/600/400?image=1043&blur')", boxShadow: "25px 25px 40px 0px rgba(0,0,0,0.33)" }}>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2 drop-shadow">
          Météo actuelle à {locationName || (weather.raw?.nearest_area?.[0]?.areaName?.[0]?.value ?? 'local')}
        </h3>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-4xl font-bold">{weather.temperature !== null ? Math.round(weather.temperature) : '--'}°C</span>
          <span className="text-xs text-white/70 mb-1 capitalize">{weather.condition ?? '—'}</span>
        </div>
        <div className="grid grid-cols-1 gap-2 text-xs bg-white/10 rounded-lg p-2 mb-2">
          <div>Ressenti : <span className="font-semibold">{weather.feels_like !== null ? Math.round(weather.feels_like) + '°C' : '—'}</span></div>
          <div>Vent : <span className="font-semibold">{weather.wind_speed_kmph !== null ? `${weather.wind_speed_kmph} km/h` : '—'}</span></div>
          <div>Humidité : <span className="font-semibold">{weather.humidity !== null ? `${weather.humidity}%` : '—'}</span></div>
        </div>
        <p className="text-[10px] text-right text-white/60 mt-2">Données : {weather.provider === 'wttr' ? 'wttr.in' : weather.provider}</p>
      </div>
    </div>
  );
}