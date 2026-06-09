import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Edit2, Send, ArrowLeft, Save, X } from 'lucide-react';
import {
  useGetImprovementRequestByIdQuery,
  useUpdateImprovementStatusMutation,
  useAddSuggestionsMutation
} from '../../../../features/api/improvementApi';
import { useUpdateGenerationTextMutation } from '../../../../features/api/generationApi';
import LoadingFallback from '../../../../router/components/LoadingFallback';
import toast from 'react-hot-toast';
import QualityLevelCard from './QualityLevelCard';
import ImprovementSuggestions from './ImprovementSuggestions';

const AnnouncementDetailPage = () => {
  const { id: improvementId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isEditingText, setIsEditingText] = useState(false);
  const [editableText, setEditableText] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const currentImprovementId = improvementId || location.state?.improvementId;

  const {
    data: improvementResponse,
    isLoading: improvementLoading,
    refetch
  } = useGetImprovementRequestByIdQuery(currentImprovementId, {
    skip: !currentImprovementId
  });



  const [updateImprovementStatus] = useUpdateImprovementStatusMutation();
  const [addSuggestion] = useAddSuggestionsMutation();
  const [updateGenerationText, { isLoading: isUpdating }] = useUpdateGenerationTextMutation();

  // Extract data correctly - handle different response structures
  const currentImprovement = improvementResponse?.request || improvementResponse?.data?.request || improvementResponse;

  // Get generations from listing
  const generations = currentImprovement?.listing?.generations || [];
  const latestGeneration = generations.length > 0 ? generations[0] : null;


  useEffect(() => {
    if (latestGeneration && !selectedGeneration) {
      setSelectedGeneration(latestGeneration);
      setEditableText(latestGeneration.generatedText || '');
    }
  }, [latestGeneration]);

  // Calculate progress based on applied suggestions
  useEffect(() => {
    if (currentImprovement?.suggestions && currentImprovement.suggestions.length > 0) {
      const appliedCount = currentImprovement.suggestions.filter(s => s.isApplied).length;
      const calculatedProgress = (appliedCount / currentImprovement.suggestions.length) * 100;
      setProgress(Math.round(calculatedProgress));
    } else {
      setProgress(0);
    }
  }, [currentImprovement]);

  const handleProgressChange = (e) => {
    setProgress(parseInt(e.target.value, 10));
  };

  const handlePublishNow = async () => {
    if (!currentImprovement?.id) return;

    try {
      await updateImprovementStatus({
        id: currentImprovement.id,
        data: { status: 'COMPLETED' }
      }).unwrap();
      toast.success('Annonce publiée avec succès');
      navigate('/admin');
    } catch (error) {
      toast.error(error?.data?.message || 'Erreur lors de la publication');
      console.error('Error publishing:', error);
    }
  };

  const handleAddSuggestion = async (suggestionText) => {
    if (!suggestionText.trim() || !currentImprovement?.id) return;

    try {
      const suggestionData = {
        suggestions: [{
          fieldName: 'general',
          suggestedValue: suggestionText,
          note: 'Admin suggestion'
        }],
        adminNote: `Added suggestion: ${suggestionText}`,
        status: 'SUGGESTION_SENT'
      };

      await addSuggestion({
        id: currentImprovement.id,
        data: suggestionData
      }).unwrap();

      toast.success('Suggestion ajoutée avec succès');
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Erreur lors de l\'ajout de la suggestion');
      console.error('Error adding suggestion:', error);
      throw error;
    }
  };

  const handleSaveEditedText = async () => {
    if (!selectedGeneration?.id) return;

    try {
      await updateGenerationText({
        id: selectedGeneration.id,
        text: editableText
      }).unwrap();

      setSelectedGeneration(prev => ({
        ...prev,
        generatedText: editableText
      }));

      toast.success('Annonce mise à jour avec succès');
      setIsEditingText(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || 'Erreur lors de la mise à jour');
      console.error('Error updating generation:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditableText(selectedGeneration?.generatedText || '');
    setIsEditingText(false);
  };

  const formatListingData = () => {
    const listing = currentImprovement?.listing;
    if (!listing) return null;

    return {
      title: listing.listingName || listing.title || 'Propriété',
      propertyType: listing.propertyType || 'PROPRIÉTÉ',
      location: listing.location || 'Emplacement',
      rent: listing.rent,
      rooms: listing.rooms,
      surface: listing.surface,
      status: listing.status,
      availableFrom: listing.availableFrom,
      charges: listing.charges,
      condition: listing.condition,
      equipment: listing.equipment,
      exposure: listing.exposure,
      floor: listing.floor,
      hasElevator: listing.hasElevator,
      parkingPrice: listing.parkingPrice,
      petsAllowed: listing.petsAllowed,
      additionalInfo: listing.additionalInfo,
      proximity: listing.proximity
    };
  };

  const formattedListing = formatListingData();

  if (improvementLoading) {
    return <LoadingFallback />;
  }

  // Show loading if we're still waiting for data
  if (!currentImprovement) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] p-4 md:p-8 font-sans">
        <div className="max-w-6xl mx-auto text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3A7D6C] mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement des données...</p>
        </div>
      </div>
    );
  }

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'PENDING': return 'EN ATTENTE';
      case 'IN_REVIEW': return 'EN REVUE';
      case 'SUGGESTION_SENT': return 'SUGGESTION ENVOYÉE';
      case 'COMPLETED': return 'COMPLÉTÉ';
      case 'REJECTED': return 'REJETÉ';
      default: return status || 'EN COURS';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'text-orange-600';
      case 'IN_REVIEW': return 'text-blue-600';
      case 'SUGGESTION_SENT': return 'text-purple-600';
      case 'COMPLETED': return 'text-green-600';
      case 'REJECTED': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/admin')}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Retour au pipeline</span>
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm border border-gray-50">
          <div>
            <h1 className="text-2xl font-bold text-[#1A2B3B] mb-1">
              {formattedListing?.title || 'Annonce immobilière'}
            </h1>

          </div>
          <button
            onClick={() => navigate("/admin")}
            className="mt-4 md:mt-0 px-6 py-2 border border-gray-200 rounded-lg text-gray-600 font-semibold hover:bg-gray-50 transition-all"
          >
            Voir le profil
          </button>
        </div>



        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Preview Section with Edit Capability */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden h-full">
              <div className="p-4 border-b border-gray-50 flex justify-between items-center flex-wrap gap-2">
                <span className="text-base font-bold text-gray-400 uppercase tracking-widest">
                  APERÇU DE L'ANNONCE GÉNÉRÉE
                </span>
                <div className="flex gap-2">
                  {selectedGeneration && !isEditingText && (
                    <button
                      onClick={() => setIsEditingText(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[#E9F2F0] text-[#4A8B7D] text-sm font-bold rounded-lg hover:bg-[#d4e4e0] transition-all"
                    >
                      <Edit2 size={14} />
                      Modifier le texte
                    </button>
                  )}
                  {isEditingText && (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 text-sm font-bold rounded-lg hover:bg-gray-200 transition-all"
                        disabled={isUpdating}
                      >
                        <X size={14} />
                        Annuler
                      </button>
                      <button
                        onClick={handleSaveEditedText}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#4A8B7D] text-white text-sm font-bold rounded-lg hover:bg-[#3d7368] transition-all"
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        ) : (
                          <Save size={14} />
                        )}
                        Enregistrer
                      </button>
                    </>
                  )}
                  {selectedGeneration && (
                    <span className="bg-[#E9F2F0] text-[#4A8B7D] text-sm font-bold px-3 py-1.5 rounded-lg uppercase">
                      Version {selectedGeneration.version}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-8">
                {isEditingText ? (
                  <textarea
                    value={editableText}
                    onChange={(e) => setEditableText(e.target.value)}
                    className="w-full h-[500px] p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-[#4A8B7D] focus:border-transparent"
                    placeholder="Modifiez l'annonce ici..."
                    disabled={isUpdating}
                  />
                ) : (
                  <div className="text-gray-700 text-sm leading-relaxed space-y-4 font-medium whitespace-pre-wrap break-words">
                    {selectedGeneration?.generatedText ? (
                      <div dangerouslySetInnerHTML={{ __html: selectedGeneration.generatedText.replace(/\n/g, '<br/>') }} />
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <p>Aucune annonce générée</p>
                        <p className="text-xs mt-2">Veuillez générer une annonce pour ce listing</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Quality & Suggestions */}
          <div className="lg:col-span-4 space-y-6">
            <QualityLevelCard
              progress={progress}
              onProgressChange={handleProgressChange}
            />

            <ImprovementSuggestions
              suggestions={currentImprovement?.suggestions || []}
              onAddSuggestion={handleAddSuggestion}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setIsEditingText(true)}
            disabled={!selectedGeneration}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Edit2 size={16} className="text-gray-400" />
            Modifier la liste
          </button>

          <button
            onClick={handlePublishNow}
            disabled={currentImprovement?.status === 'COMPLETED' || !currentImprovement}
            className="flex items-center gap-2 px-8 py-2.5 bg-[#3A7D6C] text-white rounded-lg font-semibold hover:bg-[#2d6659] shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            {currentImprovement?.status === 'COMPLETED' ? 'Déjà publié' : 'Publier maintenant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;