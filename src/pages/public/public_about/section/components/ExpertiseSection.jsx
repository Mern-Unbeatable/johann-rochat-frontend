import React from 'react';
import { ShieldCheck, Layout, LineChart } from 'lucide-react';

const ExpertiseSection = () => {
  return (
    <div className="bg-[#FAF9F7]">
      <section className="container mx-auto max-w-7xl px-4 lg:px-12 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 md:order-1">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#334155] leading-tight mb-4">
              Une véritable <br /> expertise
            </h2>
            <p className="text-[#64748B] text-lg leading-relaxed mb-6 max-w-md">
              Le projet est porté par un professionnel de l'immobilier en Suisse, titulaire du brevet fédéral.
              Cette expertise nous permet de concevoir des annonces parfaitement adaptées aux exigences du marché.
            </p>

            <div className="pt-2 border-t-2 border-gray-200">
              <p className="text-xl md:text-2xl font-[600] text-[#334155]">
                La technologie au service des gens.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 flex items-center gap-6">
            <div className="">
              <img
                src="/expertRight.png"
                alt="Expert showing tablet"
                className="w-full h-auto "
              />
            </div>

            {/* Vertical Icons - Mobile a hide, md breakpoint theke flex hobe */}
            <div className="hidden md:flex flex-col gap-6">
              <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center text-primary transition-colors hover:bg-[#3D7D6C] hover:text-white cursor-pointer">
                <Layout size={24} />
              </div>
              <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center text-primary transition-colors hover:bg-[#3D7D6C] hover:text-white cursor-pointer">
                <ShieldCheck size={24} />
              </div>
              <div className="w-14 h-14 rounded-full border border-primary flex items-center justify-center text-primary transition-colors hover:bg-[#3D7D6C] hover:text-white cursor-pointer">
                <LineChart size={24} />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ExpertiseSection;