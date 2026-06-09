import React from 'react';

const HeroSection = () => {
    return (
        <section className="bg-[#FFFCF6] w-full overflow-hidden py-8 md:py-0 min-h-[400px] md:min-h-[500px]">
            {/* Container ke 'relative' kora hoyeche jate image baire na jay */}
            <div className="container mx-auto max-w-7xl px-4 lg:px-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    
                    {/* TEXT CONTENT */}
                    <div className="order-2 md:order-1 w-full md:w-1/2 z-20">
                        {/* Pricing Badge */}
                        <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
                            À partir de CHF 9.–
                        </span>
                        
                        {/* Heading */}
                        <h1 className="text-[40px] md:text-[56px] leading-[1.1] font-bold text-[#2D3648] mb-6">
                            Tarification <span className="text-[#2D3648]">simple et</span> <br className="hidden md:block" />
                            <span className="text-[#2D3648]">transparente</span>
                        </h1>
                        
                        {/* Subtext */}
                        <p className="text-lg md:text-xl text-[#718096] mb-8 max-w-md">
                            Payez uniquement ce dont vous avez besoin. Pas d'abonnement.
                        </p>
                        
                        {/* CTA Button */}
                        <a href="#pricing" className="bg-primary hover:bg-[#356657] text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-md inline-block text-center">
                            Choisissez votre pack
                        </a>
                    </div>

                    {/* IMAGE SECTION */}
                    <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center md:justify-end">
                        <div className="relative w-full max-w-[480px]">
                            
                            {/* MOBILE IMAGE */}
                            <div className="block md:hidden">
                                <img 
                                    src="/pricingHeroSmall.png" 
                                    alt="Agent mobile view" 
                                    className="w-full h-auto object-contain"
                                />
                            </div>

                            {/* DESKTOP IMAGE */}
                            {/* h-[500px] thakbe, kintu image overflow control kora hoyeche */}
                            <div className="hidden md:block relative h-[450px] lg:h-[500px]">
                                <img 
                                    src="/pricingHeroLarge.png" 
                                    alt="Agent desktop view" 
                                    className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom z-10"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;