

import React from "react";
import { Home, Sparkles, Share2 } from "lucide-react";

const StepCard = ({ number, title, text, Icon, highlight }) => (
  <div
    className={`
      flex-1 w-full p-8 rounded-lg flex flex-col gap-6 transition-all
      ${highlight 
        ? "bg-[#E8EEEC] shadow-md lg:flex-[1.3] lg:scale-110 lg:mx-6 lg:z-10" 
        : "bg-[#E8EEEC] lg:flex-1 hover:shadow-sm"}
    `}
  >
    {/* Top Row */}
    <div className="flex justify-between items-center w-full">
      <div className="w-12 h-12 bg-[#3A7D6C] rounded-lg flex items-center justify-center shadow-sm">
        <Icon className="w-6 h-6 text-white" />
      </div>

      <div className="text-[28px] md:text-[32px] font-[600] leading-none bg-gradient-to-b from-[#3A7D6C] to-[#F9F8F600] bg-clip-text text-transparent">
        {number}
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-2">
      <h4 className="text-[#374151] text-[20px] md:text-[24px] font-semibold leading-tight">
        {title}
      </h4>
      <p className="text-[#6B7280] text-[14px] md:text-[16px] leading-relaxed">
        {text}
      </p>
    </div>
  </div>
);

const StepsSection = () => {
  return (
    <section className="bg-[#FAF9F7] py-6 md:py-12 ">
      <div className="container mx-auto max-w-7xl px-4 lg:px-12">

        {/* Header */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-[#374151] text-[28px] md:text-[40px] font-bold mb-2">
            Comment ça marche ?
          </h2>
          <p className="text-[#6B7280] text-[16px] md:text-[18px]">
            Votre annonce, prête en quelques clics.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch lg:items-center">

          <StepCard
            number="01"
            Icon={Home}
            title="Décrivez votre propriété"
            text="Remplissez des champs simples concernant votre propriété"
          />

          <StepCard
            number="02"
            Icon={Sparkles}
            highlight={true}
            title="Laissez Casagen faire le travail"
            text="L'IA génère des publicités professionnelles avec une expertise suisse. Publiez votre annonce."
          />

          <StepCard
            number="03"
            Icon={Share2}
            title="Obtenez l'annonce de votre choix"
            text="Copiez, téléchargez et partagez votre annonce facilement"
          />

        </div>
      </div>
    </section>
  );
};

export default StepsSection;