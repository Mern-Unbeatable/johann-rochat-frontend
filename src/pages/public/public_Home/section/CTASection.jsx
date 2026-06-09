import React from 'react';
import { Check, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  'Gain de temps.',
  'Annonces professionnelles.',
  'Adapté au marché suisse.',
  'Pas de jargon technique.',
  'Accessible à tous.',
  'Résultats immédiats.'
];

const CTASection = () => {
  return (
    <section className="relative bg-white py-12 md:py-20 overflow-hidden">

      {/* Decorative Right-Bottom Pattern */}
      {/* Image-er moto exact position korar jonno bottom-0 right-0 use kora hoyeche */}
      <div className="absolute bottom-0 right-0 w-75 md:w-100 lg:w-175 pointer-events-none z-0">
        <img
          src="/homeCtaBg.png"
          alt="background pattern"
          className="w-full h-auto  object-bottom-right "
        />
      </div>

      <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

          {/* Left Side: Headline + Bullets */}
          <div className="w-full lg:w-[50%]">
            <h3 className="text-[#334155] text-2xl md:text-[40px] font-bold font-['Inter'] leading-[1.1] mb-8 md:mb-12 max-w-[600px]">
              Votre annonce, prête en seulement quelques clics.
            </h3>

            <ul className="space-y-5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full border border-[#417D6A] flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-[#417D6A] stroke-[3px]" />
                  </div>
                  <span className="text-[#64748B] text-base font-medium font-['Poppins']">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: CTA Card */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div className="bg-[#FAF9F7] rounded-lg border border-gray-200 p-4 md:p-8 shadow-[0px_20px_50px_rgba(0,0,0,0.04)] w-full max-w-[500px] flex flex-col items-center text-center">

              {/* Rocket Icon Container */}
              <div className="w-20 h-20 bg-[#E7EDE9] rounded-full flex text-primary items-center justify-center mb-4 md:mb-10">
                <Rocket className='h-6 w-6' />
              </div>

              <h4 className="text-[24px] md:text-[28px] font-bold text-[#6B7280] font-['Inter'] mb-4">
                Tarif : à partir de 9.90 CHF
              </h4>
              <p className="text-[#6B7280] text-[16px] md:text-[18px] font-['Poppins'] leading-relaxed mb-12">
                Pas d'abonnement, pas d'engagement. <br /> Payez uniquement ce dont vous avez besoin.
              </p>

              <Link
                to="/creer-annonce"
                className="w-full py-2 md:py-5 px-4 md:px-10 rounded-lg bg-primary text-white text-[18px] md:text-[20px] font-bold font-['Poppins'] transition-all hover:bg-[#346657] "
              >
                Créer mon annonce
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;