import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className='min-h-screen bg-[#FAF9F7] py-8 md:py-16 px-4 font-sans text-gray-800'>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-4xl font-semibold md:font-bold text-gray-900 mb-1">Conditions générales</h1>
          <p className="text-gray-500 text-base mt-2">Dernière mise à jour : 11 mai 2026</p>
        </header>

        <div className="space-y-6">
          
          {/* Section 1: Objet */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-2">Objet</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Les présentes conditions générales régissent l'utilisation des services proposés par Casagen.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Casagen fournit une plateforme permettant la génération assistée par intelligence artificielle d'annonces immobilières professionnelles.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Acceptation */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-2">Acceptation</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  En créant un compte ou en utilisant les services de Casagen, l'utilisateur accepte les présentes conditions générales.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Services proposés */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Services proposés</h3>
                <p className="text-gray-600 text-base font-medium mb-3">Casagen propose notamment :</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base mb-3">
                  <li>la génération automatique d'annonces immobilières</li>
                  <li>l'assistance rédactionnelle par intelligence artificielle</li>
                  <li>la validation humaine optionnelle des contenus générés</li>
                </ul>
                <p className="text-gray-600 text-base leading-relaxed">
                  Les fonctionnalités proposées peuvent évoluer à tout moment.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Compte utilisateur */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Compte utilisateur</h3>
                <p className="text-gray-600 text-base font-medium mb-3">L'utilisateur est responsable :</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base mb-3">
                  <li>des informations fournies lors de l'inscription</li>
                  <li>de la confidentialité de ses identifiants</li>
                  <li>de l'utilisation de son compte</li>
                </ul>
                <p className="text-gray-600 text-base leading-relaxed">
                  Casagen se réserve le droit de suspendre un compte en cas d'utilisation abusive ou contraire aux présentes conditions.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Responsabilité des contenus */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">5</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Responsabilité des contenus</h3>
                <p className="text-gray-600 text-base font-medium mb-3">L'utilisateur demeure seul responsable :</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base mb-4">
                  <li>des données transmises</li>
                  <li>des annonces publiées</li>
                  <li>de la conformité légale des contenus diffusés</li>
                </ul>
                <p className="text-gray-600 text-base leading-relaxed mb-4">
                  Les contenus générés par intelligence artificielle doivent être vérifiés avant publication.
                </p>
                <p className="text-gray-600 text-base font-medium mb-3">Casagen ne garantit pas :</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base">
                  <li>l'exactitude des contenus générés</li>
                  <li>l'absence d'erreurs</li>
                  <li>la conformité réglementaire des annonces</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Paiement */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">6</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Paiement</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Les paiements sont traités via Stripe.
                </p>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Les tarifs affichés sur la plateforme peuvent être modifiés à tout moment.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Sauf indication contraire, les paiements effectués ne sont pas remboursables après utilisation du service.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Propriété intellectuelle */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">7</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Propriété intellectuelle</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Les contenus générés via la plateforme peuvent être utilisés par l'utilisateur dans le cadre de ses activités immobilières.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  L'utilisateur garantit disposer des droits nécessaires sur les contenus transmis à Casagen.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Disponibilité du service */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">8</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Disponibilité du service</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Casagen s'efforce d'assurer un accès continu à la plateforme, sans garantie d'absence d'interruption ou d'erreur technique.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Des opérations de maintenance peuvent être effectuées à tout moment.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: Limitation de responsabilité */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">9</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Limitation de responsabilité</h3>
                <p className="text-gray-600 text-base font-medium mb-3">Dans les limites autorisées par la loi, Casagen ne pourra être tenu responsable :</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base">
                  <li>des pertes indirectes</li>
                  <li>des erreurs de contenu</li>
                  <li>des décisions prises sur la base des annonces générées</li>
                  <li>d'un dommage lié à une interruption du service</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 10: Résiliation */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">10</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Résiliation</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  L'utilisateur peut cesser d'utiliser le service à tout moment.
                </p>
                <p className="text-gray-600 text-base font-medium mb-3">Casagen peut suspendre ou supprimer un compte en cas :</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base">
                  <li>de non-respect des présentes conditions</li>
                  <li>d'utilisation frauduleuse</li>
                  <li>d'activité illégale</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 11: Modification des conditions */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">11</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Modification des conditions</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Casagen peut modifier les présentes conditions générales à tout moment.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  La version en vigueur est celle publiée sur le site.
                </p>
              </div>
            </div>
          </section>

          {/* Section 12: Droit applicable */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">12</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Droit applicable et for juridique</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Les présentes conditions générales sont soumises au droit suisse.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Tout litige relève de la compétence des tribunaux suisses.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Footer Card */}
       <div className="bg-primary mt-12 rounded-xl p-8 text-white shadow-lg">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-primary rounded-lg bg-white p-2">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Contactez-nous</h3>
            </div>
            <p className="mb-4 text-base text-[#EBF2F0]">
              Pour toute question concernant ces conditions générales, veuillez contacter :
              <a href="mailto:info@casagen.ch" className="text-white underline hover:no-underline">
                info@casagen.ch
              </a>
            </p>

            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-8 w-8 shrink-0 text-white md:mt-0" />
              <p className="text-base leading-relaxed text-white">
                Ces conditions générales sont entrées en vigueur le 11 mai 2026.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
