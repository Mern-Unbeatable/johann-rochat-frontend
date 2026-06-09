import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../features/auth/authSlice';

const NavbarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  const handleDashboard = () => {
    if (role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/dash');
    }
    setIsOpen(false);
  };

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'À propos', href: '/about' },
    { name: 'Comment ça marche ?', href: '/how-it-works' },
    { name: 'Mentions légales', href: '/legals' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="relative z-50 border-b border-gray-100 bg-[#FFFCF6] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-18 items-center justify-between py-3 sm:min-h-20">
          <div className="shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="CASAGEN" className="h-8 w-auto sm:h-10" />
            </Link>
          </div>

          <div className="hidden 2xl:flex 2xl:flex-1 2xl:items-center 2xl:justify-center 2xl:gap-8 2xl:px-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`whitespace-nowrap text-base font-medium transition-colors hover:text-[#3D7A6D] ${isActive(item.href) ? 'text-[#3D7A6D]' : 'text-gray-600'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden shrink-0 2xl:flex 2xl:items-center 2xl:gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="whitespace-nowrap rounded-lg bg-[#3D7A6D] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#34695e]"
                >
                  Tableau de bord
                </button>

              </>
            ) : (
              <Link
                to="/auth"
                className="whitespace-nowrap rounded-lg bg-[#3D7A6D] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#34695e]"
              >
                Se connecter / S'inscrire
              </Link>
            )}
          </div>

          <div className="ml-auto 2xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#3D7A6D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D7A6D]"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="fixed left-0 top-[70px] z-50 w-full bg-[#FFFCF6] border-t border-gray-200 pb-4 pt-3 shadow-md 2xl:hidden">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block wrap-break-word rounded-md px-3 py-2 text-base font-medium sm:text-lg ${isActive(item.href)
                    ? 'bg-green-50 text-[#3D7A6D]'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleDashboard}
                    className="mt-2 block w-full rounded-md bg-[#3D7A6D] px-3 py-3 text-center font-medium text-white"
                  >
                    Tableau de bord
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-3 py-3 text-center font-medium text-white"
                  >
                    <LogOut size={18} />
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 block w-full rounded-md bg-[#3D7A6D] px-3 py-3 text-center font-medium text-white"
                >
                  Se connecter / S'inscrire
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarLayout;