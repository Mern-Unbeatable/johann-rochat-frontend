import React from 'react';
import { CheckCircle2, Star } from 'lucide-react';

const PriceCard = ({
    name,
    title,
    description,
    credits,
    price,
    subText,
    featureText,
    features,
    featured,
    packageId,
    onBuyClick,
    isLoading
}) => (
    <div className={`relative flex h-full flex-col rounded-xl border p-4 transition-all sm:p-5 ${featured
        ? 'bg-[#3D7D6C] border-transparent text-white shadow-xl z-10'
        : 'bg-white border-gray-200 text-[#2D3648]'
        }`}>
        {featured && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#2D3648] px-3 py-1 rounded-full flex items-center justify-center gap-1 shadow-md whitespace-nowrap text-xs sm:text-sm">
                <Star size={14} />
                <span className="text-sm font-bold uppercase tracking-wider">Le plus avantageux</span>
            </div>
        )}

        <div className="mb-3 sm:mb-4">
            <h4 className={`mb-2 text-xl font-semibold uppercase tracking-wide sm:text-2xl ${featured ? 'text-white' : 'text-[#2D3648]'
                }`}>
                {name}
            </h4>
            <p className={`h-12 text-[11px] md:text-[13px] leading-relaxed  ${featured ? 'text-gray-100' : 'text-gray-500'
                }`}>
                {title}
            </p>
        </div>

        <div className="mb-5 sm:mb-6">
            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-semibold sm:text-4xl">{credits}</span>
                <span className="text-xl font-semibold sm:text-2xl">crédits</span>
            </div>
            <div className="mb-1 text-2xl font-semibold sm:text-3xl">{price} CHF</div>
            <div className={`text-xs  sm:text-sm ${featured ? 'text-gray-200' : 'text-gray-400'
                }`}>
                {subText}
            </div>
        </div>

        <div className="mb-5 sm:mb-6">
            <p className={`text-sm font-medium sm:text-base ${featured ? 'text-white' : 'text-[#2D3648]'
                }`}>
                {description}
            </p>
        </div>

        <button
            onClick={() => onBuyClick(packageId)}
            disabled={isLoading}
            className={`mt-auto mb-6 w-full rounded-md border py-3 text-sm font-bold transition-all sm:mb-8 ${featured
                ? 'bg-white text-[#3D7D6C] hover:bg-gray-100 border-transparent'
                : 'bg-transparent text-[#3D7D6C] border-[#3D7D6C] hover:bg-[#3D7D6C] hover:text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {isLoading ? 'Chargement...' : 'Commencez maintenant'}
        </button>

        <ul className="space-y-2.5 sm:space-y-3">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                        size={18}
                        className={`shrink-0 mt-0.5 ${featured ? 'text-white/80' : 'text-[#3D7D6C]'
                            }`}
                    />
                    <span className={`text-sm ${featured ? 'text-gray-100' : 'text-gray-600'
                        }`}>
                        {feature}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);

export default PriceCard;