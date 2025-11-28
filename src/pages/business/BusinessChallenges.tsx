import { useState } from 'react';
import {
    PlusCircle,
    Users,
    Calendar,
    Loader2,
    Target,
    CheckCircle,
    ChevronRight,
} from 'lucide-react';
import type { Challenge } from '../../types';

const mockChallenges: Challenge[] = [
    {
        id: 'c1',
        name: 'Challenge de printemps',
        description: 'Cumulez des kilomètres en marchant ou en courant',
        goal: 1000,
        unit: 'km',
        startDate: '2025-03-01',
        endDate: '2025-03-31',
        participants: 45,
        progress: 76,
    },
    {
        id: 'c2',
        name: 'Défi yoga',
        description: 'Pratiquez régulièrement des exercices de relaxation',
        goal: 20,
        unit: 'hours',
        startDate: '2025-04-01',
        endDate: '2025-04-15',
        participants: 32,
        progress: 45,
    },
];

export default function BusinessChallenges() {
    const [loading, setLoading] = useState(false);
    const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);

    const handleCreate = () => {
        setLoading(true);
        setTimeout(() => {
            const newChallenge: Challenge = {
                id: `c${challenges.length + 1}`,
                name: 'Nouveau défi personnalisé',
                description: 'Objectif bien-être personnalisé',
                goal: 50,
                unit: 'steps',
                startDate: '2025-06-01',
                endDate: '2025-06-30',
                participants: 0,
                progress: 0,
            };
            setChallenges([...challenges, newChallenge]);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#424242]">Défis internes</h1>
                <button
                    onClick={handleCreate}
                    className="flex items-center bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    {loading ? (
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    ) : (
                        <PlusCircle className="h-5 w-5 mr-2" />
                    )}
                    Créer un défi
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                    <div
                        key={challenge.id}
                        className="bg-white shadow-card rounded-lg p-5 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-lg font-semibold mb-1">{challenge.name}</h2>
                            <p className="text-sm text-neutral-600 mb-3">{challenge.description}</p>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                <div className="flex items-center text-neutral-700">
                                    <Target className="h-4 w-4 mr-2 text-[#FF9800]" />
                                    Objectif : {challenge.goal} {challenge.unit}
                                </div>
                                <div className="flex items-center text-neutral-700">
                                    <Users className="h-4 w-4 mr-2 text-[#00BCD4]" />
                                    Participants : {challenge.participants}
                                </div>
                                <div className="flex items-center text-neutral-700">
                                    <Calendar className="h-4 w-4 mr-2 text-[#4CAF50]" />
                                    Du {new Date(challenge.startDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center text-neutral-700">
                                    <Calendar className="h-4 w-4 mr-2 text-[#F57C00]" />
                                    Au {new Date(challenge.endDate).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="mb-1 text-sm font-medium flex justify-between">
                                <span>Progression</span>
                                <span>{challenge.progress}%</span>
                            </div>
                            <div className="h-2 w-full bg-neutral-200 rounded-full">
                                <div
                                    className="h-full bg-[#4CAF50] rounded-full"
                                    style={{ width: `${challenge.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-4 text-right">
                            <button className="text-sm text-primary-600 hover:underline flex items-center">
                                Voir détails
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {challenges.length === 0 && (
                <p className="text-center text-neutral-500 mt-10">
                    Aucun défi pour l’instant. Cliquez sur “Créer un défi” pour commencer !
                </p>
            )}
        </div>
    );
}
