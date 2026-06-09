import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
 
const StatCard = ({ value, label }) => (
  <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-lg bg-[#FEFEFE] py-11 px-4 shadow-[0px_2px_18px_rgba(190,185,185,0.25)] transition-all hover:shadow-md h-[200px]">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <span className="text-6xl  font-[700] text-primary/10 tracking-tighter leading-none">
        {value}
      </span>
    </div>
   
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="text-3xl  font-[600] text-[#374151] tracking-tight leading-none">
        {value}
      </div>
      <div className="mt-4 text-[14px] md:text-[16px] font-[600] text-[#6B7280] leading-tight font-['Poppins']">
        {label}
      </div>
    </div>
  </div>
);
 
const FeatureSection = () => {
  return (
    <section className="bg-[#FAF9F7] py-8 md:py-12 md:pt-20 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 lg:px-12">
       
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-10 md:mb-16">
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            <span className="text-primary text-base font-normal font-['Poppins']">
              POURQUOI CASAGEN ?
            </span>
            <h2 className="text-[#374151] text-2xl md:text-[40px] font-[600] font-['Inter'] leading-tight">
              Créez des annonces immobilières percutantes en quelques clics, sans aucun effort.
            </h2>
          </div>
          <div className="w-full lg:w-1/2">
            <p className="text-[#6B7280] text-lg md:text-xl  font-['Poppins'] leading-relaxed">
              Combinez la puissance de l'intelligence artificielle avec l'expertise humaine d'un professionnel pour obtenir des résultats exceptionnels.
            </p>
          </div>
        </div>
 
        {/* Content Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-12">
         
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            <div className="flex flex-col gap-4 md:gap-6">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <StatCard value="15+" label="Années d'expertise" />
                <StatCard value="2 minutes" label="Pour créer votre annonce" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <StatCard value="9.90 CHF" label="Prix initial" />
                <StatCard value="100%" label="Qualité Suisse" />
              </div>
            </div>
 
            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 rounded-lg bg-primary px-6 py-3 text-white text-xl font-medium font-['Poppins'] transition-all hover:bg-[#2E6456]"
              >
                <span>À propos de nous</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
 
          {/* RIGHT COLUMN: Image Mosaic */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {/* Top row - stacks on mobile */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <img
                src="/feature1.png"
                alt="Property"
                className="w-full lg:w-[49%] h-50 md:h-43.75 object-cover rounded shadow-sm"
              />
              <img
                src="/feature2.png"
                alt="Interior"
                className="w-full lg:w-[49%] h-50 md:h-43.75 object-cover rounded shadow-sm"
              />
            </div>
            {/* Bottom row - stacks on mobile */}
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              <img
                src="/feature3.png"
                alt="Detail"
                className="w-full lg:w-[35%] h-50 md:h-43.75 object-cover rounded-lg shadow-sm"
              />
              <img
                src="/feature4.png"
                alt="Main showcase"
                className="w-full lg:w-[62%] h-50 md:h-43.75 object-cover rounded shadow-sm"
              />
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
};
 
export default FeatureSection;
 