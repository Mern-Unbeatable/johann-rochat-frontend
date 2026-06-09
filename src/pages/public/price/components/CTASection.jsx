import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="relative w-full bg-white py-20 px-4 md:px-[50px] overflow-hidden flex flex-col items-center justify-center">

            {/* LEFT TOP Background Image Placeholder */}
            <div className="absolute top-0 left-0 w-[200px] md:w-[400px] opacity-60 pointer-events-none">
                <img
                    src="/ctaLeftTop.png"
                    alt=""
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* RIGHT BOTTOM Background Image Placeholder */}
            <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] opacity-60 pointer-events-none">
                <img
                    src="/ctaRightBottom.png"
                    alt=""
                    className="w-full h-full "
                />
            </div>

            <div className="relative z-10 max-w-[736px] w-full flex flex-col items-center gap-6">

                {/* Heading */}
                <h2 className="w-full text-center text-[#374151] text-3xl md:text-[40px] font-bold font-['Inter'] leading-tight">
                    Prêt à créer votre annonce professionnelle ?
                </h2>

                {/* Button Wrapper with Outline */}
                <div className="p-[5px] rounded-[13px] border border-[#347161] flex items-center justify-center">

                    {/* Main Button */}
                    <Link to='/creer-annonce'>
                        <button className="bg-[#347161] hover:bg-[#2a5a4d] transition-colors px-8 py-[13px] rounded-[8px] flex items-center justify-center gap-[10px]">

                            <span className="text-[#EBF2F0] text-lg md:text-[20px] font-medium font-['Poppins']">
                                Commencez maintenant
                            </span>

                        </button>
                    </Link>
                </div>

            </div>


        </section>
    );
};

export default CTASection;