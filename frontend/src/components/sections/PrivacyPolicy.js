import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Mail, Cookie, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      id="privacy-policy"
      className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4 min-h-screen"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-forest/90" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4 sm:mb-6" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-bold text-gold mb-3 sm:mb-4 px-2" data-testid="privacy-policy-title">
            {i18n.language === 'hu' ? 'ADATKEZELÉSI ÉS ADATVÉDELMI TÁJÉKOZTATÓ' : 
             i18n.language === 'el' ? 'ΠΟΛΙΤΙΚΗ ΔΙΑΧΕΙΡΙΣΗΣ ΚΑΙ ΠΡΟΣΤΑΣΙΑΣ ΔΕΔΟΜΕΝΩΝ' :
             i18n.language === 'it' ? 'INFORMATIVA SULLA GESTIONE E PROTEZIONE DEI DATI' :
             'DATA MANAGEMENT AND PRIVACY POLICY'}
          </h1>
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg">
            {i18n.language === 'hu' ? 'Utolsó frissítés: 2026. február 25.' :
             i18n.language === 'el' ? 'Τελευταία ενημέρωση: 25 Φεβρουαρίου 2026' :
             i18n.language === 'it' ? 'Ultimo aggiornamento: 25 febbraio 2026' :
             'Last updated: 25 February 2026'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 space-y-6 sm:space-y-8"
        >
          {/* Introduction */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-4">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-1" />
              <div className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-3 sm:mb-4">1. Introduction</h2>
                <p className="mb-3">
                  This Data Management and Privacy Policy (hereinafter: "Policy") defines the manner and conditions of processing personal data for visitors, subscribers, and customers of the website operated by [Company Name] (hereinafter: "Data Controller").
                </p>
                <div className="bg-black/20 p-4 rounded-lg mb-3">
                  <p className="font-semibold text-gold mb-2">Data Controller details:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Company name: [Company Name]</li>
                    <li>• Registered address: [Company Address]</li>
                    <li>• Company registration number: [Registration Number]</li>
                    <li>• Tax number: [Tax Number]</li>
                    <li>• Contact email: contact@fairygarden4u.com</li>
                    <li>• Phone number: [phone number]</li>
                    <li>• Website: https://fairygarden4u.com</li>
                  </ul>
                </div>
                <p>
                  The purpose of this Policy is to ensure the protection of personal data and compliance with the General Data Protection Regulation (GDPR) of the European Union, as well as applicable Hungarian legislation.
                </p>
              </div>
            </div>
          </div>

          {/* Legal Background */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-4">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-1" />
              <div className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-3 sm:mb-4">2. Legal Background</h2>
                <p className="mb-2">Data processing is carried out in accordance with the following legislation:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>EU Regulation 2016/679 (GDPR) – Regulation of the European Parliament and of the Council on the protection of individuals with regard to the processing of personal data.</li>
                  <li>Act CXII of 2011 – On the Right to Informational Self-Determination and Freedom of Information, containing national rules on personal data processing.</li>
                  <li>Act C of 2000 – On Accounting, particularly regarding invoicing and data transfer obligations.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Definitions */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-4">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-1" />
              <div className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-3 sm:mb-4">3. Definitions</h2>
                <ul className="space-y-2">
                  <li><strong className="text-gold">Personal data:</strong> Any information on the basis of which a natural person can be directly or indirectly identified (e.g. name, email address, IP address).</li>
                  <li><strong className="text-gold">Data Controller:</strong> The person or organisation that determines the purposes and means of processing personal data – in this case, [Company Name].</li>
                  <li><strong className="text-gold">Data Processor:</strong> A third party that processes personal data on behalf of the Data Controller (e.g. hosting provider, newsletter sending system).</li>
                  <li><strong className="text-gold">Data Subject (User):</strong> Any natural person whose personal data we process.</li>
                  <li><strong className="text-gold">Consent:</strong> The freely given, specific, informed, and unambiguous indication of the data subject's agreement to the processing of their personal data.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-4">
              <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-1" />
              <div className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-3 sm:mb-4">5. Cookies</h2>
                <p className="mb-3">
                  A cookie is a small text file placed on the visitor's device by the website. It enables the website to remember the user's preferences and improve the browsing experience.
                </p>
                <p className="mb-4 italic text-gold-light">
                  Important: Analytical, functional, and advertising cookies require prior, active consent.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-lg">
                    <h3 className="font-bold text-gold mb-2">Strictly Necessary Cookies</h3>
                    <p className="text-sm mb-2">Essential for basic functioning. No consent required.</p>
                    <p className="text-sm"><strong>Legal basis:</strong> Legitimate interest (GDPR Article 6(1)(f))</p>
                    <p className="text-sm"><strong>Retention:</strong> Until end of session or max 1 year</p>
                  </div>

                  <div className="bg-black/20 p-4 rounded-lg">
                    <h3 className="font-bold text-gold mb-2">Functional Cookies</h3>
                    <p className="text-sm mb-2">Enable additional features (social sharing, feedback, embedded content).</p>
                    <p className="text-sm"><strong>Legal basis:</strong> Consent (GDPR Article 6(1)(a))</p>
                    <p className="text-sm"><strong>Retention:</strong> Maximum 1 year</p>
                  </div>

                  <div className="bg-black/20 p-4 rounded-lg">
                    <h3 className="font-bold text-gold mb-2">Analytical Cookies</h3>
                    <p className="text-sm mb-2">Track visitor interactions for website improvement (Google Analytics).</p>
                    <p className="text-sm"><strong>Legal basis:</strong> Consent (GDPR Article 6(1)(a))</p>
                    <p className="text-sm"><strong>Retention:</strong> Maximum 2 years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-4">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-1" />
              <div className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-3 sm:mb-4">6. Newsletter Subscription</h2>
                <div className="bg-black/20 p-4 rounded-lg space-y-2 text-sm">
                  <p><strong className="text-gold">Data processed:</strong> Name, email address</p>
                  <p><strong className="text-gold">Purpose:</strong> Sending newsletters, promotions, and informational messages</p>
                  <p><strong className="text-gold">Legal basis:</strong> Voluntary consent (GDPR Article 6(1)(a))</p>
                  <p><strong className="text-gold">Retention period:</strong> Until unsubscription or withdrawal of consent</p>
                  <p><strong className="text-gold">Unsubscription:</strong> Via the unsubscribe link in every newsletter, or through newsletter@fairygarden4u.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-4">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-1" />
              <div className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-3 sm:mb-4">8. Data Security</h2>
                <p className="mb-3">The Data Controller applies the following technical and organisational measures to protect personal data:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL/TLS encryption on the website</li>
                  <li>Password-protected systems and access controls</li>
                  <li>Regular data backups</li>
                  <li>Access to data restricted to authorised personnel only</li>
                </ul>
                <p className="mt-3">
                  In the event of a data breach, the Data Controller will notify the supervisory authority within 72 hours and, where necessary, will also notify the affected data subjects.
                </p>
              </div>
            </div>
          </div>

          {/* Rights */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-4">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-gold flex-shrink-0 mt-1" />
              <div className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
                <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-3 sm:mb-4">9. Rights of Data Subjects</h2>
                <p className="mb-3">Under the GDPR, you have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-gold">Right of access (Article 15):</strong> Request information about your data</li>
                  <li><strong className="text-gold">Right to rectification (Article 16):</strong> Request correction of inaccurate data</li>
                  <li><strong className="text-gold">Right to erasure (Article 17):</strong> Request deletion of your data</li>
                  <li><strong className="text-gold">Right to restriction (Article 18):</strong> Request restriction of processing</li>
                  <li><strong className="text-gold">Right to data portability (Article 20):</strong> Receive your data in a structured format</li>
                  <li><strong className="text-gold">Right to object (Article 21):</strong> Object to processing</li>
                  <li><strong className="text-gold">Right to withdraw consent:</strong> Withdraw consent at any time</li>
                </ul>
                <div className="mt-4 bg-gold/20 p-4 rounded-lg">
                  <p className="text-sm">To exercise your rights, contact us at:</p>
                  <p className="text-sm mt-2"><strong>Email:</strong> contact@fairygarden4u.com</p>
                  <p className="text-sm"><strong>Response time:</strong> Within 30 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Complaints */}
          <div className="space-y-3 sm:space-y-4">
            <div className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-3 sm:mb-4">10. Complaints and Supervisory Authority</h2>
              <p className="mb-3">If you believe that the processing of your personal data infringes GDPR provisions, you have the right to lodge a complaint with:</p>
              <div className="bg-black/20 p-4 rounded-lg">
                <p className="font-semibold text-gold mb-2">National Authority for Data Protection and Freedom of Information (NAIH)</p>
                <ul className="space-y-1 text-sm">
                  <li>• Address: Falk Miksa utca 9-11, Budapest, 1055, Hungary</li>
                  <li>• Phone: +36 (1) 391-1400</li>
                  <li>• Email: ugyfelszolgalat@naih.hu</li>
                  <li>• Website: www.naih.hu</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gold/20 text-center">
            <p className="text-cream/80 font-montserrat text-sm">
              This Policy is effective from: <strong className="text-gold">25 February 2026</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
