import React from 'react';
import HowItWorksSection from './section/HowItWorksSection';
import CTASection from '../price/components/CTASection';

const HowItWorks = () => {
  return (
    <div className="bg-[#FAF9F7]">
      <header className="mx-auto flex h-auto min-h-100 max-w-7xl flex-col items-center justify-center px-6 py-12 text-center md:min-h-[125 md:py-0">
        {/*  Sub-badge */}
        <div className="mb-6 flex items-center space-x-2 rounded-sm border border-[#3D7A6D]/10 bg-[#E9E9E9] px-4 py-1.5">
          <div className="h-3 w-3 rounded-full bg-[#3D7A6D]"></div>
          <p className="text-[12px] font-medium text-[#3D7A6D] md:text-base">
            Des publicités professionnelles, sans être un pro.
          </p>
        </div>

        {/* Main Heading */}
        <h1 className="hidden max-w-4xl text-3xl pb-4 leading-[1.15] font-bold tracking-tight text-[#374151] md:block md:text-6xl">
          Créez votre annonce <br />
          immobilière en quelques <br />
          minutes seulement
        </h1>
        <h1 className="block px-4  pb-4 text-center text-3xl leading-[1.3] font-extrabold text-[#374151] md:hidden">
          Créez votre annonce <br />
          immobilière en <br />
          quelques minutes <br />
          seulement
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-lg leading-relaxed text-[#6B7280] md:text-xl">
          Annonces claires, professionnelles et efficaces, alimentées par l'IA et l'expertise d'un
          agent immobilier en Suisse.
        </p>
      </header>

      {/* How it works feature section */}
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default HowItWorks;
