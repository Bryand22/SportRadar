// src/components/WeatherWidgetSimple.tsx
import React, { useEffect, useState } from 'react';
import { weatherService } from '@/services/weatherservice';

export default function WeatherWidgetFull() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        const load = async (lat?: number, lon?: number) => {
            try {
                setError(null);
                setLoading(true);
                // si lat/lon fournis on les utilise, sinon tente la géoloc navigateur
                let latitude = lat;
                let longitude = lon;

                if (latitude == null || longitude == null) {
                    // demande géolocalisation au navigateur
                    await new Promise<void>((resolve) => {
                        if (!navigator.geolocation) {
                            resolve();
                            return;
                        }
                        navigator.geolocation.getCurrentPosition(
                            (pos) => {
                                latitude = pos.coords.latitude;
                                longitude = pos.coords.longitude;
                                resolve();
                            },
                            () => resolve(),
                            { timeout: 8000 }
                        );
                    });
                }

                // fallback coords (Taverny) si géoloc refusée
                if (latitude == null || longitude == null) {
                    latitude = 48.97303;
                    longitude = 2.34858;
                }

                const w = await weatherService.getCurrentWeather(Number(latitude), Number(longitude));
                setWeather(w);
            } catch (err: any) {
                console.error('weather widget error', err);
                setError(err?.message ?? 'Erreur récupération météo');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) return <div className="p-4">Chargement météo…</div>;
    if (error) return <div className="p-4 text-sm text-red-500">Erreur météo : {error}</div>;
    if (!weather) return null;

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm max-w-[260px]">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-xs text-neutral-500">Météo actuelle</div>
                    <div className="text-3xl font-bold">{weather.temperature}°C</div>
                    <div className="text-sm text-neutral-600 mt-1">{weather.condition}</div>
                </div>

                {weather.icon && (
                    <img src={weather.icon} alt={weather.condition} className="w-16 h-16" />
                )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-neutral-600">
                <div className="text-center">
                    <div className="font-semibold">{weather.feels_like ?? '—'}°</div>
                    <div>Ressenti</div>
                </div>
                <div className="text-center">
                    <div className="font-semibold">{weather.wind_speed_kmph ?? '—'} km/h</div>
                    <div>Vent</div>
                </div>
                <div className="text-center">
                    <div className="font-semibold">{weather.humidity ?? '—'}%</div>
                    <div>Humidité</div>
                </div>
            </div>
        </div>
    );
}
