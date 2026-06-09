import { Eye, EyeOff } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import {
  useVerifyLoginOtpMutation,
  useSignInMutation,
  useResendOtpMutation
} from '../../features/api/authApi';
import toast from 'react-hot-toast';

const TextInput = ({ label, type = 'text', value, onChange, right, placeholder }) => (
  <div className="block mb-3 sm:mb-4">
    <div className="flex justify-between items-center mb-1.5 sm:mb-2">
      <span className="text-sm sm:text-base font-medium text-[#4A4A4A]">{label}</span>
      {right && <div className="text-xs sm:text-sm text-gray-500">{right}</div>}
    </div>
    <input
      type={type}
      className="w-full rounded-lg border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none transition focus:border-[#2D5A4E]"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [show, setShow] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, role, loading: authLoading } = useSelector((state) => state.auth);

  const [signIn, { isLoading: isSigningIn, error: signInError }] = useSignInMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp, error: verifyError }] = useVerifyLoginOtpMutation();
  const [resendOtp, { isLoading: isResendingOtp }] = useResendOtpMutation();

  const loading = isSigningIn || isVerifyingOtp || authLoading || isResendingOtp;
  const error = signInError?.data?.message || verifyError?.data?.message;
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorParam = params.get('error');

    if (errorParam === 'google_auth_failed') {
      toast.error('Google login failed. Please try again.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location]);


  useEffect(() => {

    if (isAuthenticated && role) {

      setTimeout(() => {
        if (role === 'ADMIN' || role === 'admin') {
          navigate('/admin', { replace: true });
        } else if (role === 'USER' || role === 'user') {

          navigate('/dash', { replace: true });
        }
      }, 100);
    }
  }, [isAuthenticated, role, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const result = await signIn({ email, password }).unwrap();

      if (result?.requiresOtp || result?.data?.requiresOtp) {
        setShowOtp(true);
      } else if (result?.accessToken || result?.data?.accessToken) {
        const userData = result?.user || result?.data?.user;
        const token = result?.accessToken || result?.data?.accessToken;

        if (userData && token) {
          dispatch(setCredentials({ user: userData, token }));
          toast.success('Login successful!');
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error('Veuillez entrer le code OTP à 6 chiffres');
      return;
    }

    try {
      const result = await verifyOtp({ email, otp }).unwrap();


      // The response structure: { user, accessToken, refreshToken }
      const userData = result?.user;
      const token = result?.accessToken;

      if (userData && token) {

        dispatch(setCredentials({ user: userData, token }));
        toast.success('Login successful!');


        if (userData.role === 'ADMIN' || userData.role === 'admin') {

          navigate('/admin', { replace: true });
        } else if (userData.role === 'USER' || userData.role === 'user') {
          navigate('/dash', { replace: true });
        }
      } else {
        toast.error('Erreur lors de la vérification OTP');
      }
    } catch (err) {
      console.error('OTP verification failed:', err);
      toast.error(err?.data?.message || 'Échec de la vérification OTP');
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendMessage('');
      const result = await resendOtp({ email }).unwrap();
      setResendMessage(result?.message || 'Un nouveau code OTP a été envoyé à votre email');
      toast.success('New OTP code sent!');
      setTimeout(() => setResendMessage(''), 5000);
    } catch (err) {
      const errorMessage = err?.data?.message || 'Échec de l\'envoi du code OTP';
      setResendMessage(errorMessage);
      toast.error(errorMessage);
      setTimeout(() => setResendMessage(''), 5000);
    }
  };

  const handleGoogleLogin = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${API_URL}/auth/google`;
  };

  // If showing OTP form
  if (showOtp) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex flex-col items-center justify-start sm:justify-center p-4 pt-10 sm:pt-4">
        <div className="bg-white w-full max-w-137.5 rounded-xl sm:rounded-[20px] shadow-sm border border-gray-100 p-5 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#334155] mb-1 sm:mb-2">Vérification OTP</h1>
          <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-10">
            Veuillez entrer le code OTP envoyé à {email}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {typeof error === 'string' ? error : JSON.stringify(error)}
            </div>
          )}

          {resendMessage && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${resendMessage.includes('envoyé')
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
              }`}>
              {resendMessage}
            </div>
          )}

          <form onSubmit={handleVerifyOtp}>
            <TextInput
              label="Code OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Entrez le code à 6 chiffres"
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 mb-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:flex-1 bg-[#2D5A4E] text-white py-2.5 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base hover:bg-[#24493f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifyingOtp ? 'Vérification...' : 'Vérifier OTP'}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResendingOtp}
                className="w-full sm:flex-1 border border-[#2D5A4E] text-[#2D5A4E] py-2.5 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base hover:bg-[#2D5A4E] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResendingOtp ? 'Envoi...' : 'Renvoyer OTP'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowOtp(false);
                setOtp('');
                setResendMessage('');
              }}
              className="w-full text-center text-gray-600 hover:text-[#2D5A4E] transition-colors text-sm sm:text-base"
            >
              ← Retour à la connexion
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex flex-col items-center justify-start sm:justify-center p-4 pt-10 sm:pt-4">
      <div className="bg-white w-full max-w-137.5 rounded-xl sm:rounded-[20px] shadow-sm border border-gray-100 p-5 sm:p-6">

        <h1 className="text-2xl sm:text-3xl font-bold text-[#334155] mb-1 sm:mb-2">
          Connectez-vous à votre compte
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-10">
          Veuillez d'abord vous connecter pour déverrouiller votre annonce.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {typeof error === 'string' ? error : error?.message || 'Une erreur est survenue'}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <TextInput
            label="Adresse email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            label="Mot de passe"
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            right={
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="flex items-center gap-1 hover:text-[#2D5A4E] transition-colors"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
                <span>{show ? 'Cacher' : 'Afficher'}</span>
              </button>
            }
          />

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-6 sm:mt-8 mb-6 sm:mb-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 bg-[#2D5A4E] text-white py-2.5 sm:py-3.5 rounded-lg font-bold text-sm sm:text-base hover:bg-[#24493f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningIn ? 'Connexion...' : 'Se connecter'}
            </button>
            <Link to="/auth/forgot-password" className="text-sm sm:text-base font-bold text-gray-800 hover:underline whitespace-nowrap">
              Mot de passe oublié ?
            </Link>
          </div>
        </form>

        <div className="relative flex items-center justify-center my-6 sm:my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative bg-white px-3 sm:px-4 text-gray-600 text-xs sm:text-base">
            Ou connectez-vous avec
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 sm:gap-3 border border-gray-300 py-2.5 sm:py-3.5 rounded-lg hover:bg-gray-50 transition-colors mb-6 sm:mb-10"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" className="sm:w-5 sm:h-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-[#4A4A4A] font-medium text-sm sm:text-base">Google</span>
        </button>

        <div className="space-y-2 sm:space-y-3">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Vous n'êtes pas membre ? Inscrivez-vous pour recevoir des offres exclusives, acheter des forfaits et créer une annonce.
          </p>
          <Link to="/auth/register" className="block text-xs sm:text-base font-bold text-black hover:underline">
            Créer un nouveau compte.
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginView;