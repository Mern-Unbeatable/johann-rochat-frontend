import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles, FileText, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-start overflow-hidden bg-[#FFFCF6] pt-12 pb-16 md:min-h-fit md:pt-16 md:pb-20 lg:min-h-fit lg:pt-16 lg:pb-12 xl:pt-20 xl:pb-6">
      {/* Background Graphic Lines */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Left Green Wavy Graphic */}
        <img
          src="/leftside.png"
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 hidden h-[85%] md:h-[90%] max-w-[25%] md:max-w-[20%] lg:max-w-[18%] object-contain object-left-bottom opacity-70 select-none lg:block"
        />
        {/* Right Soft Cream Gradient Graphic */}
        <img
          src="/right.png"
          alt=""
          className="absolute top-0 right-0 h-[60%] max-w-[45%] object-contain object-right object-top select-none md:h-full md:max-w-[35%] lg:max-w-[30%]"
        />
        {/* Mobile/Tablet Bottom Wave Graphic */}
        <img
          src="/mobile.png"
          alt=""
          className="absolute right-0 bottom-0 block max-w-[50%] select-none lg:hidden"
        />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 mx-auto mt-4 flex max-w-4xl flex-col items-center px-6 text-center md:mt-8 lg:mt-12">
        {/* Sub-badge */}
        <div className="mb-6 flex items-center space-x-2.5 rounded-full border border-[#3D7A6D]/20 bg-white/80 px-5 py-2 shadow-sm backdrop-blur-sm">
          <div className="h-2.5 w-2.5 rounded-full bg-[#3D7A6D]"></div>
          <span className="font-poppins text-[11px] font-medium tracking-wide text-[#3D7A6D] md:text-[13px]">
            Des publicités professionnelles, sans être un pro.
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-poppins text-center text-xl leading-[1.2] font-bold tracking-tight text-[#1A2E2A] sm:text-4xl md:text-5xl lg:text-[54px] lg:leading-[1.15]">
          Créez votre annonce <br />
          immobilière en quelques <br />
          minutes seulement
        </h1>

        {/* Subtitle */}
        <p className="font-poppins mt-5 max-w-2xl px-2 text-sm leading-relaxed text-[#5C667B] md:text-base lg:text-lg">
          Annonces claires, professionnelles et efficaces, alimentée par l'IA et{' '}
          <br className="hidden md:inline" />
          l'expertise d'un agent immobilier avec brevet fédéral en Suisse
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            to="/creer-annonce"
            className="font-poppins inline-flex items-center space-x-2 rounded-lg bg-[#3D7A6D] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#34695e] hover:shadow-xl active:scale-95"
          >
            <span>Créer mon annonce</span>
            <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Steps Indicator Section at the bottom */}
      <div className="relative z-10 mt-16 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-6 md:mt-20 lg:mt-24">
        <div className="flex flex-col items-center justify-center gap-0 md:flex-row md:items-start md:gap-4 lg:gap-6 xl:gap-8">
          {/* Step 1 */}
          <div className="relative flex max-w-[280px] flex-1 items-start gap-4 pb-8 md:pb-0">
            <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF2F0]">
                <Home className="h-5 w-5 text-[#3D7A6D]" />
              </div>
            </div>
            {/* Vertical connector for mobile */}
            <div className="absolute top-[56px] bottom-0 left-[27px] w-0 border-l-2 border-dotted border-[#3D7A6D]/60 md:hidden"></div>

            <div className="flex flex-col pt-1">
              <div className="text-xl font-bold tracking-wider text-[#3D7A6D] uppercase md:text-sm lg:text-sm xl:text-base 2xl:text-xl">
                01
              </div>
              <h4 className="mt-0.5 text-lg leading-tight font-bold text-[#1A2E2A] md:text-xs lg:text-xs xl:text-sm 2xl:text-lg">
                Données du bien
              </h4>
              <p className="mt-1 text-base leading-normal text-gray-500 md:text-[11px] lg:text-[11px] xl:text-[13px] 2xl:text-base">
                Ajoutez les informations essentielles de votre bien.
              </p>
            </div>
          </div>

          {/* Dotted Divider 1 */}
          <div className="hidden items-center justify-center self-center px-2 text-lg font-bold tracking-widest text-[#3D7A6D] opacity-40 lg:px-4 xl:hidden 2xl:flex">
            ••••••
          </div>

          {/* Step 2 */}
          <div className="relative flex max-w-[280px] flex-1 items-start gap-4 pb-8 md:pb-0">
            <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF2F0]">
                <Sparkles className="h-5 w-5 text-[#3D7A6D]" />
              </div>
            </div>
            {/* Vertical connector for mobile */}
            <div className="absolute top-[56px] bottom-0 left-[27px] w-0 border-l-2 border-dotted border-[#3D7A6D]/60 md:hidden"></div>

            <div className="flex flex-col pt-1">
              <div className="text-xl font-bold tracking-wider text-[#3D7A6D] uppercase md:text-sm lg:text-sm xl:text-base 2xl:text-xl">
                02
              </div>
              <h4 className="mt-0.5 text-lg leading-tight font-bold text-[#1A2E2A] md:text-xs lg:text-xs xl:text-sm 2xl:text-lg">
                IA générée
              </h4>
              <p className="mt-1 text-base leading-normal text-gray-500 md:text-[11px] lg:text-[11px] xl:text-[13px] 2xl:text-base">
                Notre IA rédige une annonce claire, complète et optimisée.
              </p>
            </div>
          </div>

          {/* Dotted Divider 2 */}
          <div className="hidden items-center justify-center self-center px-2 text-lg font-bold tracking-widest text-[#3D7A6D] opacity-40 lg:px-4 xl:hidden 2xl:flex">
            ••••••
          </div>

          {/* Step 3 */}
          <div className="relative flex max-w-[280px] flex-1 items-start gap-4">
            <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EBF2F0]">
                <FileText className="h-5 w-5 text-[#3D7A6D]" />
              </div>
            </div>
            <div className="flex flex-col pt-1">
              <div className="text-xl font-bold tracking-wider text-[#3D7A6D] uppercase md:text-sm lg:text-sm xl:text-base 2xl:text-xl">
                03
              </div>
              <h4 className="mt-0.5 text-lg leading-tight font-bold text-[#1A2E2A] md:text-xs lg:text-xs xl:text-sm 2xl:text-lg">
                Annonce prête à publier
              </h4>
              <p className="mt-1 text-base leading-normal text-gray-500 md:text-[11px] lg:text-[11px] xl:text-[13px] 2xl:text-base">
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
