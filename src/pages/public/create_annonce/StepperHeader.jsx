import React from 'react';
import { Check } from 'lucide-react';

const StepperHeader = ({ steps, step, setStep }) => {
    return (
        <div className="text-left  px-4 bg-white p-10">
            <div className="flex items-center justify-center mb-12 max-w-5xl mx-auto">
                {steps.map((s, index) => (
                    <React.Fragment key={s.id}>
                        <div className="flex flex-col items-center relative group">
                            <div
                                onClick={() => setStep && setStep(s.id)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2 ${step > s.id
                                    ? 'bg-[#3D7A6D] text-white border-[#3D7A6D]'
                                    : step === s.id
                                        ? 'bg-[#3D7A6D] text-white border-[#3D7A6D]'
                                        : 'bg-white text-gray-400 border-gray-100 shadow-sm'
                                    } cursor-pointer`}
                            >
                                {step > s.id ? <Check size={18} strokeWidth={3} /> : s.id}
                            </div>

                            <span className={`absolute -bottom-7 text-[10px] font-bold tracking-widest whitespace-nowrap ${step >= s.id ? 'text-[#3A7D6C]' : 'text-gray-400'}`}>
                                {s.label}
                            </span>
                        </div>

                        {index !== steps.length - 1 && (
                            <div className={`flex-1 h-[2px] mx-2 transition-colors duration-300 ${step > s.id ? 'bg-[#3D7A6D]/30' : 'bg-gray-100'}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

        </div>
    );
};

export default StepperHeader;


