import { FileText } from "lucide-react";
import React from "react";
import { Link } from 'react-router-dom';

const PromoSection = ({ bg = '#FAF9F7' }) => {
  return (
    <section style={{ backgroundColor: bg }} className="py-6 md:py-12 md:pt-20 overflow-hidden">
      {/* Container restricted to max-7xl and centered */}
      <div className="container mx-auto max-w-7xl px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* LEFT COLUMN: Text & Card */}
          <div className="w-full lg:w-[477px] flex flex-col gap-[11px] shrink-0">
            <h2 className="text-[#374151] text-2xl md:text-[40px] font-semibold font-['Inter'] leading-tight">
              Créez votre première annonce.
            </h2>
            <p className="text-[#6B7280] text-[16px] font-normal font-['Poppins'] mb-2">
              Vous devez déverrouiller vos annonces avant de pouvoir les consulter.
            </p>

            {/* Figma Style Promo Card with Outline */}
            <div className="p-4 rounded-[20px] border-2 border-primary flex flex-col gap-[10px] w-full">
              <div className="bg-primary p-4 md:p-10 rounded-[16px] shadow-[0px_4px_18px_rgba(0,0,0,0.25)] flex flex-col items-center gap-10">

                <div className="flex flex-col items-center gap-5 text-center">
                  {/* Icon Circle */}
                  <div className="w-16 h-16 bg-[#E7EDE9] rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary "></FileText>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-white text-[21px] font-semibold font-['Inter']">
                      Créez votre annonce  pour 9.90 CHF
                    </h3>
                    <p className="text-[#FFFEFE] text-base font-normal font-['Poppins'] max-w-[373px]">
                      Débloquez votre annonce professionnelle. Accédez immédiatement à une publicité immobilière claire, structurée et percutante, conçue sur mesure pour le marché suisse.
                    </p>
                  </div>
                </div>


                {/* White Button */}
                <Link to="/creer-annonce" className="w-full inline-block py-2 md:py-3.25 px-4 md:px-6 bg-[#FAF9F7] rounded-[8px] text-[#374151] text-[20px] font-medium font-['Poppins'] hover:bg-white transition-all shadow-sm text-center">
                  Créer mon annonce
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Image Fixed inside Container */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <img
              src="/promosection.png"
              alt="Real estate showcase"
              // Size adjust kora hoyeche jate 7xl er bhetore thake
              className="w-full max-w-[650px] h-auto object-contain rounded-[20px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoSection;