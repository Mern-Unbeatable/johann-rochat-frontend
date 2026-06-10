import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllPackagesQuery } from '../../../../features/api/packageApi';
import { useCreateCheckoutMutation, useVerifyAndUnlockMutation } from '../../../../features/api/paymentApi';
import { useGetMeQuery } from '../../../../features/api/userApi';
import toast from 'react-hot-toast';
import PriceCard from './PriceCard';
import LoadingFallback from '../../../../router/components/LoadingFallback';

const PricingCards = () => {
    const navigate = useNavigate();
    const { data: packagesData, isLoading: isLoadingPackages } = useGetAllPackagesQuery({});
    const [createCheckout, { isLoading: isProcessingPayment }] = useCreateCheckoutMutation();
    const [verifyAndUnlock] = useVerifyAndUnlockMutation();
    const { data: currentUser, refetch: refetchUser, isLoading: isLoadingUser } = useGetMeQuery();

    const [buyingPackageId, setBuyingPackageId] = React.useState(null);
    const [isVerifying, setIsVerifying] = React.useState(false); // ✅ Verification loading state

    const userData = currentUser?.user || currentUser;
    const isAuthenticated = userData && userData.id;

    const packs = packagesData?.packages?.map((pkg, index, array) => ({
        name: pkg.name?.toUpperCase() || '',
        title: pkg.title?.toUpperCase() || '',
        description: pkg.description || '',
        credits: pkg.credits?.toString() || '',
        price: pkg.price?.toString() || '',
        subText: `${pkg.pricePerCredit} CHF / crédit`,
        features: Array.isArray(pkg.features) ? pkg.features : [],
        featured: index === array.length - 1,
        packageId: pkg.id,
        creditAmount: pkg.credits,
    })) || [];

    const handleBuyPackage = async (packageId) => {
        if (!isAuthenticated) {
            toast.error('Veuillez vous connecter pour acheter des crédits', {
                duration: 4000,
                position: 'top-center',
            });
            return;
        }

        if (!packageId) {
            toast.error('Package introuvable');
            return;
        }

        setBuyingPackageId(packageId);
        try {
            const result = await createCheckout({
                type: 'PACKAGE',
                packageId
            }).unwrap();

            if (result?.url) {
                sessionStorage.setItem('pendingPackageId', packageId);
                sessionStorage.setItem('pendingPackageCredits',
                    packs.find(p => p.packageId === packageId)?.creditAmount ?? '');
                window.location.href = result.url;
            } else {
                toast.error('Erreur lors de la création de la session de paiement.');
                setBuyingPackageId(null);
            }
        } catch (err) {
            if (err?.status === 401) {
                toast.error('Session expirée. Veuillez vous reconnecter.', {
                    duration: 4000,
                    position: 'top-center',
                });
            } else {
                toast.error(err?.data?.message || "Avant d'acheter, vous devez vous inscrire.");
            }
            setBuyingPackageId(null);
        }
    };

    // ✅✅✅ UPDATED: Payment Return Verification Logic
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');
        const success = params.get('success');
        const type = params.get('type');
        const canceled = params.get('canceled');

        // ১. যদি পেমেন্ট Cancel করে
        if (canceled === 'true') {
            toast.error('Paiement annulé. Veuillez réessayer.');
            sessionStorage.removeItem('pendingPackageId');
            sessionStorage.removeItem('pendingPackageCredits');
            window.history.replaceState({}, document.title, window.location.pathname);
            return;
        }

        // ২. যদি Stripe থেকে Success নিয়ে ফিরে আসে
        if (sessionId && success === 'true' && type === 'PACKAGE') {
            setIsVerifying(true); // Loader চালু করো

            const verifyPayment = async () => {
                try {
                    const result = await verifyAndUnlock(sessionId).unwrap();

                    if (result?.paid) {
                        const pendingCredits = sessionStorage.getItem('pendingPackageCredits');
                        toast.success(
                            `Paiement réussi ! ${pendingCredits ? `${pendingCredits} crédits ajoutés à votre compte.` : 'Vos crédits ont été mis à jour.'}`,
                            { duration: 5000 }
                        );
                        sessionStorage.removeItem('pendingPackageId');
                        sessionStorage.removeItem('pendingPackageCredits');
                        await refetchUser();
                    } else {
                        // Stripe এ টাকা কাটলেও ক্রেডিট তৎক্ষণাৎ যোগ না হলে
                        toast.info('Paiement en cours de traitement. Vos crédits seront mis à jour sous peu.');
                        await refetchUser();
                    }
                } catch (err) {
                    console.error('Verification error:', err);
                    toast.error("Erreur lors de la vérification. Si le paiement a été effectué, vos crédits seront ajoutés automatiquement.");
                    await refetchUser();
                } finally {
                    setIsVerifying(false); // Loader বন্ধ করো
                    // URL থেকে query params মুছে ফেলো যাতে রিফ্রেশ করলে আবার API কল না হয়
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            };

            verifyPayment();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoadingPackages || isLoadingUser) {
        return <LoadingFallback />
    }

    return (
        <section id="pricing" className="bg-[#FAF9F7] px-4 py-10 sm:px-6 md:py-16 lg:py-20 relative">

            {/* ✅ Verification Loading Overlay */}
            {isVerifying && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-lg font-semibold text-gray-700">Vérification du paiement en cours...</p>
                    <p className="text-sm text-gray-500 mt-2">Veuillez ne pas fermer cette page.</p>
                </div>
            )}

            <div className="container max-w-7xl mx-auto px-4 lg:px-12">
                <div className="mb-10 sm:mb-12 md:mb-16">
                    <h2 className="mb-3 text-2xl font-semibold text-[#2D3648] sm:mb-4 sm:text-3xl md:text-4xl">
                        Obtenez des crédits d'amélioration de l'IA
                    </h2>
                    <p className="max-w-3xl text-sm text-gray-500 sm:text-base">
                        Affinez votre annonce avec des tons premium, une optimisation experte ou des styles ciblés.
                    </p>
                </div>

                <div className="grid items-stretch gap-5 sm:gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {packs.map((pack, index) => (
                        <PriceCard
                            key={index}
                            {...pack}
                            onBuyClick={handleBuyPackage}
                            isLoading={isProcessingPayment && buyingPackageId === pack.packageId}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingCards;