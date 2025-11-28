import React, { useState } from "react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "Qu’est-ce que SportRadar ?",
            answer:
                "SportRadar est une plateforme qui recommande des activités sportives près de chez vous, adaptées à la météo, à la qualité de l'air et à vos préférences personnelles."
        },
        {
            question: "Comment fonctionne la recommandation d’activités ?",
            answer:
                "SportRadar utilise votre localisation (avec votre accord), les données météo, l’indice de qualité de l’air et vos préférences pour générer des activités adaptées comme le running, la marche, le yoga ou le vélo."
        },
        {
            question: "Est-ce que SportRadar est gratuit ?",
            answer:
                "Oui ! Une version gratuite est disponible. Une version Premium ajoute des fonctionnalités comme des filtres avancés, des données en temps réel améliorées et un coaching personnalisé."
        },
        {
            question: "Ma localisation est-elle enregistrée ?",
            answer:
                "Non. Votre localisation est uniquement utilisée en temps réel pour proposer des recommandations locales. Elle n’est jamais stockée sans votre consentement explicite."
        },
        {
            question: "SportRadar garantit-il la précision des données météo ?",
            answer:
                "Les données proviennent d’APIs externes (OpenWeather, AirParif). Bien que fiables, SportRadar ne peut garantir une exactitude totale."
        },
        {
            question: "Puis-je utiliser SportRadar sans compte ?",
            answer:
                "Oui, certaines fonctionnalités comme les recommandations basiques restent accessibles. Le compte permet d’obtenir un suivi personnalisé et des fonctionnalités avancées."
        },
        {
            question: "Que fait SportRadar de mes données personnelles ?",
            answer:
                "Seulement ce qui est nécessaire : email, préférences sportives, historique d’activité (si activé). Vous pouvez demander la suppression de vos données à tout moment."
        },
        {
            question: "SportRadar fonctionne-t-il à l’étranger ?",
            answer:
                "Oui ! Tant que les APIs météo couvrent la zone, les recommandations fonctionnent partout dans le monde."
        },
        {
            question: "Est-ce adapté aux débutants et aux seniors ?",
            answer:
                "Oui, les recommandations s’adaptent automatiquement au niveau, à l’intensité souhaitée et aux conditions locales."
        },
        {
            question: "Comment contacter l’équipe SportRadar ?",
            answer:
                "Vous pouvez nous contacter à l’adresse suivante : contact@sportradar.fr."
        }
    ];

    return (
        <div className="min-h-screen bg-white py-16">
            <div className="container-custom max-w-3xl">
                <h1 className="text-4xl font-bold text-center mb-10">FAQ – SportZen</h1>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-neutral-200 rounded-xl shadow-sm p-5 transition"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full text-left flex justify-between items-center"
                            >
                                <span className="text-lg font-semibold">{faq.question}</span>
                                <span className="text-2xl font-bold">
                                    {openIndex === index ? "–" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <p className="mt-3 text-neutral-700 leading-relaxed">
                                    {faq.answer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}