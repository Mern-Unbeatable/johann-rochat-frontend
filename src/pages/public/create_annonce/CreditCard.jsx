import { Plus, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function CreditCard() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md rounded-2xl bg-white border border-[#e9e9e9] shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-5">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#9ca3af] font-medium">
              VOTRE SOLDE
            </p>
            <h2 className="text-[18px] font-semibold text-[#2f3743] leading-none mt-1">
              0 crédits
            </h2>
          </div>

          <button className="w-9 h-9 rounded-md bg-[#e8f4ef] flex items-center justify-center hover:bg-[#dff0e8] transition">
            <Plus size={18} strokeWidth={2.3} className="text-[#6f8f82]" />
          </button>
        </div>

        {/* Alert Box */}
        <div className="bg-[#fdf1f1] rounded-xl px-6 py-8 text-center">
          <div className="flex justify-center mb-4">
            <TriangleAlert
              size={28}
              strokeWidth={2}
              className="text-[#e3342f]"
            />
          </div>

          <h3 className="text-[#df2f2f] font-semibold text-[18px] mb-2">
            Vous n'avez plus de crédits
          </h3>

          <p className="text-[#f16f6f] text-[15px] leading-snug mb-6">
            Continuez à améliorer votre annonce
            <br />
            pour maximiser vos chances
          </p>

       <Link to='/tarifs' >
           <button className="w-full h-[48px] rounded-xl bg-[#ef2424] text-white text-[18px] font-medium hover:bg-[#df1e1e] transition">
            Obtenez plus de crédits
          </button>
       </Link>
        </div>
      </div>
    </div>
  );
}