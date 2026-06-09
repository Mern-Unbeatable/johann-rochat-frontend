import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Mail } from 'lucide-react';
import { useForgotPasswordMutation } from '../../features/api/authApi';
import toast from 'react-hot-toast';

const ForgotPasswordView = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const validateEmail = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidationError('');
    setSuccessMessage('');

    // Validation
    if (!email.trim()) {
      setValidationError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email');
      return;
    }

    try {
      const result = await forgotPassword({ email }).unwrap();
      if(result){
        toast.success(result.message || 'Un code de réinitialisation a été envoyé à votre email')
         navigate('/auth/verify-reset-otp', { state: { email } });
      }
  

    } catch (err) {
      const errorMessage = err?.data?.message || 'Failed to send reset code. Please try again.';
     toast.error(err.message || errorMessage )
      
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[500px] rounded-[20px] shadow-sm border border-gray-100 p-10 md:p-14">
        
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-black transition-colors"
        >
          <ArrowLeft size={18} /> Retour
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#E1ECE9] rounded-full flex items-center justify-center">
            <Mail size={32} className="text-[#2D5A4E]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#334155] mb-2 text-center">Mot de passe oublié ?</h1>
        <p className="text-gray-500 text-base mb-8 leading-relaxed text-center">
          Entrez votre adresse email et nous vous enverrons un code pour réinitialiser votre mot de passe.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#4A4A4A] mb-3">Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationError('');
                setError('');
                setSuccessMessage('');
              }}
              placeholder="votre@email.com"
              disabled={isLoading}
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#2D5A4E] transition-all ${
                validationError ? 'border-red-500' : 'border-gray-200'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            />
            {validationError && (
              <p className="text-red-500 text-xs mt-1">{validationError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!email.trim() || isLoading}
            className={`w-full py-3.5 rounded-lg font-bold text-base transition-all flex items-center justify-center gap-2 ${
              email.trim() && !isLoading
                ? 'bg-[#2D5A4E] text-white hover:bg-[#23473D] shadow-md'
                : 'bg-[#E5E7EB] text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Envoi en cours...
              </>
            ) : (
              'Envoyer le code'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Vous vous souvenez de votre mot de passe ?{' '}
            <button
              onClick={() => navigate('/auth/login')}
              className="text-[#2D5A4E] font-bold hover:underline"
            >
              Se connecter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;