import { useState } from 'react';
import { UserPlus, Search, CheckCircle2, BadgeCheck } from 'lucide-react';

interface Employee {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    activitiesCompleted: number;
    badgesEarned: number;
    status: 'active' | 'inactive';
}

const mockEmployees: Employee[] = [
    {
        id: '1',
        name: 'Alice Martin',
        email: 'alice.martin@entreprise.com',
        activitiesCompleted: 12,
        badgesEarned: 3,
        status: 'active',
    },
    {
        id: '2',
        name: 'Julien Durant',
        email: 'julien.durant@entreprise.com',
        activitiesCompleted: 5,
        badgesEarned: 1,
        status: 'inactive',
    },
    {
        id: '3',
        name: 'Sophie Bernard',
        email: 'sophie.bernard@entreprise.com',
        activitiesCompleted: 20,
        badgesEarned: 5,
        status: 'active',
    },
];

export default function BusinessEmployees() {
    const [search, setSearch] = useState('');

    const filteredEmployees = mockEmployees.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#424242]">Employés inscrits</h1>
                <button className="flex items-center px-4 py-2 bg-[#00BCD4] text-white rounded hover:bg-[#00ACC1]">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Ajouter un employé
                </button>
            </div>

            <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-5 w-5" />
                <input
                    type="text"
                    placeholder="Rechercher un employé..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-[#00BCD4] focus:border-[#00BCD4]"
                />
            </div>

            <div className="bg-white rounded-xl shadow divide-y">
                {filteredEmployees.map((employee) => (
                    <div key={employee.id} className="p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                            {employee.avatarUrl ? (
                                <img src={employee.avatarUrl} alt="avatar" className="w-full h-full rounded-full object-cover" />
                            ) : (
                                <span className="text-[#00BCD4] font-bold">{employee.name.charAt(0)}</span>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold">{employee.name}</p>
                            <p className="text-sm text-neutral-500">{employee.email}</p>
                        </div>
                        <div className="text-sm text-neutral-700">
                            <CheckCircle2 className="inline w-4 h-4 mr-1 text-[#4CAF50]" />
                            {employee.activitiesCompleted} activités
                        </div>
                        <div className="text-sm text-neutral-700">
                            <BadgeCheck className="inline w-4 h-4 mr-1 text-[#FF9800]" />
                            {employee.badgesEarned} badges
                        </div>
                        <div>
                            <span className={`text-xs px-3 py-1 rounded-full ${employee.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-200 text-gray-600'
                                }`}>
                                {employee.status === 'active' ? 'Actif' : 'Inactif'}
                            </span>
                        </div>
                    </div>
                ))}
                {filteredEmployees.length === 0 && (
                    <div className="text-center text-neutral-500 p-6">Aucun employé trouvé.</div>
                )}
            </div>
        </div>
    );
}
