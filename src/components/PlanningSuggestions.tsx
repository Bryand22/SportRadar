import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import axios from 'axios';

type Suggestion = {
    day: string;
    hour: string;
    spot: string;
    sport: string;
    weather: string;
    address: string;
};

export default function PlanningSuggestions() {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        generateSuggestions();
    }, []);

    const generateSuggestions = async () => {
        try {
            // Pour l'instant, générer des suggestions mockées
            const mockSuggestions: Suggestion[] = [
                {
                    day: 'Mercredi',
                    hour: '19h',
                    spot: 'Stade de France',
                    sport: 'Football',
                    weather: '☀️',
                    address: 'Saint-Denis'
                },
                {
                    day: 'Vendredi',
                    hour: '18h',
                    spot: 'Tennis Club de Paris',
                    sport: 'Tennis',
                    weather: '⛅',
                    address: 'Paris 16e'
                },
                {
                    day: 'Samedi',
                    hour: '10h',
                    spot: 'Parc de la Villette',
                    sport: 'Yoga',
                    weather: '☀️',
                    address: 'Paris 19e'
                }
            ];

            setSuggestions(mockSuggestions);
        } catch (error) {
            console.error('Erreur génération suggestions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-16 bg-gray-200 rounded"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    Suggestions de planning
                </h2>
                <span className="text-sm text-gray-500">{suggestions.length} suggestions</span>
            </div>

            {suggestions.length === 0 ? (
                <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Aucune suggestion pour le moment</p>
                    <p className="text-sm text-gray-400">Ajoute tes lieux favoris pour planifier ta semaine 🔥</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-2xl">{suggestion.weather}</span>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {suggestion.day} {suggestion.hour} - {suggestion.sport}
                                            </h3>
                                            <p className="text-sm text-gray-600">{suggestion.spot}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <MapPin className="w-4 h-4" />
                                        {suggestion.address}
                                    </div>
                                </div>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                                    Réserver
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}