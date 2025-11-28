import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

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

type Favorite = {
  _id: string;
  item_id: string;
  name: string;
  type: 'spot' | 'event';
  address: string;
  lat: number;
  lng: number;
  price?: number;
  createdAt: string;
};

interface FavoritesContextType {
  favorites: Favorite[];
  loading: boolean;
  loadingAction: boolean;
  addFavorite: (spot: Spot) => Promise<void>;
  removeFavorite: (spotId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
  isFavorite: (spotId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setFavorites([]);
        return;
      }

      const response = await axios.get('/api/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Supprimer les doublons au cas où
      const unique = Array.from(new Set(response.data.map((f: Favorite) => f.item_id)))
        .map((id) => response.data.find((f: Favorite) => f.item_id === id)!);

      setFavorites(unique);
    } catch (error) {
      console.error('Erreur récupération favoris:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (spot: Spot) => {
    if (loadingAction) return;
    setLoadingAction(true);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Connectez-vous pour ajouter des favoris');
      setLoadingAction(false);
      return;
    }

    // Optimistic UI : ajout immédiat
    const tempFav: Favorite = {
      _id: 'temp-id',
      item_id: spot._id,
      name: spot.name,
      type: 'spot',
      address: spot.address,
      lat: spot.lat,
      lng: spot.lng,
      price: spot.payant ? spot.price : 0,
      createdAt: new Date().toISOString()
    };

    setFavorites(prev => [...prev, tempFav]);

    try {
      const response = await axios.post('/api/favorites/event', {
        uid: spot._id,
        title: spot.name,
        address: spot.address,
        lat: spot.lat,
        lng: spot.lng,
        price: spot.payant ? spot.price : 0
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Remplacer favori temporaire par la vraie réponse
      setFavorites(prev => prev.map(fav =>
        fav._id === 'temp-id' ? response.data.favorite : fav
      ));
    } catch (error) {
      console.error('Erreur ajout favori:', error);
      // Revenir en arrière si erreur
      setFavorites(prev => prev.filter(fav => fav._id !== 'temp-id'));
      alert('Impossible d\'ajouter le favori');
    } finally {
      setLoadingAction(false);
    }
  };

  const removeFavorite = async (spotId: string) => {
    if (loadingAction) return;
    setLoadingAction(true);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Connectez-vous pour gérer vos favoris');
      setLoadingAction(false);
      return;
    }

    const previous = favorites;
    // Optimistic UI : suppression immédiate
    setFavorites(prev => prev.filter(fav => fav.item_id !== spotId));

    try {
      await axios.delete(`/api/favorites/${spotId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Favori supprimé:', spotId);
    } catch (error) {
      console.error('Erreur suppression favori:', error);
      // Revenir en arrière si erreur
      setFavorites(previous);
      alert('Impossible de supprimer le favori');
    } finally {
      setLoadingAction(false);
    }
  };

  const refreshFavorites = async () => {
    await fetchFavorites();
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav =>
      fav && fav.item_id === id
    );
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const value: FavoritesContextType = {
    favorites,
    loading,
    loadingAction,
    addFavorite,
    removeFavorite,
    refreshFavorites,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
