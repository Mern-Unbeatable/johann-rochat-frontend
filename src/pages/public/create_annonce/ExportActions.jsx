/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Copy, Download, Loader2, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import { useCreateExportMutation } from '../../../features/api/exportApi';

const ExportActions = ({ listingId, generationId, isListingUnlocked, activeGeneration }) => {
  const [isCopying, setIsCopying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [createExport] = useCreateExportMutation();

  const unlocked = Boolean(isListingUnlocked);

  const formatListingText = () => {
    if (!activeGeneration) return '';
    const highlights = Array.isArray(activeGeneration.highlights)
      ? activeGeneration.highlights.map((h) => `• ${h}`).join('\n')
      : '';
    return [
      activeGeneration.title ?? '',
      '',
      activeGeneration.hook ?? '',
      '',
      activeGeneration.description ?? '',
      '',
      highlights,
      '',
      activeGeneration.practicalInfo ?? '',
    ].join('\n').trim();
  };

  // ─── COPY
  const handleCopyText = async () => {
    if (!listingId) {
      toast.error("Annonce introuvable.");
      return;
    }

    setIsCopying(true);
    const loadingToast = toast.loading('Préparation de la copie...');

    try {
      const result = await createExport({
        listingId,
        ...(generationId ? { generationId } : {}),
        type: 'COPY',
      }).unwrap();

      toast.dismiss(loadingToast);

      const textToCopy = result?.text || formatListingText();
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Texte copié dans le presse-papier !');
    } catch (error) {
      toast.dismiss(loadingToast);
      try {
        await navigator.clipboard.writeText(formatListingText());
        toast.success('Texte copié dans le presse-papier !');
      } catch {
        toast.error('Erreur lors de la copie. Veuillez réessayer.');
      }
    } finally {
      setIsCopying(false);
    }
  };

  // ─── PDF — pure frontend, no backend Chrome 
  const handleDownloadPDF = async () => {
    if (!activeGeneration) {
      toast.error("Aucune annonce à télécharger.");
      return;
    }

    setIsDownloading(true);
    const loadingToast = toast.loading('Génération du PDF...');

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const maxWidth = pageWidth - margin * 2;
      let y = margin;

      // ── Header bar
      doc.setFillColor(74, 139, 125);
      doc.rect(0, 0, pageWidth, 18, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Annonce Immobilière', margin, 12);
      y = 28;

      // ── Title ───────────────────────────────────────────────────
      if (activeGeneration.title) {
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        const titleLines = doc.splitTextToSize(activeGeneration.title, maxWidth);
        doc.text(titleLines, margin, y);
        y += titleLines.length * 8 + 4;
      }

      // ── Divider 
      doc.setDrawColor(74, 139, 125);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 6;

      // ── Hook 
      if (activeGeneration.hook) {
        doc.setTextColor(71, 85, 105);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bolditalic');
        const hookLines = doc.splitTextToSize(activeGeneration.hook, maxWidth);
        doc.text(hookLines, margin, y);
        y += hookLines.length * 6 + 6;
      }

      // ── Description ─────────────────────────────────────────────
      if (activeGeneration.description) {
        doc.setTextColor(71, 85, 105);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(activeGeneration.description, maxWidth);

        // page break if needed
        if (y + descLines.length * 5.5 > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }

        doc.text(descLines, margin, y);
        y += descLines.length * 5.5 + 6;
      }

      // ── Highlights ──────────────────────────────────────────────
      if (Array.isArray(activeGeneration.highlights) && activeGeneration.highlights.length > 0) {
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Points clés', margin, y);
        y += 6;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);

        for (const highlight of activeGeneration.highlights) {
          const lines = doc.splitTextToSize(`• ${highlight}`, maxWidth - 4);
          if (y + lines.length * 5.5 > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
          doc.text(lines, margin + 2, y);
          y += lines.length * 5.5 + 2;
        }
        y += 4;
      }

      // ── Practical Info ──────────────────────────────────────────
      if (activeGeneration.practicalInfo) {
        if (y + 20 > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }

        doc.setFillColor(233, 242, 240); // #E9F2F0
        doc.roundedRect(margin, y, maxWidth, 8, 2, 2, 'F');
        doc.setTextColor(74, 139, 125);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Informations pratiques', margin + 3, y + 5.5);
        y += 12;

        doc.setTextColor(71, 85, 105);
        doc.setFont('helvetica', 'normal');
        const infoLines = doc.splitTextToSize(activeGeneration.practicalInfo, maxWidth);
        doc.text(infoLines, margin, y);
        y += infoLines.length * 5.5 + 6;
      }

      // ── Footer ──────────────────────────────────────────────────
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.setFont('helvetica', 'normal');
        doc.text(
          `Page ${i} / ${totalPages}`,
          pageWidth / 2,
          pageHeight - 8,
          { align: 'center' }
        );
        doc.text(
          new Date().toLocaleDateString('fr-CH'),
          pageWidth - margin,
          pageHeight - 8,
          { align: 'right' }
        );
      }

      // ── Save ────────────────────────────────────────────────────
      doc.save(`annonce-${listingId || 'immobiliere'}.pdf`);

      toast.dismiss(loadingToast);
      toast.success('PDF téléchargé avec succès !');

    } catch (error) {
      toast.dismiss(loadingToast);
      console.error('PDF generation error:', error);
      toast.error('Erreur lors de la génération du PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-5">

      {/* Copy — unchanged */}
      <button
        onClick={handleCopyText}
        disabled={isCopying}
        className={`px-8 py-3.5 bg-white rounded-xl shadow-sm border border-gray-100
          font-bold text-gray-600 flex items-center justify-center gap-3
          transition-all text-sm
          ${isCopying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}
      >
        {isCopying ? (
          <>
            <Loader2 size={18} className="animate-spin text-gray-400" />
            <span>Copie en cours...</span>
          </>
        ) : (
          <>
            {unlocked
              ? <Copy size={18} className="text-gray-400" />
              : <Lock size={18} className="text-gray-300" />
            }
            <span>{unlocked ? 'Copier le texte' : 'Copier (verrouillé)'}</span>
          </>
        )}
      </button>

      {/* PDF */}
      <button
        onClick={handleDownloadPDF}
        disabled={isDownloading}
        className={`px-8 py-3.5 bg-white rounded-2xl shadow-sm border border-gray-100
          font-bold text-gray-600 flex items-center justify-center gap-3
          transition-all text-sm
          ${isDownloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}`}
      >
        {isDownloading ? (
          <>
            <Loader2 size={18} className="animate-spin text-gray-400" />
            <span>Génération...</span>
          </>
        ) : (
          <>
            {unlocked
              ? <Download size={18} className="text-gray-400" />
              : <Lock size={18} className="text-gray-300" />
            }
            <span>{unlocked ? 'Télécharger le PDF' : 'PDF (verrouillé)'}</span>
          </>
        )}
      </button>

    </div>
  );
};

export default ExportActions;