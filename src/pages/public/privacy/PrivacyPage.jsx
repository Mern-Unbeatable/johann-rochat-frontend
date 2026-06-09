import React from 'react';
import { ShieldCheck, Mail } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className='min-h-screen bg-[#FAF9F7] py-8 md:py-16 px-4 font-sans text-gray-800'>
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-4xl font-semibold md:font-bold text-gray-900 mb-1">Politique de confidentialité</h1>
          <p className="text-gray-500 text-base mt-2">Dernière mise à jour : 11 mai 2026</p>
        </header>

        <div className="space-y-6">
          
          {/* Section 1: Introduction */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-2">Introduction</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  La présente politique de confidentialité explique comment Casagen collecte, utilise et protège les données personnelles des utilisateurs du site et de la plateforme.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  En utilisant les services de Casagen, vous acceptez la présente politique de confidentialité.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Données collectées */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">2</div>
              <div className="w-full">
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-4">Données collectées</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-base mb-2">Données de compte</p>
                    <ul className="list-disc ml-5 space-y-1 text-gray-600 text-base">
                      <li>nom</li>
                      <li>adresse email</li>
                      <li>mot de passe chiffré</li>
                      <li>informations de connexion</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 text-base mb-2">Données liées aux annonces immobilières</p>
                    <ul className="list-disc ml-5 space-y-1 text-gray-600 text-base">
                      <li>descriptions de biens</li>
                      <li>caractéristiques des logements</li>
                      <li>contenus saisis par l'utilisateur</li>
                      <li>préférences de génération</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 text-base mb-2">Données techniques</p>
                    <ul className="list-disc ml-5 space-y-1 text-gray-600 text-base">
                      <li>adresse IP</li>
                      <li>navigateur</li>
                      <li>appareil utilisé</li>
                      <li>logs techniques</li>
                      <li>cookies nécessaires au fonctionnement du site</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900 text-base mb-2">Données de paiement</p>
                    <p className="text-gray-600 text-base mb-2">Les paiements sont traités par Stripe.</p>
                    <p className="text-gray-600 text-base">Casagen ne stocke pas les informations complètes de carte bancaire.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Utilisation des données */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Utilisation des données</h3>
                <p className="text-gray-600 text-base font-medium mb-3">Les données collectées sont utilisées pour :</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base">
                  <li>fournir les services de génération d'annonces</li>
                  <li>gérer les comptes utilisateurs</li>
                  <li>traiter les paiements</li>
                  <li>améliorer la plateforme</li>
                  <li>assurer la sécurité du service</li>
                  <li>répondre aux demandes de support</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Intelligence artificielle */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Intelligence artificielle</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Les contenus transmis par les utilisateurs peuvent être traités par des systèmes d'intelligence artificielle afin de générer des annonces immobilières.
                </p>
                <p className="text-gray-800 text-base">
                  L'utilisateur s'engage à ne pas transmettre de données sensibles, confidentielles ou illégales via la plateforme.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Hébergement et sous-traitants */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">5</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Hébergement et sous-traitants</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Les données peuvent être traitées par des prestataires techniques nécessaires au fonctionnement du service, notamment :
                </p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base mb-3">
                  <li>Hostinger pour l'hébergement</li>
                  <li>Stripe pour les paiements</li>
                </ul>
                <p className="text-gray-600 text-base leading-relaxed">
                  Ces prestataires appliquent leurs propres mesures de sécurité et politiques de confidentialité.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Conservation des données */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">6</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Conservation des données</h3>
                <p className="text-gray-600 text-base font-medium mb-3">Les données sont conservées aussi longtemps que nécessaire pour :</p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base mb-3">
                  <li>fournir le service</li>
                  <li>respecter les obligations légales</li>
                  <li>résoudre d'éventuels litiges</li>
                </ul>
                <p className="text-gray-600 text-base leading-relaxed">
                  L'utilisateur peut demander la suppression de son compte à tout moment.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Sécurité */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">7</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Sécurité</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Casagen met en œuvre des mesures techniques et organisationnelles raisonnables afin de protéger les données personnelles contre :
                </p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base mb-3">
                  <li>l'accès non autorisé</li>
                  <li>la perte</li>
                  <li>la divulgation</li>
                  <li>l'altération</li>
                </ul>
                <p className="text-gray-800 text-base">
                  Toutefois, aucune transmission sur Internet ne peut être garantie comme totalement sécurisée.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Droits des utilisateurs */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">8</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Droits des utilisateurs</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Conformément au droit suisse applicable en matière de protection des données, les utilisateurs peuvent demander :
                </p>
                <ul className="list-disc ml-5 space-y-2 text-gray-600 text-base mb-4">
                  <li>l'accès à leurs données</li>
                  <li>la rectification de leurs données</li>
                  <li>la suppression de leurs données</li>
                  <li>des informations sur leur traitement</li>
                </ul>
                <p className="text-gray-600 text-base font-medium mb-2">Toute demande peut être adressée à :</p>
                <p className="text-gray-900 font-medium text-base">
                  <a href="mailto:info@casagen.ch" className="text-primary hover:underline">info@casagen.ch</a>
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: Cookies */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">9</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-3">Cookies</h3>
                <p className="text-gray-600 text-base leading-relaxed mb-3">
                  Le site peut utiliser des cookies nécessaires au bon fonctionnement de la plateforme.
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Des cookies techniques ou analytiques peuvent également être utilisés afin d'améliorer l'expérience utilisateur.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10: Droit applicable */}
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="bg-[#3A7D6C33] text-primary h-8 w-8 rounded flex items-center justify-center text-base font-[700] shrink-0">10</div>
              <div>
                <h3 className="font-semibold text-xl md:text-2xl text-gray-900 mb-2">Droit applicable</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  La présente politique de confidentialité est soumise au droit suisse.
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
                        Pour toute question concernant ces mentions légales, veuillez contacter :
                        <a href="mailto:info@casagen.ch" className="text-white underline hover:no-underline">
                          info@casagen.ch
                        </a>
                      </p>
          
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 h-8 w-8 shrink-0 text-white md:mt-0" />
                        <p className="text-base leading-relaxed text-white">
                           Cette politique de confidentialité est entrée en vigueur le 11 mai 2026 et est conforme à la réglementation suisse de protection des données.
                        </p>
                      </div>
                    </div>
          {/** */}
        

        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
