import { EyeOff, Eye, AlertCircle } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../features/api/authApi';
import toast from 'react-hot-toast';

const RegisterView = () => {
  const navigate = useNavigate();
  const isMountedRef = useRef(true);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  // RTK Query hook
  const [signUp, { isLoading }] = useSignUpMutation();

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      errors.terms = 'You must agree to the terms and conditions';
    }

    return errors;
  };

  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword &&
    agreeTerms;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      // Show first error as toast
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      return;
    }

    try {
      // Prepare data for API
      const signupData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        consent: agreeTerms,
      };

      const result = await signUp(signupData).unwrap();

      if (result) {
        toast.success(result.message || 'Registration initiated! Please check your email for OTP.');
        setTimeout(() => {
          navigate('/auth/verify-otp', {
            state: {
              email: formData.email,
              isPasswordReset: false,
              userId: result.userId,
            },
          });
        }, 1500);
      }
    } catch (err) {
      console.error('Signup error:', err);
      const errorMessage = err?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);

      // Set error in state for display
      if (isMountedRef.current) {
        setValidationErrors({ submit: errorMessage });
      }
    }
  };
  const handleGoogleLogin = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${API_URL}/api/v1/auth/google`;
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF9F7] p-2">
      <div className="w-full max-w-[550px] rounded-[20px] border border-gray-100 bg-white p-4 shadow-sm md:p-6">
        <h1 className="mb-2 text-3xl font-bold text-[#334155]">S'inscrire</h1>
        <p className="mb-8 text-base text-gray-500">
          Créez un compte Casagen pour lister vos propriétés.
        </p>

        {validationErrors.submit && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-red-500" />
            <p className="text-sm text-red-700">{validationErrors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First name and Last name - One line (Grid) */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">Prénom</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Ex: Jean"
                disabled={isLoading}
                className={`w-full rounded-lg border px-4 py-3 transition-all outline-none focus:border-[#2D5A4E] ${
                  validationErrors.firstName ? 'border-red-500' : 'border-gray-200'
                } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
              />
              {validationErrors.firstName && (
                <p className="mt-1 text-xs text-red-500">{validationErrors.firstName}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">
                Nom de famille
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Ex: Dupont"
                disabled={isLoading}
                className={`w-full rounded-lg border px-4 py-3 transition-all outline-none focus:border-[#2D5A4E] ${
                  validationErrors.lastName ? 'border-red-500' : 'border-gray-200'
                } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
              />
              {validationErrors.lastName && (
                <p className="mt-1 text-xs text-red-500">{validationErrors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">E-mail</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              disabled={isLoading}
              className={`w-full rounded-lg border px-4 py-3 transition-all outline-none focus:border-[#2D5A4E] ${
                validationErrors.email ? 'border-red-500' : 'border-gray-200'
              } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
            />
            {validationErrors.email && (
              <p className="mt-1 text-xs text-red-500">{validationErrors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">Mot de passe</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 caractères"
                disabled={isLoading}
                className={`w-full rounded-lg border px-4 py-3 transition-all outline-none focus:border-[#2D5A4E] ${
                  validationErrors.password ? 'border-red-500' : 'border-gray-200'
                } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#2D5A4E]"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {validationErrors.password && (
              <p className="mt-1 text-xs text-red-500">{validationErrors.password}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#4A4A4A]">
              Confirmez le mot de passe
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Saisissez à nouveau votre mot de passe"
                disabled={isLoading}
                className={`w-full rounded-lg border px-4 py-3 transition-all outline-none focus:border-[#2D5A4E] ${
                  validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                } ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
              />
            </div>
            {validationErrors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{validationErrors.confirmPassword}</p>
            )}
          </div>

          <div className="mt-8 flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                if (validationErrors.terms) {
                  setValidationErrors({ ...validationErrors, terms: '' });
                }
              }}
              disabled={isLoading}
              className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 text-[#2D5A4E] focus:ring-[#2D5A4E]"
            />
            <label htmlFor="terms" className="text-base text-gray-900">
              J'accepte les{' '}
              <span className="cursor-pointer font-medium text-[#2D5A4E] hover:underline">
                conditions générales
              </span>{' '}
              et la{' '}
              <span className="cursor-pointer font-medium text-[#2D5A4E] hover:underline">
                politique de confidentialité
              </span>
            </label>
          </div>
          {validationErrors.terms && (
            <p className="text-xs text-red-500">{validationErrors.terms}</p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`mt-10 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-base font-bold transition-all ${
              isFormValid && !isLoading
                ? 'bg-[#2D5A4E] text-white shadow-md hover:bg-[#23473D]'
                : 'cursor-not-allowed bg-[#E5E7EB] text-gray-400'
            }`}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Inscription en cours...
              </>
            ) : (
              'Suivant'
            )}
          </button>
        </form>

        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative bg-white px-4 text-sm font-medium text-gray-400">
            Ou continuer avec
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 transition-colors hover:bg-gray-50 sm:mb-10 sm:gap-3 sm:py-3.5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="sm:h-5 sm:w-5">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-sm font-medium text-[#4A4A4A] sm:text-base">Google</span>
        </button>

        <p className="text-center text-sm text-gray-500">
          Vous avez déjà un compte ?{' '}
          <Link to="/auth/login" className="font-bold text-[#2D5A4E] hover:underline">
            Connectez-vous.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;
