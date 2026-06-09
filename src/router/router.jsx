import { lazy, Suspense } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../layout/public/RootLayout';
import DashLayout from '../layout/dash/DashLayout';
import LoadingFallback from './components/LoadingFallback';
import LegalNotice from '../pages/public/legal _Notice/LegalNotice';
import ErrorElement from './components/ErrorElement';
import AuthLayout from '../layout/auth/AuthLayout';
import ProtectedRoute from './components/ProtectedRoute';
import GoogleCallbackView from '../pages/auth/GoogleCallbackView';
import PaymentCancel from '../pages/public/payment/PaymentCancel';
import PaymentSuccess from '../pages/public/payment/PaymentSuccess';
import ListingDetail from '../pages/dash/UserDashboard/ListingDetail';
const HomeView = lazy(() => import('../pages/public/public_Home/HomeView'));
const AboutView = lazy(() => import('../pages/public/public_about/AboutView'));
const HowItWorks = lazy(() => import('../pages/public/how_it_works/HowItWorks'));
const ContactView = lazy(() => import('../pages/public/public_contact/ContactView'));
const NotFound = lazy(() => import('../pages/error/NotFound'));
const LoginView = lazy(() => import('../pages/auth/LoginView'));
const RegisterView = lazy(() => import('../pages/auth/RegisterView'));
const VerifyOtpView = lazy(() => import('../pages/auth/VerifyOtpView'));
const ForgotPasswordOtpView = lazy(() => import('../pages/auth/ForgotPasswordOtpView'));
const ForgotPasswordView = lazy(() => import('../pages/auth/ForgotPasswordView'));
const ResetPasswordView = lazy(() => import('../pages/auth/ResetPasswordView'));
const SetPasswordView = lazy(() => import('../pages/auth/SetPasswordView'));
const PricePage = lazy(() => import('../pages/public/price/PricePage'));
const DashboardView = lazy(() => import('../pages/dash/dash_home/DashboardView'));
const AdminDashboard = lazy(() => import('../pages/dash/adminDashboard/AdminDashboard'));
const AnnouncementDetailPage = lazy(() => import('../pages/dash/adminDashboard/announcement/AnnouncementDetailPage'));
const CreateAnnonceView = lazy(() => import('../pages/public/create_annonce/CreateAnnoncePage'));
const AnnonceReadyView = lazy(() => import('../pages/public/create_annonce/AnnonceReadyView'));
const PrivacyPage = lazy(() => import('../pages/public/privacy/PrivacyPage'));
const TermsPage = lazy(() => import('../pages/public/terms/TermsPage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorElement />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <HomeView />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AboutView />
            </Suspense>
          }
        />
        <Route
          path="how-it-works"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <HowItWorks />
            </Suspense>
          }
        />
        <Route
          path="tarifs"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PricePage />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ContactView />
            </Suspense>
          }
        />
        <Route
          path="legals"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LegalNotice />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <PrivacyPage />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <TermsPage />
            </Suspense>
          }
        />
        <Route path="creer-annonce" >
          <Route
            index
            element={
              <Suspense fallback={<LoadingFallback />}>
                <CreateAnnonceView />
              </Suspense>
            }
          />
          <Route
            path="ready"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <AnnonceReadyView />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/cancel" element={<PaymentCancel />} />
      <Route path="auth" element={<AuthLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LoginView />
            </Suspense>
          }
        />
        <Route
          path="login"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <LoginView />
            </Suspense>
          }
        />
        <Route
          path="register"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <RegisterView />
            </Suspense>
          }
        />
        <Route
          path="verify-otp"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <VerifyOtpView />
            </Suspense>
          }
        />
        <Route
          path="verify-reset-otp"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ForgotPasswordOtpView />
            </Suspense>
          }
        />
        <Route
          path="forgot-password"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ForgotPasswordView />
            </Suspense>
          }
        />
        <Route
          path="reset-password"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ResetPasswordView />
            </Suspense>
          }
        />
        <Route
          path="set-password"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <SetPasswordView />
            </Suspense>
          }
        />

        <Route
          path="google-callback"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <GoogleCallbackView />
            </Suspense>
          }
        />
      </Route>
      {/* Protected Dashboard Routes */}
      <Route
        path="dash"
        element={
          <ProtectedRoute>
            <DashLayout />
          </ProtectedRoute>
        }
        errorElement={<ErrorElement />}
      >
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <DashboardView />
            </Suspense>
          }
        />
        <Route
          path="ad-details/:id"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ListingDetail />
            </Suspense>
          }
        />

      </Route>


      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <DashLayout />
          </ProtectedRoute>
        }
        errorElement={<ErrorElement />}
      >
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AdminDashboard />
            </Suspense>
          }
        />
        <Route
          path="announcement/:id"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AnnouncementDetailPage />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        }
      />
    </>
  )
);

export default router;
