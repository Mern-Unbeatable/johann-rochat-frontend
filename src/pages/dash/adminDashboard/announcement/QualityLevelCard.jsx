import React from 'react';

const QualityLevelCard = ({ progress, onProgressChange }) => {
    const getQualityLabel = (value) => {
        if (value <= 30) return 'BASIQUE';
        if (value <= 70) return 'INTERMÉDIAIRE';
        return 'AVANCÉ';
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <h3 className="text-lg font-bold text-[#1A2B3B] mb-6">Niveau de qualité</h3>

            <div className="relative pt-2">
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#E8F3F1] text-[#3A7D6C] text-sm font-bold px-3 py-1 rounded-full">
                        {getQualityLabel(progress)}
                    </span>
                    <span className="text-sm font-bold text-[#3A7D6C] transition-all duration-300">
                        {progress}%
                    </span>
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={onProgressChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3A7D6C] hover:accent-[#2d6659]"
                    style={{
                        background: `linear-gradient(to right, #3A7D6C 0%, #3A7D6C ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`
                    }}
                />
            </div>
        </div>
    );
};

export default QualityLevelCard;