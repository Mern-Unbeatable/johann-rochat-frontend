import React from 'react';
import { CheckCircle2, Edit } from 'lucide-react';

const AdminPriceCard = ({ title, description, credits, price, subText, featureText, features, featured, onEditClick }) => (
    <div className={`relative flex flex-col p-4 md:p-6 rounded-xl border transition-all h-full ${featured
            ? 'bg-[#3D7D6C] border-transparent text-white shadow-xl z-10'
            : 'bg-white border-gray-200 text-[#2D3648]'
        }`}>
        <div className="mb-6">
            <h4 className={`text-2xl font-[600] uppercase tracking-wide mb-2 ${featured ? 'text-white' : 'text-[#2D3648]'}`}>
                {title}
            </h4>
            <p className={`text-base leading-relaxed ${featured ? 'text-gray-100' : 'text-gray-500'}`}>
                {description}
            </p>
        </div>

        <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-[600]">{credits}</span>
                <span className="text-2xl font-[600]">crédits</span>
            </div>
            <div className="text-3xl font-[600] mb-1">{price} CHF</div>
            <div className={`text-sm uppercase ${featured ? 'text-gray-200' : 'text-gray-400'}`}>
                {subText}
            </div>
        </div>

        <div className="mb-6">
            <p className={`text-base font-[500] ${featured ? 'text-white' : 'text-[#2D3648]'}`}>
                {featureText}
            </p>
        </div>

        <ul className="space-y-3 mb-6 flex-1">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${featured ? 'text-white/80' : 'text-[#3D7D6C]'}`} />
                    <span className={`text-base ${featured ? 'text-gray-100' : 'text-gray-600'}`}>{feature}</span>
                </li>
            ))}
        </ul>

        <button
            onClick={onEditClick}
            className={`w-full py-2.5 rounded-md font-bold text-sm transition-all border inline-flex items-center justify-center gap-2 ${featured
                    ? 'bg-white text-[#3D7D6C] border-white hover:bg-gray-100'
                    : 'bg-white text-[#3D7D6C] border-[#3D7D6C] hover:bg-[#3D7D6C] hover:text-white hover:border-[#3D7D6C]'
                }`}>
            <Edit size={16} />
            <span>Modifier le forfait</span>
        </button>
    </div>
);

export default AdminPriceCard;