import React, { useState } from 'react';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [secret, setSecret] = useState(process.env.VITE_DEV_RESET_SECRET || '');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMsg(null);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(secret ? { 'x-dev-secret': secret } : {})
                },
                body: JSON.stringify({ email, newPassword })
            });

            const body = await res.json();
            if (!res.ok) throw new Error(body.msg || 'Erreur serveur');

            setMsg('Mot de passe réinitialisé. Connecte‑toi avec le nouveau mot de passe.');
        } catch (err: any) {
            setError(err?.message || 'Impossible de réinitialiser le mot de passe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-neutral-50">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Mot de passe oublié (dev)</h2>
                <p className="text-xs text-neutral-500 mb-4">Endpoint sécurisé — disponible uniquement en environnement de développement.</p>
                {msg && <div className="mb-3 text-sm text-green-600">{msg}</div>}
                {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" />
                    <input required type="password" placeholder="Nouveau mot de passe" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full p-2 border rounded" />
                    <input type="text" placeholder="Dev secret (si configuré)" value={secret} onChange={e => setSecret(e.target.value)} className="w-full p-2 border rounded text-sm text-neutral-600" />
                    <button disabled={loading} type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
                        {loading ? 'En cours…' : 'Réinitialiser (dev)'}
                    </button>
                </form>
            </div>
        </div>
    );
}