import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { useCreateListingMutation } from '../../../features/api/listingApi.js';
import { setLoading, setError, setListingId, resetForm, clearError } from '../../../features/listing/listingFormSlice.js';
import StepperHeader from './StepperHeader';
import StepGeneral from './steps/StepGeneral';
import StepFinances from './steps/StepFinances';
import StepConfort from './steps/StepConfort';
import StepConditions from './steps/StepConditions';
import Header from './components/Header';
import toast from 'react-hot-toast';

const steps = [
  { id: 1, label: 'GÉNÉRAL' },
  { id: 2, label: 'FINANCES' },
  { id: 3, label: 'CONFORT' },
  { id: 4, label: 'CONDITIONS' },
];

const CreateAnnoncePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.listingForm);
  const [step, setStep] = useState(1);
  const [createListing, { isLoading }] = useCreateListingMutation();

  const isAuthenticated = useSelector((state) => !!state.auth?.token);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const validateStep = useCallback(() => {
    if (step === 1) {
      if (!formData.location || formData.location.trim() === '') {
        toast.error('Veuillez entrer l\'emplacement');
        return false;
      }
      if (!formData.propertyType) {
        toast.error('Veuillez sélectionner le type de propriété');
        return false;
      }
      if (!formData.surface) {
        toast.error('Veuillez entrer la surface');
        return false;
      }
      if (!formData.rooms) {
        toast.error('Veuillez entrer le nombre de pièces');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.rent || formData.rent <= 0) {
        toast.error('Veuillez entrer un loyer valide');
        return false;
      }
    }
    if (step === 3) {
      if (!formData.condition) {
        toast.error('Veuillez sélectionner la condition');
        return false;
      }
      if (!formData.exposure) {
        toast.error('Veuillez sélectionner l\'exposition');
        return false;
      }
    }
    return true;
  }, [step, formData]);

  const prepareData = useCallback(() => {

    let equipmentArray = formData.equipment || [];
    if (Array.isArray(equipmentArray) && equipmentArray.length > 0) {
      if (formData.customEquipment && formData.customEquipment.trim()) {
        equipmentArray = [...equipmentArray, formData.customEquipment];
      }
    }
    const equipmentString = equipmentArray.length > 0 ? equipmentArray.join(', ') : null;

    let availableFromFormatted = null;
    if (formData.availableFrom) {
      try {
        const date = new Date(formData.availableFrom);
        if (!isNaN(date.getTime())) {
          availableFromFormatted = date.toISOString();
        }
      } catch (e) {
        console.error('Date parsing error:', e);
      }
    }

    return {
      location: formData.location,
      propertyType: formData.propertyType,
      surface: formData.surface ? Number(formData.surface) : null,
      rooms: formData.rooms ? Number(formData.rooms) : null,
      floor: formData.floor || null,
      hasElevator: formData.hasElevator || false,
      rent: Number(formData.rent),
      charges: formData.charges ? Number(formData.charges) : null,
      parkingPrice: formData.parkingPrice ? Number(formData.parkingPrice) : null,
      condition: formData.condition,
      exposure: formData.exposure,
      equipment: equipmentString,
      availableFrom: availableFromFormatted,
      petsAllowed: formData.petsAllowed,
      proximity: formData.proximity || undefined,
      additionalInfo: formData.additionalInfo || null,
    };
  }, [formData]);

  //  Error message handler function
  const showErrorMessage = (error) => {
    if (error?.status === 401 || error?.originalStatus === 401 || error?.data?.statusCode === 401) {
      setShowAuthModal(true);
      toast.error('Veuillez vous connecter pour créer une annonce', {
        duration: 4000,

      });
      return;
    }

    // Check for refresh token error
    if (error?.data?.message === 'Refresh token required' || error?.message?.includes('Refresh')) {
      setShowAuthModal(true);
      toast.error('Session expirée. Veuillez vous reconnecter.', {
        duration: 4000,
      });
      return;
    }

    // Handle validation errors from backend
    const errorData = error?.data;

    if (errorData?.message && Array.isArray(errorData.message)) {
      const errors = errorData.message.map(e => e.message).join(', ');
      toast.error(`Erreur: ${errors}`);
    }
    else if (errorData?.message) {
      toast.error(errorData.message);
    }
    else if (error?.message) {
      toast.error(error.message);
    }
    else {
      toast.error('Erreur lors de la création de l\'annonce');
    }
  };

  const next = useCallback(async () => {
    if (!validateStep()) return;

    if (step === 4) {
      //  Check if user is logged in
      if (!isAuthenticated) {
        setShowAuthModal(true);
        toast.error('Veuillez vous connecter pour créer une annonce', {
          duration: 4000,
        });
        dispatch(setError('Authentication required'));
        return;
      }

      dispatch(setLoading(true));
      dispatch(clearError());

      try {
        const data = prepareData();


        const result = await createListing(data).unwrap();

        if (result?.listing?.id) {
          dispatch(setListingId(result.listing.id));
          toast.success('Annonce créée avec succès!');

          setTimeout(() => {
            dispatch(resetForm());
            navigate('/creer-annonce/ready', {
              state: { listingId: result.listing.id }
            });
          }, 500);
        }
      } catch (error) {
        console.error('Failed to create listing:', error);

        showErrorMessage(error);
        const errorMessage = error?.data?.message || error?.message || 'Creation failed';
        dispatch(setError(errorMessage));
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      setStep((s) => Math.min(4, s + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validateStep, step, dispatch, prepareData, createListing, navigate, isAuthenticated]);

  const back = useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  const handleRedirectToLogin = () => {
    setShowAuthModal(false);
    navigate('/auth', {
      state: {
        from: '/creer-annonce',
        message: 'Veuillez vous connecter pour créer une annonce'
      }
    });
  };

  return (
    <div>

      {showAuthModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 px-4" onClick={() => setShowAuthModal(false)}>
          <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connexion requise</h3>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté pour créer une annonce. Veuillez vous connecter ou créer un compte.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleRedirectToLogin}
                  className="w-full bg-[#3D7A6D] text-white py-3 rounded-xl font-semibold hover:bg-[#34695e] transition-colors"
                >
                  Se connecter
                </button>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <StepperHeader steps={steps} step={step} setStep={setStep} />
      <div className="min-h-screen bg-[#FAF9F7] px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <Header />

          <div className="flex min-h-125 flex-col justify-between rounded-4xl border border-gray-50 bg-white p-8 shadow-sm md:p-12">
            {step === 1 && <StepGeneral />}
            {step === 2 && <StepFinances />}
            {step === 3 && <StepConfort />}
            {step === 4 && <StepConditions />}



            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-50 pt-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
              <button
                onClick={back}
                className={`${step === 1 ? 'hidden sm:flex sm:pointer-events-none sm:opacity-0' : 'flex'} w-full items-center justify-center gap-2 text-sm font-bold tracking-wider text-gray-400 uppercase transition-colors hover:text-gray-600 sm:w-auto sm:justify-start`}
              >
                <ChevronLeft size={18} /> Retour
              </button>
              <button
                onClick={next}
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D7A6D] px-5 py-2 font-bold text-white shadow-sm shadow-[#3D7A6D]/20 transition-all hover:bg-[#34695e] disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Chargement...
                  </>
                ) : (
                  step === 4 ? "Générer l'annonce" : 'Étape suivante'
                )}
                {!isLoading && <ChevronRight size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CreateAnnoncePage;