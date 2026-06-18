import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles, FileText, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] lg:min-h-[95vh] w-full flex-col items-center justify-between overflow-hidden bg-[#FFFCF6] py-16 md:py-20 lg:py-24">
      {/* Background Graphic Lines */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Left Green Wavy Graphic */}
        <img
          src="/leftside.png"
          alt=""
          className="absolute left-0 top-0 h-full object-contain object-left select-none max-w-[35%] md:max-w-[25%] lg:max-w-[20%]"
        />
        {/* Right Soft Cream Gradient Graphic */}
        <img
          src="/right.png"
          alt=""
          className="absolute right-0 top-0 h-full object-contain object-right select-none max-w-[45%] md:max-w-[35%] lg:max-w-[30%]"
        />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center mt-4 md:mt-8 lg:mt-12">
        {/* Sub-badge */}
        <div className="mb-6 flex items-center space-x-2.5 rounded-full border border-[#3D7A6D]/20 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-sm">
          <div className="h-2.5 w-2.5 rounded-full bg-[#3D7A6D]"></div>
          <span className="font-poppins text-[11px] md:text-[13px] font-medium tracking-wide text-[#3D7A6D]">
            Des publicités professionnelles, sans être un pro.
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-center font-poppins text-3xl font-bold leading-[1.2] tracking-tight text-[#1A2E2A] sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.15]">
          Créez votre annonce <br />
          immobilière en quelques <br />
          minutes seulement
        </h1>

        {/* Subtitle */}
        <p className="font-poppins mt-5 max-w-2xl px-2 text-sm leading-relaxed text-[#5C667B] md:text-base lg:text-lg">
          Annonces claires, professionnelles et efficaces, alimentée par l'IA et <br className="hidden md:inline" />
          l'expertise d'un agent immobilier avec brevet fédéral en Suisse
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            to="/creer-annonce"
            className="font-poppins inline-flex items-center space-x-2 rounded-lg bg-[#3D7A6D] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#34695e] hover:shadow-xl active:scale-95"
          >
            <span>Créer mon annonce</span>
            <ArrowRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>

      {/* Steps Indicator Section at the bottom */}
      <div className="relative z-10 w-full max-w-5xl px-6 mt-16 md:mt-24 lg:mt-32">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-4 lg:gap-8">
          {/* Step 1 */}
          <div className="flex items-center gap-4 flex-1 max-w-[280px]">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#EBF2F0] flex items-center justify-center">
                <Home className="w-5 h-5 text-[#3D7A6D]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-[11px] font-bold text-[#3D7A6D] tracking-wider uppercase">01</div>
              <h4 className="text-sm font-bold text-[#1A2E2A] leading-tight mt-0.5">Données du bien</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                Ajoutez les informations essentielles de votre bien.
              </p>
            </div>
          </div>

          {/* Dotted Divider 1 */}
          <div className="hidden md:flex items-center justify-center self-center text-[#3D7A6D] opacity-40 font-bold tracking-widest text-lg px-2 lg:px-4">
            ••••••
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-4 flex-1 max-w-[280px]">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#EBF2F0] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#3D7A6D]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-[11px] font-bold text-[#3D7A6D] tracking-wider uppercase">02</div>
              <h4 className="text-sm font-bold text-[#1A2E2A] leading-tight mt-0.5">IA générée</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                Notre IA rédige une annonce claire, complète et optimisée.
              </p>
            </div>
          </div>

          {/* Dotted Divider 2 */}
          <div className="hidden md:flex items-center justify-center self-center text-[#3D7A6D] opacity-40 font-bold tracking-widest text-lg px-2 lg:px-4">
            ••••••
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-4 flex-1 max-w-[280px]">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#EBF2F0] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#3D7A6D]" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-[11px] font-bold text-[#3D7A6D] tracking-wider uppercase">03</div>
              <h4 className="text-sm font-bold text-[#1A2E2A] leading-tight mt-0.5">Annonce prête à publier</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                Recevez une annonce professionnelle, prête à être publiée en un clic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
