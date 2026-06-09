import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ userName, onLogout, today }) => {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Top Info Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Rounded Badge */}
          <div className="inline-flex items-center rounded-full bg-[#EBF2F0] px-4 py-2">
            <p className="text-sm font-medium text-[#2C5E51]">
              Espace de travail de l'utilisateur
            </p>
          </div>


          {/* Date Text */}
          <p className="text-sm font-medium text-[#6B7280] sm:ml-2">{today}</p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <h1 className="mb-3 text-3xl font-[600] text-gray-800 sm:text-4xl">
              Bienvenue {userName}
            </h1>
            <p className="mb-2 text-base max-w-lg text-gray-600 sm:text-xl">
              Entrez les détails ci-dessous. Casagen transforme votre annonce en une annonce
              professionnelle.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Link
              to="/creer-annonce"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#24493f] sm:justify-start sm:whitespace-nowrap sm:px-6 sm:py-3 sm:text-base"
            >
              <span>+</span> Créer une annonce
            </Link>
            <button
              onClick={onLogout}
              className="rounded-lg border-2 border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:whitespace-nowrap sm:px-6 sm:py-3 sm:text-base"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
