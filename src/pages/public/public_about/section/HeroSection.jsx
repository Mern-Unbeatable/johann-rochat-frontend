import React from 'react';

const AboutHero = () => {
  return (
    <section 
      className="relative w-full bg-[#FFFCF6] overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center justify-center px-4"
      style={{
        backgroundImage: `url('/aboutHero.png')`, 
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto', 
      }}
    >
      
      {/* Figma-r moto subtle blurred glow effects (Optional, image-er depth baranor jonno) */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary opacity-[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Badge: La technologie au service des gens */}
        {/* 1. Sub-badge */}
          <div className="mb-6 flex items-center space-x-2 rounded-full bg-[#E1ECE9] px-4 py-1.5 border border-[#3D7A6D]/10">
        
            <p className="text-[12px] md:text-base font-medium text-[#3D7A6D]">
             La technologie au service des gens.
            </p>
          </div>
        {/* Content Box */}
        <div className="max-w-[950px] w-full text-center flex flex-col gap-4">
          
          {/* Main Title: À propos de Casagen */}
          <h1 className="text-[#334155] text-2xl md:text-4xl lg:text-[56px] font-[600]  tracking-tight leading-[1.1]">
            À propos de Casagen
          </h1>

          {/* Subtitle / Description */}
          <p className="text-[#6B7280] text-base md:text-lg  font-['Poppins'] leading-relaxed max-w-2xl mx-auto">
            La plateforme intelligente, développée avec l’expertise d’un expert immobilier suisse, 
            qui permet aux particuliers de créer des annonces immobilières professionnelles 
            en toute simplicité.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutHero;