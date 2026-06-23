import React from 'react';
import { ShieldCheck, Mail, Building2, Zap, Server, Copyright, AlertCircle } from 'lucide-react';

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-[#FFFCF6] px-4 py-8 font-sans text-gray-800 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-6">
          <h1 className="mb-1 text-2xl font-semibold text-gray-900 md:text-4xl md:font-bold">
            Mentions légales
          </h1>
          <p className="mt-2 text-base text-gray-500">Dernière mise à jour : 11 mai 2026</p>
        </header>

        <div className="space-y-6">
          {/* Section 1: Éditeur du site */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#3A7D6C33] text-base font-[700]">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">
                  Éditeur du site
                </h3>
                <p className="mb-3 text-base leading-relaxed text-gray-600">
                  Le site Casagen est édité par :
                </p>
                <div className="rounded border border-[#F9F3E2] bg-[#F9F3E2] p-4">
                  <p className="text-base font-medium text-gray-900">Casagen</p>
                  <p className="text-base text-gray-600">
                    Email :{' '}
                    <a href="mailto:info@casagen.ch" className="text-primary hover:underline">
                      info@casagen.ch
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Activité */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#3A7D6C33] text-base font-[700]">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">Activité</h3>
                <p className="text-base leading-relaxed text-gray-600">
                  Casagen propose un service de génération d'annonces immobilières assistée par
                  intelligence artificielle, ainsi qu'un service optionnel de validation humaine des
                  contenus générés.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Hébergement */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#3A7D6C33] text-base font-[700]">
                <Server className="h-4 w-4" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">
                  Hébergement
                </h3>
                <p className="text-base leading-relaxed text-gray-600">Le site est hébergé par :    <a href="https://www.hostinger.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 underline">
                    Hostinger
                  </a></p>
                <p className="mt-2 text-base font-medium text-gray-900">
               
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Propriété intellectuelle */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#3A7D6C33] text-base font-[700]">
                <Copyright className="h-4 w-4" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">
                  Propriété intellectuelle
                </h3>
                <p className="mb-3 text-base leading-relaxed text-gray-600">
                  L'ensemble du contenu présent sur le site Casagen, incluant notamment les textes,
                  éléments graphiques, logos, interfaces et fonctionnalités, est protégé par les
                  lois applicables en matière de propriété intellectuelle.
                </p>
                <p className="text-base leading-relaxed text-gray-600">
                  Toute reproduction, diffusion ou utilisation non autorisée du contenu du site est
                  interdite sans accord préalable écrit.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Responsabilité */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#3A7D6C33] text-base font-[700]">
                <AlertCircle className="h-4 w-4" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 md:text-2xl">
                  Responsabilité
                </h3>
                <p className="mb-4 text-base leading-relaxed text-gray-600">
                  Casagen met tout en œuvre pour fournir un service fiable et de qualité. Toutefois,
                  les contenus générés par intelligence artificielle sont fournis à titre
                  d'assistance rédactionnelle uniquement.
                </p>
                <p className="mb-3 text-base font-medium text-gray-600">
                  L'utilisateur demeure seul responsable :
                </p>
                <ul className="ml-5 list-disc space-y-2 text-base text-gray-600">
                  <li>des informations transmises</li>
                  <li>de la vérification des contenus générés</li>
                  <li>de la publication finale des annonces immobilières</li>
                </ul>
                <div className="mt-4 rounded border border-[#FED7D7] bg-[#FEE2E2] p-4">
                  <p className="text-base text-gray-800">
                    Casagen ne garantit pas l'exactitude, l'exhaustivité ou la conformité juridique
                    des annonces générées.
                  </p>
                </div>
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
              Pour toute question concernant ces mentions légales, veuillez contacter :
              <a href="mailto:info@casagen.ch" className="text-white underline hover:no-underline">
                info@casagen.ch
              </a>
            </p>

            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-8 w-8 shrink-0 text-white md:mt-0" />
              <p className="text-base leading-relaxed text-white">
                Ces mentions légales sont entrées en vigueur le 11 mai 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
