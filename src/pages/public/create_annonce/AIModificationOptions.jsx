/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Sparkles, Sun, AlignLeft, MapPin, TrendingUp, Home, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useApplyAiFeatureMutation } from '../../../features/api/aiFeatureApi';
import { useRefreshUserCreditsMutation } from '../../../features/api/userApi';
import { updateUserCredits, selectUserCredits } from '../../../features/auth/authSlice';

const OPTIONS = [
  { icon: <Sparkles size={16} />, label: 'Rendez-le plus premium', feature: 'MAKE_PREMIUM' },
  { icon: <Sun size={16} />, label: 'Ajoutez un ton plus chaud', feature: 'WARMER_TONE' },
  { icon: <AlignLeft size={16} />, label: 'Raccourcir le texte', feature: 'SHORTEN_TEXT' },
  { icon: <MapPin size={16} />, label: "Mettre davantage en valeur l'emplacement", feature: 'HIGHLIGHT_LOCATION' },
  { icon: <TrendingUp size={16} />, label: 'Optimiser pour les investisseurs', feature: 'OPTIMIZE_INVESTORS' },
  { icon: <Home size={16} />, label: 'Optimiser pour AirBnB', feature: 'OPTIMIZE_AIRBNB' },
];

const CREDIT_COST = 1;
const MIN_CUSTOM_LENGTH = 10;

const IAModificationOptions = ({ hasCredits, listingId, generationId, onResult }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxCredits = useSelector(selectUserCredits);
  const creditsAvailable = hasCredits !== undefined ? hasCredits : reduxCredits;
  const creditsOk = Number(creditsAvailable) >= CREDIT_COST;

  const [applyAiFeature, { isLoading }] = useApplyAiFeatureMutation();
  const [refreshUserCredits] = useRefreshUserCreditsMutation();

  const [loadingFeature, setLoadingFeature] = useState(null); // শুধু active feature track করে
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [customText, setCustomText] = useState('');
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // ── Fix 1: isAnyLoading সরিয়ে per-feature loading ──
  // কোনো feature loading এ থাকলে সেটা ছাড়া অন্যগুলো disable হবে না
  // শুধু credits না থাকলে সব disable

  const refreshCredits = async () => {
    try {
      const updatedUser = await refreshUserCredits().unwrap();
      if (updatedUser && updatedUser.credits !== undefined) {
        dispatch(updateUserCredits(updatedUser.credits));
        return updatedUser.credits;
      }
    } catch (error) {
      console.error('Failed to refresh credits:', error);
    }
    return null;
  };

  const callApplyFeature = async (feature, customPrompt = null) => {
    const body = {
      listingId,
      feature,
      ...(generationId ? { generationId } : {}),
      ...(customPrompt ? { customPrompt } : {}),
    };

    try {
      const result = await applyAiFeature(body).unwrap();
      await refreshCredits();
      return result;
    } catch (err) {
      if (err?.status === 402 || err?.data?.statusCode === 402) {
        toast.error('Crédits insuffisants. Veuillez acheter des crédits.');
        return null;
      }
      throw new Error(err?.data?.message || err?.message || 'Une erreur est survenue.');
    }
  };

  const handleOptionClick = async (feature) => {
    if (!creditsOk) {
      toast.error('Crédits insuffisants. Veuillez acheter des crédits pour utiliser cette fonctionnalité.');
      return;
    }

    // ── Fix 1: শুধু এই feature টা loading, অন্যগুলো নয় ──
    setLoadingFeature(feature);
    try {
      const result = await callApplyFeature(feature);
      if (result) {
        toast.success('Annonce mise à jour avec succès !');
        onResult?.(result);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingFeature(null); // শেষ হলে clear
    }
  };

  const handleGenerate = async () => {
    if (!creditsOk) {
      toast.error('Crédits insuffisants. Veuillez acheter des crédits pour générer du contenu.');
      return;
    }

    // ── Fix 2: Custom prompt validation — সুন্দর error message ──
    const trimmed = customText.trim();
    if (!trimmed) {
      toast.error('Veuillez décrire vos instructions avant de générer.', {
        icon: '✏️',
        duration: 3000,
      });
      return;
    }
    if (trimmed.length < MIN_CUSTOM_LENGTH) {
      toast.error(
        `Votre instruction est trop courte. Minimum ${MIN_CUSTOM_LENGTH} caractères requis (actuellement ${trimmed.length}).`,
        { icon: '⚠️', duration: 4000 }
      );
      return;
    }

    setLoadingCustom(true);
    try {
      const result = await callApplyFeature('CUSTOM', trimmed);
      if (result) {
        toast.success('Annonce générée avec succès !');
        setCustomText('');
        onResult?.(result);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingCustom(false);
    }
  };

  const handleBuyCredits = () => {
    navigate('/tarifs', { state: { returnTo: window.location.pathname, requiredCredits: CREDIT_COST } });
  };

  return (
    <>
      <div className="bg-white rounded-xl p-4 md:p-8 border border-gray-100 space-y-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-[#334155] text-xl tracking-tight leading-tight w-2/3">
            Options de modification de l'IA
          </h4>
          <span className="bg-[#E9F2F0] text-[#4A8B7D] text-sm font-bold px-2 py-1 rounded-md">
            1 CRÉDIT
          </span>
        </div>

        <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed">
          Chaque changement coûtera 1 crédit. Passez à Premium pour débloquer des fonctionnalités
          illimitées.
        </p>

        {/* Credits display */}
        <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Crédits disponibles:</span>
          <span className={`text-lg font-bold ${creditsOk ? 'text-[#4A8B7D]' : 'text-red-500'}`}>
            {creditsAvailable || 0}
          </span>
        </div>

        {/* Feature buttons */}
        <div className="space-y-2.5">
          {OPTIONS.map((item) => {
            const isThisLoading = loadingFeature === item.feature;
            // ── Fix 1: শুধু credits না থাকলে disable, loading এর কারণে না ──
            const isDisabled = !creditsOk || isThisLoading;

            return (
              <div
                key={item.feature}
                className="relative"
                onMouseEnter={() => !creditsOk && setHoveredFeature(item.feature)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <button
                  onClick={() => handleOptionClick(item.feature)}
                  disabled={isDisabled}
                  className={`w-full flex items-center justify-between p-4 border rounded-2xl transition-all bg-white shadow-sm ${!isDisabled
                    ? 'border-gray-100 group hover:border-[#4A8B7D] cursor-pointer'
                    : 'border-gray-100 opacity-60 cursor-not-allowed bg-gray-50'
                    }`}
                >
                  <div
                    className={`flex items-center gap-3 ${!isDisabled ? 'text-gray-600 group-hover:text-[#4A8B7D]' : 'text-gray-400'}`}
                  >
                    <span className={!isDisabled ? 'text-gray-400 group-hover:text-[#4A8B7D]' : 'text-gray-300'}>
                      {isThisLoading
                        ? <Loader2 size={16} className="animate-spin text-[#4A8B7D]" />
                        : item.icon
                      }
                    </span>
                    <span className="text-base font-bold">{item.label}</span>
                  </div>

                  {isThisLoading
                    ? <span className="text-xs font-bold text-[#4A8B7D] uppercase">...</span>
                    : <span className="text-sm font-bold text-gray-300 uppercase">-1CR</span>
                  }
                </button>

                {/* Tooltip */}
                {!creditsOk && hoveredFeature === item.feature && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50">
                    <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                      Crédits insuffisants - Achetez des crédits
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom textarea */}
        <div className="space-y-3 pt-2">
          <label className="text-base font-bold text-gray-700 ml-1 mb-2">
            Générer avec l'IA
          </label>

          <div className="relative">
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder={
                creditsOk
                  ? "Décrivez vos pensées et laissez l'IA les planifier..."
                  : 'Crédits insuffisants — achetez des crédits pour utiliser cette fonctionnalité'
              }
              disabled={!creditsOk || loadingCustom}
              className={`w-full border border-gray-100 rounded-lg p-4 text-base h-24 outline-none bg-white placeholder:text-gray-500 resize-none mt-2 transition-colors ${!creditsOk || loadingCustom
                ? 'cursor-not-allowed bg-gray-50'
                : 'focus:border-[#4A8B7D]'
                }`}
            />
            {/* ── Fix 2: character counter ── */}
            {customText.length > 0 && (
              <span className={`absolute bottom-3 right-3 text-xs font-medium ${customText.trim().length >= MIN_CUSTOM_LENGTH ? 'text-[#4A8B7D]' : 'text-red-400'
                }`}>
                {customText.trim().length}/{MIN_CUSTOM_LENGTH}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={!creditsOk || loadingCustom}
              className={`flex-1 py-4 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${creditsOk && !loadingCustom
                ? 'bg-[#4A8B7D] text-white hover:bg-[#3d7368] cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
            >
              {loadingCustom && <Loader2 size={16} className="animate-spin" />}
              {loadingCustom ? 'Génération...' : 'Générer'}
            </button>
          </div>

          {!creditsOk && (
            <div className="relative group">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 hidden group-hover:block z-50">
                <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                  Achetez des crédits pour générer du contenu
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default IAModificationOptions;