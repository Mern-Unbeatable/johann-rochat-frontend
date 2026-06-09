/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ExpertValidationCard from './ExpertValidationCard';
import IAModificationOptions from './AIModificationOptions';
import UnlockPaymentModal from './UnlockPaymentModal';
import ExportActions from './ExportActions';
import { useGetMyListingsQuery } from '../../../features/api/listingApi';
import { useVerifyAndUnlockMutation } from '../../../features/api/paymentApi';
import {
    useGenerateAdMutation,
    useGetListingGenerationsQuery,
} from '../../../features/api/generationApi';
import { UNLOCKED_STATUSES } from '../../../constant';
import { useGetMeQuery } from '../../../features/api/userApi';
import CreditCard from './CreditCard';


const AnnonceReadyView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
    const [activeGeneration, setActiveGeneration] = useState(null);
    const { data: currentUser, isLoading: userLoading } = useGetMeQuery({});
    const hasCredits = currentUser?.credits ?? 0;

    const { data: myListings, refetch: refetchListings, isLoading: listingsLoading } =
        useGetMyListingsQuery();

    const currentListing = myListings?.listings?.[0];
    const listingId = currentListing?.id;
    const listingStatus = currentListing?.status;

    const isListingUnlocked = UNLOCKED_STATUSES.includes(listingStatus);
    const isListingDraft = listingStatus === 'DRAFT' || listingStatus === 'PREVIEW';

    const {
        data: generationsData,
        refetch: refetchGenerations,
        isLoading: generationsLoading,
    } = useGetListingGenerationsQuery(listingId, {
        skip: !listingId || !isListingUnlocked,
    });

    const [generateAd, { isLoading: isGenerating }] = useGenerateAdMutation();
    const [verifyAndUnlock] = useVerifyAndUnlockMutation();
    useEffect(() => {
        const gens = generationsData?.generations ?? generationsData;
        if (Array.isArray(gens) && gens.length > 0) {
            // Get the most recent generation (last in array)
            const latestGen = gens[gens.length - 1];
            setActiveGeneration(latestGen);
        }
    }, [generationsData]);

    const triggerGenerationIfNeeded = useCallback(async (id) => {
        try {
            const refetchResult = await refetchGenerations();
            const gens = refetchResult?.data?.generations ?? refetchResult?.data ?? [];
            if (!Array.isArray(gens) || gens.length === 0) {
                const result = await generateAd({ listingId: id }).unwrap();
                const gen = result?.generation ?? result;
                setActiveGeneration(gen);
                toast.success('Annonce générée avec succès !');
            }
        } catch {
            toast.error("Erreur lors de la génération de l'annonce.");
        }
    }, [generateAd, refetchGenerations]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');
        const success = params.get('success');
        const type = params.get('type');
        const canceled = params.get('canceled');

        if (sessionId && success === 'true' && type === 'LISTING_UNLOCK') {
            window.history.replaceState({}, document.title, window.location.pathname);
            handlePaymentReturn(sessionId);
        } else if (canceled === 'true') {
            toast.error('Paiement annulé. Veuillez réessayer.');
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [location]);

    const handlePaymentReturn = async (sessionId) => {
        try {
            const result = await verifyAndUnlock(sessionId).unwrap();
            if (result?.paid) {
                toast.success('Paiement réussi ! Votre annonce est débloquée.');
                setIsUnlockModalOpen(false);
                await refetchListings();
                if (listingId) await triggerGenerationIfNeeded(listingId);
            } else {
                toast.error("Le paiement n'a pas pu être confirmé.");
            }
        } catch {
            await refetchListings();
            toast.error('Erreur lors de la vérification du paiement.');
        }
    };

    // Only open unlock modal for DRAFT or PREVIEW
    useEffect(() => {
        if (!listingsLoading && isListingDraft && !isUnlockModalOpen && !isListingUnlocked) {
            setIsUnlockModalOpen(true);
        }
    }, [listingStatus, listingsLoading, isUnlockModalOpen, isListingUnlocked, isListingDraft]);

    useEffect(() => {
        if (
            isListingUnlocked &&
            listingId &&
            !generationsLoading &&
            !isGenerating &&
            !activeGeneration
        ) {
            const gens = generationsData?.generations ?? generationsData;
            if (!Array.isArray(gens) || gens.length === 0) {
                triggerGenerationIfNeeded(listingId);
            }
        }
    }, [isListingUnlocked, listingId, generationsLoading, activeGeneration, generationsData]);

    const handleAiResult = (result) => {
        if (result?.result) {
            const updatedGeneration = {
                ...activeGeneration,
                ...result.result,
                generatedText: result.fullText || activeGeneration?.generatedText
            };
            setActiveGeneration(updatedGeneration);
        }
    };

    const getStatusBadge = () => {
        const badges = {
            DRAFT: { label: 'Brouillon', color: 'bg-gray-100 text-gray-500' },
            PREVIEW: { label: 'Aperçu', color: 'bg-blue-50 text-blue-500' },
            PAID: { label: 'Payé', color: 'bg-yellow-50 text-yellow-600' },
            UNLOCKED: { label: 'Débloqué', color: 'bg-[#E9F2F0] text-[#4A8B7D]' },
            IMPROVEMENT_REQUESTED: { label: 'Amélioration demandée', color: 'bg-orange-50 text-orange-500' },
            IMPROVEMENT_IN_REVIEW: { label: 'En cours de révision', color: 'bg-purple-50 text-purple-500' },
            IMPROVEMENT_DONE: { label: 'Amélioration terminée', color: 'bg-[#E9F2F0] text-[#4A8B7D]' },
        };
        return badges[listingStatus] ?? { label: listingStatus, color: 'bg-gray-100 text-gray-500' };
    };

    const isInitialLoading = listingsLoading || (isListingUnlocked && generationsLoading);

    if (isInitialLoading || userLoading) {
        return (
            <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                    <Loader2 size={32} className="animate-spin text-[#4A8B7D]" />
                    <p className="font-medium">Chargement de votre annonce…</p>
                </div>
            </div>
        );
    }

    const statusBadge = getStatusBadge();

    return (
        <div className="min-h-screen bg-[#FAF9F7] py-10 px-4 font-sans text-[#334155]">
            <div className="container max-w-7xl mx-auto px-0 md:px-6 space-y-6">

                <button
                    onClick={() => navigate('/creer-annonce')}
                    className="flex items-center gap-2 p-2.5 hover:bg-gray-100 rounded-lg transition-all text-gray-600 hover:text-[#334155] mb-4"
                >
                    <ArrowLeft size={24} />
                    <span className="text-sm font-medium">Retour</span>
                </button>

                <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-4 border border-gray-100">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                            <h1 className="text-3xl font-extrabold text-[#334155] tracking-tight">
                                Votre annonce est prête.
                            </h1>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg uppercase ${statusBadge.color}`}>
                                {statusBadge.label}
                            </span>
                        </div>
                        <p className="text-gray-400 mt-1 font-medium">
                            {isListingUnlocked
                                ? 'Vous pouvez maintenant copier ou télécharger votre annonce.'
                                : "Débloquez l'annonce pour accéder à toutes les fonctionnalités."}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => navigate('/creer-annonce')}
                            className="px-8 py-3 border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all text-lg"
                        >
                            Modifier
                        </button>
                        {!isListingUnlocked ? (
                            <button
                                onClick={() => setIsUnlockModalOpen(true)}
                                className="px-8 py-3 rounded-2xl font-bold text-white bg-[#4A8B7D] hover:bg-[#3d7368] transition-all text-lg shadow-sm"
                            >
                                Débloquer l'annonce complète
                            </button>
                        ) : (
                            <div className="px-8 py-3 rounded-2xl font-bold text-white bg-[#4A8B7D] text-lg shadow-sm flex items-center gap-2">
                                <span>✓</span> Annonce débloquée
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div className='lg:col-span-8 space-y-6'>
                        <div className=" sticky top-20">
                            {hasCredits === 0 && isListingUnlocked ? (
                                <CreditCard />
                            ) : (
                                <>
                                    <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-100 min-h-[600px]">
                                        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-2 md:gap-0 mb-8">
                                            <h3 className="text-base font-bold uppercase tracking-widest text-gray-400">
                                                Aperçu de l'annonce générée
                                            </h3>
                                            <div className="flex gap-2">
                                                <span className="bg-[#E9F2F0] text-[#4A8B7D] text-sm font-bold px-3 py-1.5 rounded-lg uppercase">
                                                    Français / Suisse Romande
                                                </span>
                                            </div>
                                        </div>

                                        {isGenerating ? (
                                            <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
                                                <Loader2 size={28} className="animate-spin text-[#4A8B7D]" />
                                                <p className="font-medium">Génération de l'annonce en cours…</p>
                                            </div>
                                        ) : (
                                            <div className="prose prose-slate max-w-none">
                                                <div className="text-base leading-[1.8] text-[#475569] font-medium whitespace-pre-wrap">
                                                    {activeGeneration?.generatedText || 'Aucune annonce générée pour le moment.'}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <ExportActions
                                        listingId={listingId}
                                        generationId={activeGeneration?.id}
                                        isListingUnlocked={isListingUnlocked}
                                        activeGeneration={activeGeneration}
                                    />
                                </>
                            )}
                        </div>
                    </div>


                    <div className="lg:col-span-4 space-y-6">
                        <IAModificationOptions
                            hasCredits={hasCredits}
                            listingId={listingId}
                            generationId={activeGeneration?.id}
                            onResult={handleAiResult}
                        />
                        <ExpertValidationCard listingId={listingId} />
                    </div>
                </div>
            </div>

            <UnlockPaymentModal
                isOpen={isUnlockModalOpen}
                onClose={() => setIsUnlockModalOpen(false)}
                listingId={listingId}
                listingStatus={listingStatus}
                onPaymentSuccess={async () => {
                    await refetchListings();
                    setIsUnlockModalOpen(false);
                    if (listingId) await triggerGenerationIfNeeded(listingId);
                }}
            />
        </div>
    );
};

export default AnnonceReadyView;