import axios from 'axios';

// Types pour la réponse API
interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
}

interface HourlyData {
  time: string[];
  precipitation_probability: number[];
  relative_humidity_2m: number[];
}

interface DailyData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

interface AirQuality {
  index: number;
  level: string;
}

export interface WeatherData {
  provider: string;
  temperature: number | null;
  feels_like: number | null;
  humidity: number | null;
  wind_speed_kmph: number | null;
  wind_dir: string | null;
  condition: string | null;
  icon: string | null;
  raw?: any;
}

function weatherCodeToText(code: number): string {
  const codes: { [key: number]: string } = {
    0: 'Ciel dégagé',
    1: 'Principalement clair',
    2: 'Partiellement nuageux',
    3: 'Couvert',
    45: 'Brouillard',
    48: 'Brouillard givrant',
    51: 'Bruine légère',
    53: 'Bruine modérée',
    55: 'Bruine dense',
    61: 'Pluie légère',
    63: 'Pluie modérée',
    65: 'Pluie forte',
    80: 'Averses légères',
    81: 'Averses modérées',
    82: 'Averses violentes',
    95: 'Orage',
    96: 'Orage avec grêle légère',
    99: 'Orage avec grêle forte'
  };
  return codes[code] || 'Conditions inconnues';
}

export const weatherService = {
  /**
   * Récupère les données météo actuelles via wttr.in (format j1)
   */
  async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherData> {
    if (latitude == null || longitude == null) {
      throw new Error('Coordonnées manquantes');
    }

    try {
      const url = `https://wttr.in/${latitude},${longitude}?format=j1`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; WeatherApp/1.0)'
        },
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`Erreur wttr.in: ${response.status}`);
      }

      const data = await response.json();
      if (!data?.current_condition?.[0]) {
        throw new Error('Format de réponse invalide');
      }

      const current = data.current_condition[0];

      return {
        provider: 'wttr',
        temperature: current.temp_C != null ? Number(current.temp_C) : null,
        feels_like: current.FeelsLikeC != null ? Number(current.FeelsLikeC) : null,
        humidity: current.humidity != null ? Number(current.humidity) : null,
        wind_speed_kmph: current.windspeedKmph != null ? Number(current.windspeedKmph) : null,
        wind_dir: current.winddir16Point || current.winddirDegree || null,
        condition: current.weatherDesc?.[0]?.value || 'Données indisponibles',
        icon: current.weatherIconUrl?.[0]?.value || null,
        raw: data
      };
    } catch (error) {
      console.error('Erreur service météo (wttr):', error);
      // fallback vers open-meteo
      return this.getCurrentWeatherFallback(latitude, longitude);
    }
  },

  /**
   * Fallback simple avec Open-Meteo si wttr.in échoue
   */
  async getCurrentWeatherFallback(latitude: number, longitude: number): Promise<WeatherData> {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature&timezone=auto`
      );
      if (!response.ok) throw new Error(`Open-Meteo erreur ${response.status}`);
      const data = await response.json();
      const current = data.current_weather ?? {};

      // open-meteo fournit température en °C et vent en m/s
      return {
        provider: 'open-meteo',
        temperature: current.temperature != null ? Math.round(current.temperature) : null,
        feels_like: data.hourly?.apparent_temperature?.[0] != null ? Math.round(data.hourly.apparent_temperature[0]) : null,
        humidity: data.hourly?.relativehumidity_2m?.[0] ?? null,
        wind_speed_kmph: current.windspeed != null ? Math.round(current.windspeed * 3.6) : null,
        wind_dir: current.winddirection != null ? String(current.winddirection) : null,
        condition: weatherCodeToText(current.weathercode ?? -1),
        icon: null,
        raw: data
      };
    } catch (error) {
      console.error('Erreur service météo (fallback):', error);
      throw new Error('Impossible de récupérer les données météo');
    }
  }
};

// (simple wrapper vers backend)
export async function fetchWeather(lat: number, lon: number) {
  const res = await fetch(`/api/weather?provider=wttr&lat=${lat}&lon=${lon}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Weather fetch failed: ${res.status} ${text}`);
  }
  return res.json();
}