import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import api from '@/services/API';

export default function UserPlanning() {
    const { user } = useAuth();
    type Activity = { id: string;[key: string]: any };
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await api.get('/activities');
                setActivities(response.data);
            } catch (err) {
                setError('Failed to load activities');
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    const handleCancel = async (id: string) => {
        try {
            await api.delete(`/activities/${id}`);
            setActivities(activities.filter(a => a.id !== id));
        } catch (err) {
            setError('Failed to cancel activity');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin h-12 w-12 text-primary-500" />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* ... JSX existant avec les vraies données */}
            {activities.map((activity) => (
                <div key={activity.id}>
                    {/* ... */}
                    <button
                        onClick={() => handleCancel(activity.id)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                        Annuler
                    </button>
                </div>
            ))}
        </div>
    );
}