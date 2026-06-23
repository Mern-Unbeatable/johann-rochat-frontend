import React from 'react';

const HowItWorksSection = () => {
    const steps = [
        {
            title: "Décrivez votre propriété",
            description: "Une expérience guidée et sans stress pour capturer chaque détail de votre maison.",
            features: [
                "Formulaire simple et intuitif, conçu pour le marché suisse",
                "Assistant intelligent pour renseigner surfaces, pièces et niveaux",
                "Prise en compte des équipements spécifiques (buanderie, ascenseur, etc.)",
                "Transformation automatique de vos informations en description immobilière professionnelle"
            ],
            image: "/step1.jpg", 
            layout: "text-left"
        },
        {
            title: "Laissez Casagen faire le travail",
            description: "Des annonces professionnelles générées grâce à une IA performante et à une véritable expertise immobilière suisse.",
            features: [
                "IA entraînée sur des milliers d'annonces immobilières suisses performantes",
                "Supervisée par un professionnel de l'immobilier (brevet fédéral)",
                "Génération de descriptions structurées et d'accroches percutantes",
                "Un ton adapté aux attentes et aux standards du marché suisse"
            ],
            image: "/step2.png", 
            layout: "image-left"
        },
        {
            title: "Publiez votre annonce",
            description: "Votre annonce professionnelle est prête à être diffusée en quelques clics.",
            features: [
                "Aperçu complet avec possibilité de modifier ou régénérer le texte",
                "Export en un clic au format PDF pour un partage professionnel",
                "Copier-coller rapide pour les portails immobiliers",
                "Des résultats rapides et efficaces pour maximiser votre visibilité."
            ],
            image: "/step3.jpg", 
            layout: "text-left"
        }
    ];

    return (
        <div className="bg-[#FFFCF6] py-12 md:py-20   overflow-hidden">
            <div className=" relative container mx-auto max-w-7xl px-4 lg:px-12">
                
                {/* SVG Connection Curves - Sudhu Desktop/Laptop (lg) e dekhabe */}
                <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
                    <svg className="w-full h-full" viewBox="0 0 1000 1200" preserveAspectRatio="none">
                        <path 
                            d="M 620 320 C 550 450, 450 480, 380 480" 
                            stroke="#3A7D6C" 
                            strokeWidth="1.5" 
                            fill="none"
                            strokeLinecap="round"
                        />
                        <path 
                            d="M 380 750 C 450 880, 550 910, 620 910" 
                            stroke="#3A7D6C" 
                            strokeWidth="1.5" 
                            fill="none"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Content Sections */}
                <div className="space-y-24 md:space-y-32 lg:space-y-40 relative z-10">
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col items-center gap-10 md:gap-16 ${
                                step.layout === 'image-left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
                            }`}
                        >
                            {/* Text Container */}
                            <div className="flex-1 space-y-4 md:space-y-5 order-2 lg:order-none ">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-[600] text-[#334155] tracking-tight leading-tight">
                                    {step.title}
                                </h2>
                                <p className="text-[#6B7280] leading-relaxed text-base md:text-lg max-w-lg">
                                    {step.description}
                                </p>
                                <ul className="space-y-3">
                                    {step.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-start gap-3">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                            <span className="text-[#6B7280] leading-relaxed text-base">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Image Container - Size Optimized */}
                            <div className="flex-1 w-full max-w-lg lg:max-w-[480px] order-1 lg:order-none">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-[#3A7D6C]/5 rounded-[2rem] blur-xl opacity-50" />
                                    <img 
                                        src={step.image} 
                                        alt={step.title}
                                        className="relative w-full aspect-[4/3] object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-white/50"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default HowItWorksSection;