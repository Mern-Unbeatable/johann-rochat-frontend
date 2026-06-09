
import React from 'react';
import { Check } from 'lucide-react'; 

const AgentSection = () => {
    return (
        <section className="bg-[#FAF9F7] pt-16 pb-12 sm:pb-32 md:pb-40 relative ">
            <div className="container mx-auto max-w-7xl px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
                
                {/* LEFT COLUMN: Text & Badge */}
                <div className="w-full lg:w-[600px] flex flex-col gap-10">
                    <div className="flex flex-col gap-8">
                        <h2 className="text-[#374151] text-2xl md:text-[40px] font-semibold font-['Inter'] leading-[1.2]">
                            Développé par un agent immobilier titulaire d'un brevet fédéral en Suisse
                        </h2>

                        <div className=" w-full inline-flex items-center gap-6 bg-white p-5 rounded-xl shadow-[0px_2px_18px_rgba(0,0,0,0.06)] border border-[#E5E7EB] md:w-fit">
                        <div
    className="w-10 md:w-16 h-10 md:h-20 bg-[#3A7D6C] flex rounded-md items-center justify-center shrink-0"
    style={{
      clipPath: "polygon(20% 0%, 80% 0%, 100% 0, 100% 0, 100% 66%, 47% 100%, 0 66%, 0 0)",
    }}
  >
    <Check className="text-white w-6 md:w-8 h-6 md:h-8 stroke-[3px]" />
  </div>
                            
                            <div className="flex flex-col gap-1">
                                <div className="text-[#374151] text-lg md:text-[24px] font-[600] font-['Inter'] leading-tight">
                                    Expertise certifiée
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-[#E20C0C] rounded-sm flex items-center justify-center relative">
                                        <div className="w-3 h-[2px] bg-white absolute"></div>
                                        <div className="w-[2px] h-3 bg-white absolute"></div>
                                    </div>
                                    <span className="text-[#6B7280] text-[18px] font-normal font-['Inter']">Suisse</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-[#374151] text-lg font-[500]  leading-relaxed">
                            Votre annonce immobilière est entre les mains d’un expert.
                        </p>
                        <p className="text-[#6B7280] text-[16px]  leading-relaxed opacity-80">
                            2026 Casagen. Développé par un agent immobilier titulaire d'un <br className="hidden md:block"/> brevet fédéral en Suisse.
                        </p>
                    </div>

                    {/* MOBILE ONLY IMAGE: Sudhu mobile device a show hobe */}
                    <div className="block lg:hidden w-full mt-4">
                        <img 
                            src="/agent.png" 
                            alt="Agent Mobile" 
                            className="w-full h-full "
                        />
                    </div>
                </div>

                {/* RIGHT COLUMN: Large Device er jonno (Mobile a hide thakbe) */}
                <div className="hidden lg:block relative pt-10 pr-10">
                    {/* Background Decorative Frame */}
                    <div className="absolute -bottom-5 right-6 w-[320px] h-[340px] border-4 border-[#3A7D6C] rounded-[10px] z-0"></div>
                    
                    {/* Main Image */}
                    <div className="relative z-10 w-[460px] h-[450px] rounded-[15px] overflow-hidden shadow-2xl">
                        <img 
                            src="/agentlarge.png" 
                            alt="Main Agent" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Small Floating Image */}
                    <div className="absolute -left-22 -bottom-20 w-[140px] h-[130px] z-20 hidden md:block">
                        <img 
                            src="/agentSmall.jpg" 
                            alt="Small Detail" 
                            className="w-full h-full object-cover rounded-[10px] outline-[4px] outline-[#FAF9F7] shadow-lg"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AgentSection;