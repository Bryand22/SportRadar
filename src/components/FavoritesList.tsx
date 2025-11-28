import { Star, MapPin, RefreshCw } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

export default function FavoritesList() {
    const { favorites, loading, removeFavorite, refreshFavorites } = useFavorites();

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow p-6">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-20 bg-gray-200 rounded"></div>
                        <div className="h-20 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Mes lieux favoris
                </h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{favorites.length} favori(s)</span>
                    <button
                        onClick={refreshFavorites}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Actualiser les favoris"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-8">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Aucun lieu favori pour le moment</p>
                    <p className="text-sm text-gray-400">Ajoute des lieux depuis la carte pour les retrouver ici !</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {favorites.slice(0, 3).map((favorite) => (
                        <div key={favorite._id} className="border rounded-lg p-4 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{favorite.spot_id.name}</h3>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {favorite.spot_id.address}
                                        </span>
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                            {favorite.spot_id.type_sport}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        {favorite.spot_id.gratuit && (
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                                Gratuit
                                            </span>
                                        )}
                                        {favorite.spot_id.payant && (
                                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                                                Payant
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFavorite(favorite.spot_id._id)}
                                    className="text-red-500 hover:text-red-700 p-2"
                                    title="Retirer des favoris"
                                >
                                    <Star className="w-5 h-5 fill-current" />
                                </button>
                            </div>
                        </div>
                    ))}

                    {favorites.length > 3 && (
                        <div className="text-center pt-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Voir tous mes favoris ({favorites.length})
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}