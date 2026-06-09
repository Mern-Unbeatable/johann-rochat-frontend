import React, { useState } from 'react';
import { LockKeyhole, Loader2, X } from 'lucide-react';
import InfoModal from '../../../components/ui/modals/InfoModal';
import { useCreateCheckoutMutation } from '../../../features/api/paymentApi';
import toast from 'react-hot-toast';

const UnlockPaymentModal = ({
    isOpen,
    onClose,
    listingId,
    listingStatus,

}) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [createCheckout, { isLoading: isCreatingCheckout }] = useCreateCheckoutMutation();

    const isListingUnlocked = listingStatus === 'UNLOCKED';
    const canClose = isListingUnlocked && !isProcessing && !isCreatingCheckout;


    const handleUnlockPayment = async () => {
        if (!listingId) {
            toast.error("ID de l'annonce non trouvé");
            return;
        }
        setIsProcessing(true);
        try {
            const result = await createCheckout({
                listingId,
                type: 'LISTING_UNLOCK',
            }).unwrap();

            if (result?.url) {
                window.location.href = result.url;
            } else {
                toast.error('Erreur lors de la création de la session de paiement');
                setIsProcessing(false);
            }
        } catch (error) {
            const errorMessage =
                error?.data?.message || error?.message || 'Erreur de paiement. Veuillez réessayer.';
            toast.error(errorMessage);
            setIsProcessing(false);
        }
    };

    const handleCloseModal = () => {
        if (canClose) {
            onClose();
        } else if (!isListingUnlocked && !isProcessing) {
            toast.error('Veuillez débloquer votre annonce pour continuer. Le paiement est requis.');
        }
    };

    if (!isOpen) return null;

    return (
        <InfoModal
            isOpen={isOpen}
            onClose={handleCloseModal}
            size="md"
            closeOnOverlayClick={canClose}
            closeOnEsc={canClose}
            className="overflow-hidden rounded-[28px] border border-gray-200 bg-[#fcfbf8] p-0 shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
        >
            <div className="flex flex-col items-center px-8 py-10 text-center relative">
                {canClose && (
                    <button
                        onClick={handleCloseModal}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F0EC] text-[#4A8B7D]">
                    {isProcessing || isCreatingCheckout ? (
                        <Loader2 size={28} className="animate-spin" />
                    ) : (
                        <LockKeyhole size={28} strokeWidth={2} />
                    )}
                </div>

                <h2 className="max-w-xs text-2xl font-extrabold leading-tight text-[#334155]">
                    {isProcessing || isCreatingCheckout
                        ? 'Traitement en cours...'
                        : isListingUnlocked
                            ? 'Annonce débloquée avec succès!'
                            : 'Débloquez votre annonce professionnelle'}
                </h2>

                <p className="mt-4 max-w-sm text-base leading-7 text-[#667085]">
                    {isProcessing || isCreatingCheckout
                        ? 'Veuillez patienter pendant que nous préparons votre paiement...'
                        : isListingUnlocked
                            ? 'Vous avez maintenant accès à votre annonce complète.'
                            : 'Accédez immédiatement à une annonce immobilière claire, structurée et convaincante, adaptée au marché suisse.'}
                </p>

                {!isProcessing && !isCreatingCheckout && !isListingUnlocked && (
                    <button
                        onClick={handleUnlockPayment}
                        className="mt-8 w-full rounded-xl bg-[#4A8B7D] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[#4A8B7D]/20 transition-all hover:bg-[#3d7368]"
                    >
                        Débloquez avec 9.90 CHF
                    </button>
                )}

                {isListingUnlocked && (
                    <button
                        onClick={handleCloseModal}
                        className="mt-8 w-full rounded-xl bg-green-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-green-700"
                    >
                        Fermer
                    </button>
                )}
            </div>
        </InfoModal>
    );
};

export default UnlockPaymentModal;