import React, { useEffect, useState } from 'react';
import { weatherService, WeatherData } from '@/services/weatherservice';

export default function WeatherWidgetSimple() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [location, setLocation] = useState<string>('');
    const [hidden, setHidden] = useState<boolean>(() => {
        return localStorage.getItem('weatherWidgetSimpleHidden') === 'true';
    });

    const getLocationName = async (lat: number, lon: number): Promise<string> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
            );
            const data = await response.json();
            return data.address?.city || data.address?.town || data.address?.village || 'Localisation inconnue';
        } catch {
            return 'Localisation inconnue';
        }
    };

    const loadWeather = async (lat?: number, lon?: number) => {
        console.log('[WeatherWidgetSimple] loadWeather start', { lat, lon });
        try {
            setError(null);
            setLoading(true);

            // Géolocalisation
            let latitude = lat;
            let longitude = lon;

            if (!latitude || !longitude) {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    if (!navigator.geolocation) {
                        reject(new Error('Géolocalisation non supportée'));
                        return;
                    }

                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        timeout: 10000,
                        enableHighAccuracy: false
                    });
                });

                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            }

            // Fallback si géoloc échoue
            if (!latitude || !longitude) {
                latitude = 48.97303;
                longitude = 2.34858;
            }

            // Récupération nom de la localisation
            const locationName = await getLocationName(latitude, longitude);
            console.log('[WeatherWidgetSimple] locationName', locationName, { latitude, longitude });
            setLocation(locationName);

            // Tentative principale avec wttr.in
            try {
                const weatherData = await weatherService.getCurrentWeather(latitude, longitude);
                console.log('[WeatherWidgetSimple] wttr success', weatherData);
                setWeather(weatherData);
            } catch (primaryError) {
                console.warn('[WeatherWidgetSimple] wttr failed', primaryError);
                console.warn('wttr.in a échoué, tentative avec OpenMeteo:', primaryError);
                // Fallback avec OpenMeteo
                const fallbackData = await weatherService.getCurrentWeatherFallback(latitude, longitude);
                console.log('[WeatherWidgetSimple] open-meteo fallback success', fallbackData);
                setWeather(fallbackData);
            }

        } catch (err: any) {
            console.error('Erreur widget météo:', err);
            setError(err?.message || 'Erreur de chargement de la météo');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWeather();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-4 shadow-sm max-w-[260px]">
                <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="text-sm text-neutral-500">Chargement météo...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl p-4 shadow-sm max-w-[260px]">
                <div className="text-red-500 text-sm">
                    <div className="font-semibold">Erreur météo</div>
                    <div className="mt-1">{error}</div>
                    <button
                        onClick={() => loadWeather()}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    if (!weather) {
        return (
            <div className="bg-white rounded-xl p-4 shadow-sm max-w-[260px]">
                <div className="text-sm text-neutral-600 mb-3">Aucune donnée météo disponible.</div>
                <div className="flex gap-2">
                    <button
                        onClick={() => loadWeather()}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    >
                        Réessayer
                    </button>
                    <button
                        onClick={() => {
                            // Forcer fallback sur coords Taverny
                            loadWeather(48.97303, 2.34858);
                        }}
                        className="px-3 py-1 bg-gray-100 text-neutral-700 rounded text-xs hover:bg-gray-200"
                    >
                        Utiliser la position par défaut (Taverny)
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {hidden ? (
                <div className="bg-white rounded-xl p-2 shadow-sm max-w-[260px]">
                    <button
                        onClick={() => {
                            setHidden(false);
                            localStorage.removeItem('weatherWidgetSimpleHidden');
                            // trigger reload to refresh data after unhide
                            loadWeather();
                        }}
                        className="px-3 py-1 bg-white border rounded text-xs"
                    >
                        Afficher la météo
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl p-4 shadow-sm max-w-[260px]">
                    <div className="absolute right-3 top-3 z-10">
                        <button
                            onClick={() => {
                                setHidden(true);
                                localStorage.setItem('weatherWidgetSimpleHidden', 'true');
                            }}
                            aria-label="Masquer météo"
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Localisation */}
                    {location && (
                        <div className="text-xs text-neutral-500 mb-2">{location}</div>
                    )}

                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs text-neutral-500">Météo actuelle</div>
                            <div className="text-3xl font-bold">
                                {weather.temperature !== null ? `${weather.temperature}°C` : '--°C'}
                            </div>
                            <div className="text-sm text-neutral-600 mt-1">
                                {weather.condition}
                            </div>
                        </div>

                        {/* Icône météo */}
                        {weather.icon && (
                            <img
                                src={weather.icon.startsWith('http') ? weather.icon : `https:${weather.icon}`}
                                alt={weather.condition || ''}
                                className="w-16 h-16"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        )}
                    </div>

                    {/* Détails */}
                    <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-neutral-600">
                        <div className="text-center">
                            <div className="font-semibold">
                                {weather.feels_like !== null ? `${weather.feels_like}°` : '--'}
                            </div>
                            <div>Ressenti</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold">
                                {weather.wind_speed_kmph !== null ? `${weather.wind_speed_kmph}` : '--'} km/h
                            </div>
                            <div>Vent</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold">
                                {weather.humidity !== null ? `${weather.humidity}` : '--'}%
                            </div>
                            <div>Humidité</div>
                        </div>
                    </div>

                    {/* Bouton actualiser */}
                    <button
                        onClick={() => loadWeather()}
                        className="mt-3 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-neutral-600 transition-colors"
                    >
                        Actualiser
                    </button>
                </div>
            )}
        </div>
    );
}