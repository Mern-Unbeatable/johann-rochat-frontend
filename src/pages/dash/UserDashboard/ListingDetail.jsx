
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGetListingByIdQuery } from '../../../features/api/listingApi';
import LoadingFallback from '../../../router/components/LoadingFallback';
import UserQualityLevelCard from './UserQualityLevelCard';
import UserImprovementSuggestions from './UserImprovementSuggestions';

const ListingDetail = () => {
    const { id: listingId } = useParams();
    const navigate = useNavigate();

    const { data: listing, isLoading, refetch } = useGetListingByIdQuery(listingId, {
        skip: !listingId,
    });

    // listing  latest improvement request
    const currentImprovement = listing?.improvementRequests?.[0];
    // listing  latest generation
    const latestGeneration = listing?.generations?.[0];
    // suggestions directly improvement request 
    const suggestions = currentImprovement?.suggestions || [];

    if (isLoading) return <LoadingFallback />;
    if (!listing) return (
        <div className="text-center py-12 text-gray-500">Aucune donnée trouvée</div>
    );

    return (
        <div className="min-h-screen bg-[#FAF9F7] p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">


                <button
                    onClick={() => navigate('/dash')}
                    className="mb-5 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={18} />
                    Retour aux annonces
                </button>


                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h1 className="text-xl font-bold text-[#1A2B3B]">
                                {listing.listingName || listing.title || 'Annonce immobilière'}
                            </h1>
                            <p className="text-gray-400 text-sm mt-0.5 uppercase tracking-wider">
                                {listing.propertyType} — {listing.location}
                            </p>
                        </div>

                        <span className={`self-start sm:self-auto text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${listing.status === 'IMPROVEMENT_DONE' ? 'bg-green-100 text-green-700' :
                            listing.status === 'SUGGESTION_SENT' ||
                                listing.status === 'IMPROVEMENT_IN_REVIEW' ? 'bg-purple-100 text-purple-700' :
                                listing.status === 'IMPROVEMENT_REQUESTED' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-600'
                            }`}>
                            {listing.status?.replace(/_/g, ' ')}
                        </span>
                    </div>


                    {currentImprovement?.userNote && (
                        <p className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                            <span className="font-semibold">Votre note:</span> {currentImprovement.userNote}
                        </p>
                    )}
                    {currentImprovement?.adminNote && (
                        <p className="mt-2 text-sm text-blue-700 bg-blue-50 rounded-lg px-3 py-2">
                            <span className="font-semibold">Note admin:</span> {currentImprovement.adminNote}
                        </p>
                    )}
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">


                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-50 h-full flex flex-col">
                            <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    APERÇU DE L'ANNONCE GÉNÉRÉE
                                </span>
                                <span className="bg-[#E9F2F0] text-[#4A8B7D] text-xs font-bold px-3 py-1.5 rounded-lg uppercase">
                                    FR / SUISSE ROMANDE
                                </span>
                            </div>

                            <div className="p-8 flex-1">
                                {latestGeneration?.generatedText ? (
                                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words font-medium">
                                        {latestGeneration.generatedText}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                                        <p className="text-gray-400 text-sm">Aucune annonce générée</p>
                                        <p className="text-gray-300 text-xs mt-1">
                                            L'annonce apparaîtra ici après la génération
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="lg:col-span-4 space-y-6">
                        <UserQualityLevelCard
                            suggestions={suggestions}
                            score={latestGeneration?.score ?? 0}
                        />
                        <UserImprovementSuggestions
                            suggestions={suggestions}
                            improvementStatus={currentImprovement?.status}
                            improvementRequestId={currentImprovement?.id}
                            onRefresh={refetch}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetail;