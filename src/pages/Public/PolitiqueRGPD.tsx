import React from "react";

export default function PolitiqueRGPD() {
    return (
        <div className="min-h-screen bg-white py-16">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-center">Politique de confidentialité (RGPD)</h1>

                <p className="text-neutral-700 mb-6 leading-relaxed">
                    La présente politique de confidentialité décrit la façon dont <strong>SportRadar</strong> collecte, utilise,
                    conserve et protège les données personnelles des utilisateurs. Cette politique s'applique dans le cadre d'un
                    projet académique et vise à respecter les principes du Règlement Général sur la Protection des Données (RGPD).
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">1. Responsable du traitement</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Responsable : <strong>Bryand Fridolin NGASSAMA ELOUNDOU</strong><br />
                        Email : <strong>contact@sportRadar.fr</strong><br />
                        Statut : projet académique – site non commercial.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">2. Données collectées</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                        Nous collectons uniquement les données nécessaires au fonctionnement du service :
                    </p>
                    <ul className="list-disc pl-5 text-neutral-700 space-y-2">
                        <li><strong>Données de compte :</strong> email, nom (si fourni), mot de passe chiffré, préférences sportives.</li>
                        <li><strong>Données d’utilisation :</strong> historique d’activités (si activé), favoris, interactions.</li>
                        <li><strong>Données de localisation :</strong> localisation approximative, uniquement avec consentement explicite.</li>
                        <li><strong>Données issues d'APIs :</strong> météo (OpenWeather) et qualité de l’air (AirParif ou équivalent).</li>
                        <li><strong>Données techniques :</strong> logs de connexion, informations sur le navigateur (durée limitée).</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">3. Finalités du traitement</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Les données sont utilisées pour :
                    </p>
                    <ul className="list-disc pl-5 text-neutral-700 space-y-2">
                        <li>Fournir et personnaliser les recommandations d'activités locales.</li>
                        <li>Afficher la météo et l'indice de qualité de l'air adaptés à la position.</li>
                        <li>Gérer les comptes utilisateurs et la sécurité (authentification).</li>
                        <li>Améliorer et analyser l'utilisation de la plateforme (statistiques).</li>
                        <li>Envoyer des communications si l'utilisateur y a consenti (emails d'information).</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">4. Base légale</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Les traitements s’appuient sur :
                    </p>
                    <ul className="list-disc pl-5 text-neutral-700 space-y-2">
                        <li><strong>Consentement</strong> (géolocalisation, cookies non essentiels, newsletters).</li>
                        <li><strong>Exécution d’un service</strong> (création de compte, recommandations).</li>
                        <li><strong>Intérêt légitime</strong> (sécurité, amélioration du service), lorsque pertinent et documenté.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">5. Durée de conservation</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Les durées recommandées :
                    </p>
                    <ul className="list-disc pl-5 text-neutral-700 space-y-2">
                        <li>Compte utilisateur : conservé tant que le compte est actif ; suppression possible sur demande. Inactivité : suppression automatique après 2 ans d'inactivité.</li>
                        <li>Données de localisation : utilisées en temps réel et non stockées de manière permanente sauf si l'utilisateur l'autorise explicitement.</li>
                        <li>Logs techniques : conservés 90 jours maximum pour sécurité et diagnostics.</li>
                        <li>Données issues d’APIs météo/air : non stockées long terme (consultation en temps réel).</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">6. Destinataires des données</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Les données peuvent être partagées avec des prestataires techniques (hébergeur, services d'API tiers) uniquement dans la
                        mesure nécessaire. Aucune vente de données à des tiers n'est effectuée.
                    </p>
                    <p className="text-neutral-700 mt-2">
                        Principaux tiers : OpenWeather, AirParif (ou équivalents), hébergeur du site, outils d'analyse si activés (ex : Google Analytics).
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">7. Droits des personnes</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Conformément au RGPD, vous disposez des droits suivants :
                    </p>
                    <ul className="list-disc pl-5 text-neutral-700 space-y-2">
                        <li>Droit d'accès : obtenir une copie des données vous concernant.</li>
                        <li>Droit de rectification : corriger des données inexactes.</li>
                        <li>Droit à l'effacement : demander la suppression de vos données.</li>
                        <li>Droit à la limitation du traitement.</li>
                        <li>Droit d'opposition au traitement pour motifs légitimes.</li>
                        <li>Droit à la portabilité des données.</li>
                        <li>Droit de retirer votre consentement (sans affecter la licéité des traitements antérieurs).</li>
                    </ul>
                    <p className="text-neutral-700 mt-3">
                        Pour exercer vos droits : envoyez un email à <strong>contact@sportRadar.fr</strong>. Vous pouvez également introduire une réclamation auprès de la CNIL.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">8. Géolocalisation</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        La géolocalisation n'est activée qu'avec votre consentement explicite. Elle est utilisée pour proposer des activités
                        proches de chez vous et n'est pas conservée de façon permanente sauf si vous l'autorisez. Un message clair est présenté
                        avant toute demande d'accès à la position.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">9. Cookies</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                        Le site peut utiliser :
                    </p>
                    <ul className="list-disc pl-5 text-neutral-700 space-y-2 mb-3">
                        <li>Cookies techniques nécessaires au fonctionnement (connexion, sécurité).</li>
                        <li>Cookies de mesure d'audience (ex : Google Analytics) : activés seulement après consentement.</li>
                        <li>Cookies fonctionnels et de personnalisation : après consentement.</li>
                    </ul>
                    <p className="text-neutral-700">
                        Un bandeau cookies informera l'utilisateur lors de la première visite et permettra de gérer ses choix.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">10. Sécurité</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        SportRadar met en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les données :
                    </p>
                    <ul className="list-disc pl-5 text-neutral-700 space-y-2">
                        <li>Chiffrement des mots de passe (bcrypt ou équivalent).</li>
                        <li>Connexion sécurisée via HTTPS/TLS.</li>
                        <li>Accès restreint et journalisation des actions sensibles.</li>
                        <li>Mises à jour régulières des dépendances.</li>
                    </ul>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-3">11. Modifications de la politique</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Cette politique peut être mise à jour. La date de dernière mise à jour sera indiquée en haut de la page. En cas de changement
                        majeur, un message sera affiché aux utilisateurs.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-3">Contact</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Pour toute question relative à la protection des données : <br />
                        📩 <strong>contact@sportRadar.fr</strong>
                    </p>
                </section>

                <p className="text-sm text-neutral-500 text-center">
                    Dernière mise à jour : 24/11/2025
                </p>
            </div>
        </div>
    );
}