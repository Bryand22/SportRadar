import React from "react";

export default function MentionsLegales() {
    return (
        <div className="min-h-screen bg-white py-16">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-center">Mentions Légales</h1>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        <strong>SportRadar</strong>est édité dans le cadre d’un projet académique.
                        <br />
                        <br />
                        <strong>Responsable de publication :</strong> Bryand Fridolin NGASSAMA ELOUNDOU
                        <br />
                        <strong>Email :</strong> contact@sportRadar.fr
                        <br />
                        <strong>Statut :</strong> Projet étudiant – site non commercial.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Hébergement du site</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Le site est hébergé par :
                        <br />
                        <strong>[Nom de l’hébergeur]</strong>
                        <br />
                        Adresse : [Adresse de l’hébergeur]
                        <br />
                        Téléphone : [Numéro]
                        <br />
                        Site web : [URL]
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        L’ensemble du contenu présent sur le site (textes, images, vidéos, logos,
                        graphismes, code source) est protégé par le Code de la Propriété
                        Intellectuelle.
                        <br />
                        Toute reproduction ou diffusion non autorisée est interdite.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Responsabilité</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Les informations et recommandations fournies par SportRadar sont basées sur
                        des données externes telles que la météo ou la qualité de l’air.
                        <br />
                        SportRadar ne peut garantir l’exactitude totale de ces données ni être tenu
                        responsable de l’utilisation faite des recommandations.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                    <p className="text-neutral-700 leading-relaxed">
                        Pour toute question ou demande, vous pouvez nous contacter à l’adresse
                        suivante :
                        <br />
                        📩 <strong>contact@sportRadar.fr</strong>
                    </p>
                </section>
            </div>
        </div>
    );
}