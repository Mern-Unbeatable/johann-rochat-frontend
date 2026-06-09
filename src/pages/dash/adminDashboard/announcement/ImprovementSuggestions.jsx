import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, Clock } from 'lucide-react';

const ImprovementSuggestions = ({ suggestions, onAddSuggestion }) => {
    const [newSuggestion, setNewSuggestion] = useState('');

    const handleAddSuggestion = async () => {
        if (!newSuggestion.trim()) {
            toast.error('Veuillez entrer une suggestion');
            return;
        }

        try {
            await onAddSuggestion(newSuggestion);
            setNewSuggestion('');
        } catch (error) {
            console.error('Error adding suggestion:', error);
        }
    };

    const appliedCount = suggestions?.filter(s => s.isApplied).length || 0;
    const totalCount = suggestions?.length || 0;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#1A2B3B]">Suggestions</h3>
                {totalCount > 0 && (
                    <span className="text-xs text-gray-500">
                        {appliedCount}/{totalCount} appliquée{appliedCount !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            <ul className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                {suggestions && suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => (
                        <li key={suggestion.id || index} className="flex items-start gap-2 text-base text-gray-500 leading-tight">
                            <span className="mt-1">
                                {suggestion.isApplied ? (
                                    <CheckCircle size={16} className="text-green-500" />
                                ) : (
                                    <span className="text-gray-400">•</span>
                                )}
                            </span>
                            <div className="flex-1">
                                <span className={suggestion.isApplied ? 'line-through text-gray-400' : ''}>
                                    {suggestion.suggestedValue}
                                </span>
                                {suggestion.note && (
                                    <p className="text-xs text-gray-400 mt-1">{suggestion.note}</p>
                                )}
                                {suggestion.isApplied && suggestion.appliedAt && (
                                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                        <CheckCircle size={10} />
                                        Appliqué le {new Date(suggestion.appliedAt).toLocaleDateString('fr-CH')}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-400 text-center py-4">
                        Aucune suggestion pour le moment
                    </li>
                )}
            </ul>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={newSuggestion}
                    onChange={(e) => setNewSuggestion(e.target.value)}
                    placeholder="Ajouter une suggestion"
                    className="flex-1 bg-[#F8F9FA] border border-gray-100 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#3A7D6C]"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSuggestion()}
                />
                <button
                    onClick={handleAddSuggestion}
                    className="bg-[#E8F3F1] text-[#3A7D6C] p-2 rounded-lg hover:bg-[#d9ece8] transition-colors"
                >
                    <span className="text-xl leading-none">+</span>
                </button>
            </div>
        </div>
    );
};

export default ImprovementSuggestions;