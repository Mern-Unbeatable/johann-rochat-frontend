import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Hero.css'
const HeroSection = () => {
  return (
    <section className="relative responsiveStyle flex min-h-[50vh] w-full flex-col items-center justify-start overflow-hidden bg-[#FFFCF6] md:min-h-[50vh] lg:min-h-[85vh] xl:min-h-[120vh] 2xl:min-h-230">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-[#FFFCF6]"
      // style={{ backgroundImage: "url('/main-hero-screen.jpg')" }}
      />

      {/* --- Floating Individual Images Layer --- */}
      <div className="pointer-events-none absolute inset-0 z-0 mx-auto w-full max-w-7xl">
        {/* Image 1: Moved to Top Right (AI Description Card) */}
        <img
          src="/hero-1.png"
          alt="Image 1"
          className="firstImg hidden md:block absolute top-[12%] right-[-5%] w-60 transform md:top-[16%] md:right-[2%] md:w-50 lg:top-[14%] lg:right-[4%] lg:w-62 xl:top-[15%] xl:right-[8%] xl:w-73 2xl:right-[-16%] 2xl:w-120"
        />

        {/* Image 2: Middle/Bottom Left (Appartement Card) */}
        <img
          src="/hero-2.png"
          alt="Image 2"
          className=" secondImg absolute top-[60%] left-[1%] w-30 transform md:top-[40%] md:left-[1%] md:w-58 lg:top-[43%] lg:left-[1%] lg:w-65 xl:top-[32%] xl:left-[2%] xl:w-115 2xl:top-[10%] 2xl:left-[-18%] 2xl:w-165"
        />

        {/* Image 3: Bottom Right (Building Card) */}
        <img
          src="/hero-3.png"
          alt="Image 3"
          className="thirdImg absolute top-[62%] right-[1%] w-48 rotate-20 transform md:top-[65%] md:right-[3%] md:w-68 md:-rotate-8 lg:top-[66%] lg:right-[5%] lg:w-80 xl:top-[64%] xl:right-[8%] xl:w-110 2xl:top-[55%] 2xl:right-[-15%] 2xl:w-200 2xl:-rotate-4"
        />
      </div>

      {/* --- Main Content Layer --- */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-1 pt-10 text-[10px] text-center md:pt-14 lg:pt-28 xl:pt-32">
        {/* Sub-badge */}
        <div className="mb-6 flex items-center  space-x-2 rounded-full border border-[#3D7A6D]/20 bg-[#F0F2F1]/90 px-4 py-1.5 backdrop-blur-sm md:py-1.75 lg:py-2 xl:py-2">
          <div className="h-2 w-2 rounded-full bg-[#3D7A6D]"></div>
          <span className="font-poppins text-[9px] font-semibold tracking-wide text-[#3D7A6D] uppercase md:text-[11px] lg:text-xs">
            Des publicités professionnelles, sans être un pro
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-center text-[15px] leading-[1.2] font-[600] tracking-tight text-[#2D3748] md:text-[25px] lg:text-[40px] lg:leading-[1.15] xl:text-5xl xl:leading-[1.1] 2xl:text-6xl">
          Créez votre annonce <br className="hidden md:block" />
          immobilière en quelques <br className="hidden md:block" />
          minutes seulement
        </h1>

        {/* Subtitle */}
        <p className="font-poppins mt-2 max-w-md px-2 text-[12px] leading-relaxed text-[#5C667B] md:text-[15px] lg:max-w-xl lg:text-base xl:text-lg 2xl:text-xl">
          Annonces claires, professionnelles et efficaces, propulsées par l’IA et l’expertise d’un
          agent immobilier avec brevet fédéral en Suisse
        </p>

        {/* CTA Button */}
        <div className="mt-3 mb-24 md:mt-9 md:mb-10 lg:mt-10 lg:mb-8 xl:mb-0">
          <Link
            to="/creer-annonce"
            className="font-poppins inline-flex items-center space-x-2 rounded-lg bg-[#3D7A6D] px-2 py-2 text-[12px] font-semibold text-white shadow-md transition-all hover:bg-[#34695e] active:scale-95 md:px-9 md:py-2 md:text-sm lg:px-10 lg:py-4 lg:text-lg xl:px-10 xl:py-4 xl:text-lg"
          >
            <span>Créer mon annonce</span>
            {/* <ArrowRight className="h-5 w-5 ml-1" /> */}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
