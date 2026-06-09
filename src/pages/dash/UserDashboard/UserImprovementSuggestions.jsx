import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Sparkles, ArrowRight, Info, Wand2 } from 'lucide-react';
import { useApplyUserSuggestionMutation } from '../../../features/api/improvementApi';
import toast from 'react-hot-toast';

const UserImprovementSuggestions = ({
    suggestions = [],
    improvementStatus,
    improvementRequestId,
    onRefresh,
}) => {
    const [applyingSuggestionId, setApplyingSuggestionId] = useState(null);
    const [applySuggestion, { isLoading: isApplying }] = useApplyUserSuggestionMutation();

    // SUGGESTION_SENT status  Apply 
    const canApply = improvementStatus === 'SUGGESTION_SENT';
    const appliedCount = suggestions.filter(s => s.isApplied).length;
    const totalCount = suggestions.length;
    const allApplied = totalCount > 0 && appliedCount === totalCount;

    const handleApplySuggestion = async (suggestionId, suggestedValue, fieldName) => {
        if (!improvementRequestId) {
            toast.error("Identifiant de demande manquant");
            return;
        }
        if (!suggestedValue) {
            toast.error("Aucune valeur suggérée");
            return;
        }

        setApplyingSuggestionId(suggestionId);
        try {
            await applySuggestion({
                id: improvementRequestId,
                data: {
                    suggestionId,
                    newValue: suggestedValue,
                },
            }).unwrap();

            toast.success(`✓ Champ "${fieldName}" mis à jour`);
            onRefresh?.();
        } catch (error) {
            const msg = error?.data?.message || "Erreur lors de l'application";
            toast.error(msg);
            console.error('Apply suggestion error:', error);
        } finally {
            setApplyingSuggestionId(null);
        }
    };


    const getStatusBanner = () => {
        switch (improvementStatus) {
            case 'SUGGESTION_SENT':
                return {
                    bg: 'bg-purple-50 border-purple-200',
                    icon: <Wand2 size={16} className="text-purple-500 flex-shrink-0 mt-0.5" />,
                    text: allApplied
                        ? 'Toutes les suggestions ont été appliquées !'
                        : `${totalCount - appliedCount} suggestion(s) en attente — cliquez sur "Appliquer" pour mettre à jour votre annonce.`,
                    textColor: 'text-purple-800',
                };
            case 'PENDING':
                return {
                    bg: 'bg-yellow-50 border-yellow-200',
                    icon: <Clock size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />,
                    text: "Votre demande est en attente de review. L'administrateur vous enverra des suggestions bientôt.",
                    textColor: 'text-yellow-800',
                };
            case 'IN_REVIEW':
                return {
                    bg: 'bg-blue-50 border-blue-200',
                    icon: <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />,
                    text: "L'administrateur examine votre annonce et prépare des suggestions.",
                    textColor: 'text-blue-800',
                };
            case 'COMPLETED':
                return {
                    bg: 'bg-green-50 border-green-200',
                    icon: <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />,
                    text: 'Toutes les améliorations ont été complétées avec succès.',
                    textColor: 'text-green-800',
                };
            case 'REJECTED':
                return {
                    bg: 'bg-red-50 border-red-200',
                    icon: <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />,
                    text: "Votre demande d'amélioration a été rejetée.",
                    textColor: 'text-red-800',
                };
            default:
                return null;
        }
    };

    const getStatusLabel = () => {
        const labels = {
            SUGGESTION_SENT: { text: 'Suggestions disponibles', color: 'text-purple-600 bg-purple-50' },
            PENDING: { text: 'En attente', color: 'text-yellow-600 bg-yellow-50' },
            IN_REVIEW: { text: 'En cours de review', color: 'text-blue-600 bg-blue-50' },
            COMPLETED: { text: 'Complété', color: 'text-green-600 bg-green-50' },
            REJECTED: { text: 'Rejeté', color: 'text-red-600 bg-red-50' },
        };
        return labels[improvementStatus] || null;
    };

    const banner = getStatusBanner();
    const statusLabel = getStatusLabel();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            <div className="px-5 py-4 border-b border-gray-50 bg-gradient-to-r from-[#F8F3E8] to-white">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        SUGGESTIONS D'AMÉLIORATION
                    </span>
                    {statusLabel && (
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusLabel.color}`}>
                            {statusLabel.text}
                        </span>
                    )}
                </div>

                {totalCount > 0 && (
                    <div className="mt-3">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-xs text-gray-400">
                                {appliedCount}/{totalCount} appliquée{appliedCount !== 1 ? 's' : ''}
                            </span>
                            <span className="text-xs font-bold text-[#4A8B7D]">
                                {Math.round((appliedCount / totalCount) * 100)}%
                            </span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#4A8B7D] rounded-full transition-all duration-500"
                                style={{ width: `${(appliedCount / totalCount) * 100}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-5">
                {banner && (
                    <div className={`mb-4 p-3 border rounded-xl flex items-start gap-2.5 ${banner.bg}`}>
                        {banner.icon}
                        <p className={`text-xs leading-relaxed font-medium ${banner.textColor}`}>
                            {banner.text}
                        </p>
                    </div>
                )}
                {totalCount > 0 ? (
                    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-0.5">
                        {suggestions.map((suggestion, idx) => {
                            const isThisApplying = applyingSuggestionId === suggestion.id;
                            const showApplyBtn = canApply && !suggestion.isApplied;

                            return (
                                <div
                                    key={suggestion.id || idx}
                                    className={`rounded-xl border p-4 transition-all duration-200 ${suggestion.isApplied
                                        ? 'bg-green-50 border-green-200'
                                        : showApplyBtn
                                            ? 'bg-amber-50 border-amber-200 hover:border-amber-300 hover:shadow-sm'
                                            : 'bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">

                                        <div className="flex-1 min-w-0">
                                            {/* Field badge + Applied tag */}
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 py-0.5 bg-white border border-gray-200 rounded-md">
                                                    {suggestion.fieldName || 'Général'}
                                                </span>
                                                {suggestion.isApplied && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                                        <CheckCircle size={9} />
                                                        Appliqué
                                                    </span>
                                                )}
                                            </div>

                                            {/* Suggested value — main content */}
                                            <p className="text-sm font-semibold text-gray-800 break-words leading-snug">
                                                {suggestion.suggestedValue || suggestion.note || '—'}
                                            </p>

                                            {/* Current value */}
                                            {suggestion.currentValue && !suggestion.isApplied && (
                                                <p className="text-xs text-gray-400 mt-1.5">
                                                    Valeur actuelle:{' '}
                                                    <span className="line-through">{suggestion.currentValue}</span>
                                                </p>
                                            )}

                                            {/* Applied at date */}
                                            {suggestion.isApplied && suggestion.appliedAt && (
                                                <p className="text-[11px] text-green-600 mt-1.5 flex items-center gap-1">
                                                    <CheckCircle size={11} />
                                                    Appliqué le{' '}
                                                    {new Date(suggestion.appliedAt).toLocaleDateString('fr-CH')}
                                                </p>
                                            )}

                                            {/* Note (if different from suggestedValue) */}
                                            {suggestion.note && suggestion.note !== suggestion.suggestedValue && (
                                                <p className="text-xs text-gray-500 mt-1.5 italic">
                                                    Note: {suggestion.note}
                                                </p>
                                            )}
                                        </div>

                                        {/* Right: Apply button OR applied checkmark */}
                                        <div className="flex-shrink-0">
                                            {suggestion.isApplied ? (
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <CheckCircle size={16} className="text-green-600" />
                                                </div>
                                            ) : showApplyBtn ? (
                                                <button
                                                    onClick={() =>
                                                        handleApplySuggestion(
                                                            suggestion.id,
                                                            suggestion.suggestedValue,
                                                            suggestion.fieldName
                                                        )
                                                    }
                                                    disabled={isThisApplying || isApplying}
                                                    className="flex items-center gap-1.5 px-3 py-2 bg-[#4A8B7D] text-white text-xs font-bold rounded-lg hover:bg-[#3d7368] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                                >
                                                    {isThisApplying ? (
                                                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            Appliquer
                                                            <ArrowRight size={11} />
                                                        </>
                                                    )}
                                                </button>
                                            ) : (
                                                // Status PENDING/IN_REVIEW — locked indicator
                                                !suggestion.isApplied && (
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center" title="En attente">
                                                        <Clock size={14} className="text-gray-400" />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* ── Empty state ── */
                    <div className="py-10 flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                            <Sparkles size={24} className="text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">
                            Aucune suggestion pour le moment
                        </p>
                        <p className="text-xs text-gray-300 mt-1 max-w-[180px]">
                            Les suggestions de l'administrateur apparaîtront ici
                        </p>
                    </div>
                )}

                {/* ── All applied celebration ── */}
                {allApplied && canApply && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <p className="text-xs font-semibold text-green-700">
                            Bravo ! Toutes les suggestions ont été appliquées.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserImprovementSuggestions;