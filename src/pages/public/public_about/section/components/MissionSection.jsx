import React from 'react';

const MissionSection = () => {
  return (
    <div>
      <section className="container mx-auto max-w-7xl px-4 lg:px-12 py-12 md:pt-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative h-87.5 md:h-112.5">
            <div className="absolute top-0 left-0 w-[75%] z-10">
              <img
                src="/mission1.jpg"
                alt="Notre mission top"
                className="w-full rounded-2xl  border-4 border-white object-cover h-62.5 md:h-75"
              />
            </div>
            <div className="absolute bottom-4 right-0 w-[65%] z-20">
              <img
                src="/mission2.jpg"
                alt="Notre mission bottom"
                className="w-full rounded-2xl  border-4 border-white object-cover h-50 md:h-62.5"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className=" text-2xl md:text-[40px] font-[600]  text-[#334155] leading-tight">Notre mission</h2>
            <div className="space-y-4   leading-relaxed max-w-lg">
              <p className='text-base lg:text-lg text-[#64748B] '>
                Casagen est né d'un constat simple : de nombreuses personnes rencontrent des difficultés à rédiger une annonce immobilière efficace.
              </p>
              <p className='text-base lg:text-lg text-[#64748B]'>
                Manque de temps, manque d’expérience, peur de se tromper…Notre mission est de rendre la création d’annonces accessible à tous, grâce à la technologie et à une véritable expertise du terrain.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default MissionSection;

