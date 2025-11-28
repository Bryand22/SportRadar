import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Activity, Mail, Lock, User, Loader2, Building2 } from "lucide-react";

// plus d'import bcrypt côté client — le hashing doit être fait uniquement côté serveur

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isBusinessUser: false,
  });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      return alert("Vous devez accepter la Politique de confidentialité pour créer un compte.");
    }

    setLoading(true);
    try {
      console.log("🔍 RegisterPage - Password avant envoi:", form.password);

      // envoyer le mot de passe tel quel — le serveur le hashera
      await register({
        ...form,
        password: form.password, // ← Doit être en clair
        consent
      });
      navigate("/");
    } catch (err: any) {
      // ...
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-card">
        <div className="text-center">
          <div className="flex justify-center">
            <Activity className="h-12 w-12 text-primary-500" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-neutral-800">Inscription</h2>
          <p className="mt-2 text-neutral-600">Créez votre compte SportRadar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                Prénom
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={handleChange}
                className="block w-full pl-3 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Jean"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                Nom
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={form.lastName}
                onChange={handleChange}
                className="block w-full pl-3 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Dupont"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="business-account"
                name="business-account"
                type="checkbox"
                checked={form.isBusinessUser}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <div className="ml-2 flex items-center">
                <Building2 className="h-4 w-4 text-neutral-500 mr-1" />
                <label htmlFor="business-account" className="text-sm text-neutral-700">
                  Créer un compte entreprise
                </label>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="data-consent"
                name="data-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                required
              />
              <div className="ml-2">
                <label htmlFor="data-consent" className="text-sm text-neutral-700">
                  J'ai pris connaissance de la Politique de confidentialité et j'accepte le traitement de mes données personnelles pour la création et la gestion de mon compte. En cas de refus, je ne pourrai pas procéder à la création de mon compte.
                </label>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 btn-primary w-full flex justify-center items-center"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : null}
              Créer mon compte
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-neutral-600">
            Déjà inscrit ?{" "}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}