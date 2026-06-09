import React from 'react';
import { CheckCircle, Clock, Star } from 'lucide-react';

const UserQualityLevelCard = ({ suggestions = [], score = 0 }) => {
    // from applied suggestions  progress calculate
    const totalSuggestions = suggestions.length;
    const appliedCount = suggestions.filter(s => s.isApplied).length;
    const progress = totalSuggestions > 0
        ? Math.round((appliedCount / totalSuggestions) * 100)
        : score ?? 0;

    const getQualityConfig = (value) => {
        if (value <= 30) return {
            label: 'BASIQUE',
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            badge: 'bg-orange-100 text-orange-700',
            bar: '#f97316',
        };
        if (value <= 70) return {
            label: 'INTERMÉDIAIRE',
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
            badge: 'bg-yellow-100 text-yellow-700',
            bar: '#eab308',
        };
        return {
            label: 'AVANCÉ',
            color: 'text-[#3A7D6C]',
            bg: 'bg-[#E8F3F1]',
            badge: 'bg-[#E8F3F1] text-[#3A7D6C]',
            bar: '#3A7D6C',
        };
    };

    const config = getQualityConfig(progress);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-[#1A2B3B]">Niveau de qualité</h3>
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
            </div>

            {/* Score Badge */}
            <div className="flex items-center justify-between mb-4">
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${config.badge}`}>
                    {config.label}
                </span>
                <span className={`text-2xl font-black ${config.color}`}>
                    {progress}%
                </span>
            </div>

            {/* Progress Bar — read only */}
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: config.bar,
                    }}
                />
            </div>

            {/* Suggestion Progress */}
            {totalSuggestions > 0 && (
                <div className={`rounded-xl p-3 ${config.bg} mt-2`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {appliedCount === totalSuggestions ? (
                                <CheckCircle size={15} className="text-[#3A7D6C]" />
                            ) : (
                                <Clock size={15} className="text-yellow-500" />
                            )}
                            <span className="text-xs font-semibold text-gray-600">
                                Suggestions appliquées
                            </span>
                        </div>
                        <span className={`text-xs font-black ${config.color}`}>
                            {appliedCount} / {totalSuggestions}
                        </span>
                    </div>

                    {/* Mini suggestion dots */}
                    <div className="flex gap-1.5 mt-2.5 flex-wrap">
                        {suggestions.map((s, i) => (
                            <div
                                key={s.id || i}
                                title={s.fieldName}
                                className={`h-2 w-2 rounded-full transition-all ${s.isApplied ? 'bg-[#3A7D6C]' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* No suggestions yet */}
            {totalSuggestions === 0 && (
                <p className="text-xs text-gray-400 text-center mt-2">
                    Les suggestions apparaîtront après la review
                </p>
            )}
        </div>
    );
};

export default UserQualityLevelCard;