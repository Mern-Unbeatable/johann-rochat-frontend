import React from 'react';
import { Clipboard, CreditCard } from 'lucide-react';

const AdminHeader = ({ onLogout, today }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      
      {/* Top Section: Badge and Date */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
        <div className="inline-flex items-center bg-[#E9F3F1] px-4 py-1.5 rounded-full">
          <p className="text-sm font-bold text-[#5A8D84] uppercase tracking-wider">
            Terminal Administratif
          </p>
        </div>
        <p className="text-sm font-medium text-gray-400">
          {today || "lundi 2 février 2026"}
        </p>
      </div>

      {/* Main Row: Title and Logout Button */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl  font-bold text-[#334155] uppercase tracking-tight mb-3">
            Console de Gestion
          </h1>
          <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
            Surveillance du pipeline, du crédit et de la croissance des membres.
          </p>
        </div>

        <button
          onClick={onLogout}
          className="mt-2 rounded-xl border border-gray-200  px-6 py-3 text-sm font-bold text-[#334155]   transition-all sm:whitespace-nowrap"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;