import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Eye, Mail, Cookie, FileText, X } from 'lucide-react';

// Privacy Modal Component
export const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-4xl bg-forest border-2 border-gold/50 rounded-2xl shadow-2xl flex flex-col"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest border border-gold/30 text-gold hover:bg-gold hover:text-forest transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 lg:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-2">
                  PRIVACY POLICY AND DATA MANAGEMENT POLICY
                </h2>
                <p className="text-cream/70 font-montserrat text-sm">
                  Website: www.fairygarden4u.com | Version: 1.0
                </p>
              </div>
              
              {/* Content */}
              <div className="font-montserrat text-cream/90 space-y-6 text-sm leading-relaxed">
                
                {/* Section 1 */}
                <div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                        1. INTRODUCTION AND DATA CONTROLLER INFORMATION
                      </h3>
                      <div className="text-cream/80 space-y-2 text-justify">
                        <p>This Privacy Policy and Data Management Policy describes the data management practices of the Data Controller operating the website www.fairygarden4u.com, in accordance with Regulation (EU) 2016/679 (General Data Protection Regulation - GDPR), the Processing of Personal Data (Protection of Individuals) Law of 2018 (Law 125(I)/2018) of the Republic of Cyprus, and all other applicable data protection legislation.</p>
                        
                        <div className="bg-black/20 p-4 rounded-lg my-3">
                          <p className="font-semibold text-gold mb-2">Data Controller details:</p>
                          <ul className="space-y-1 text-sm">
                            <li>• Company name: Fairygarden For You Ltd</li>
                            <li>• Registered office: Cyprus</li>
                            <li>• Email address: info@fairygarden4u.com</li>
                            <li>• Website: www.fairygarden4u.com</li>
                          </ul>
                        </div>
                        
                        <p>The Data Controller is committed to protecting the personal data of all individuals who visit the Website, place orders, create accounts, subscribe to newsletters, or otherwise interact with the Website. This Policy provides transparent information about what data is collected, how it is used, the legal bases for processing, data retention periods, and the rights of data subjects.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                        2. GOVERNING LEGISLATION
                      </h3>
                      <div className="text-cream/80 space-y-2 text-justify">
                        <p>This Policy is governed by and shall be interpreted in accordance with the following legislation:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li><strong>EU Regulation 2016/679 (GDPR)</strong> – Regulation of the European Parliament and of the Council on the protection of individuals with regard to the processing of personal data.</li>
                          <li><strong>Cyprus Law 125(I)/2018</strong> – Processing of Personal Data (Protection of Individuals) Law.</li>
                          <li><strong>EU Directive 2002/58/EC (ePrivacy Directive)</strong> – concerning the processing of personal data and the protection of privacy in the electronic communications sector.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3 - Definitions */}
                <div>
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                        3. DEFINITIONS
                      </h3>
                      <div className="text-cream/80 space-y-2 text-justify">
                        <ul className="space-y-2">
                          <li><strong className="text-gold">Personal data:</strong> Any information relating to an identified or identifiable natural person.</li>
                          <li><strong className="text-gold">Data Controller:</strong> The natural or legal person which determines the purposes and means of the processing of personal data.</li>
                          <li><strong className="text-gold">Data Processor:</strong> A natural or legal person which processes personal data on behalf of the Data Controller.</li>
                          <li><strong className="text-gold">Data Subject:</strong> Any natural person whose personal data is being collected, held, or processed.</li>
                          <li><strong className="text-gold">Consent:</strong> Any freely given, specific, informed, and unambiguous indication of the data subject's wishes.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4 - Data Collection */}
                <div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                        4. DATA WE COLLECT
                      </h3>
                      <div className="text-cream/80 space-y-3 text-justify">
                        <p>We may collect the following categories of personal data:</p>
                        <div className="bg-black/20 p-4 rounded-lg space-y-2">
                          <p><strong className="text-gold">Order processing:</strong> Name, email address, telephone number, delivery address, billing address, payment information</p>
                          <p><strong className="text-gold">Account registration:</strong> Name, email address, password (encrypted)</p>
                          <p><strong className="text-gold">Newsletter subscription:</strong> Name, email address</p>
                          <p><strong className="text-gold">Workshop registration:</strong> Name, email address, telephone number, participant names</p>
                          <p><strong className="text-gold">Custom order inquiries:</strong> Name, email address, design preferences</p>
                          <p><strong className="text-gold">Website usage:</strong> IP address, browser type, device information, pages visited (via cookies)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 5 - Cookies */}
                <div>
                  <div className="flex items-start gap-3">
                    <Cookie className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                        5. COOKIES
                      </h3>
                      <div className="text-cream/80 space-y-3 text-justify">
                        <p>We use cookies to enhance your browsing experience:</p>
                        <div className="space-y-3">
                          <div className="bg-black/20 p-3 rounded-lg">
                            <p className="font-semibold text-gold">Strictly Necessary Cookies</p>
                            <p className="text-sm">Essential for website functionality. No consent required.</p>
                          </div>
                          <div className="bg-black/20 p-3 rounded-lg">
                            <p className="font-semibold text-gold">Analytical Cookies (Google Analytics)</p>
                            <p className="text-sm">Track visitor interactions. Require consent. Retention: max 2 years.</p>
                          </div>
                          <div className="bg-black/20 p-3 rounded-lg">
                            <p className="font-semibold text-gold">Functional Cookies</p>
                            <p className="text-sm">Remember preferences. Require consent. Retention: max 1 year.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 6 - Legal Bases */}
                <div>
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                        6. LEGAL BASES FOR PROCESSING
                      </h3>
                      <div className="text-cream/80 space-y-2 text-justify">
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li><strong>Contract performance (Art. 6(1)(b) GDPR):</strong> Processing orders and deliveries</li>
                          <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> Newsletter, marketing, analytical cookies</li>
                          <li><strong>Legal obligation (Art. 6(1)(c) GDPR):</strong> Tax and accounting requirements</li>
                          <li><strong>Legitimate interest (Art. 6(1)(f) GDPR):</strong> Website security, fraud prevention</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 7 - Data Security */}
                <div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                        7. DATA SECURITY
                      </h3>
                      <div className="text-cream/80 space-y-2 text-justify">
                        <p>We implement appropriate technical and organisational measures:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>SSL/TLS encryption on all pages</li>
                          <li>Secure payment processing (PCI DSS compliant)</li>
                          <li>Password-protected access controls</li>
                          <li>Regular security audits and updates</li>
                          <li>Data breach notification within 72 hours</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 8 - Your Rights */}
                <div>
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                        8. YOUR RIGHTS
                      </h3>
                      <div className="text-cream/80 space-y-2 text-justify">
                        <p>Under GDPR, you have the following rights:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong className="text-gold">Right of access</strong> (Art. 15) – Request information about your data</li>
                          <li><strong className="text-gold">Right to rectification</strong> (Art. 16) – Correct inaccurate data</li>
                          <li><strong className="text-gold">Right to erasure</strong> (Art. 17) – Request deletion of your data</li>
                          <li><strong className="text-gold">Right to restriction</strong> (Art. 18) – Limit how we use your data</li>
                          <li><strong className="text-gold">Right to portability</strong> (Art. 20) – Receive your data in a portable format</li>
                          <li><strong className="text-gold">Right to object</strong> (Art. 21) – Object to certain processing</li>
                          <li><strong className="text-gold">Right to withdraw consent</strong> – At any time for consent-based processing</li>
                        </ul>
                        <div className="bg-gold/20 p-4 rounded-lg mt-3">
                          <p className="text-sm">To exercise your rights, contact: <strong>info@fairygarden4u.com</strong></p>
                          <p className="text-sm">Response time: Within 30 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 9 - Supervisory Authority */}
                <div>
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                        9. COMPLAINTS AND SUPERVISORY AUTHORITY
                      </h3>
                      <div className="text-cream/80 space-y-2 text-justify">
                        <p>If you believe your data protection rights have been violated, you may lodge a complaint with:</p>
                        <div className="bg-black/20 p-4 rounded-lg">
                          <p className="font-semibold text-gold mb-2">Commissioner for Personal Data Protection (Cyprus)</p>
                          <ul className="space-y-1 text-sm">
                            <li>• Address: 15 Kypranoros Street, 1061 Nicosia, Cyprus</li>
                            <li>• Website: www.dataprotection.gov.cy</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 10 - Contact */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    10. CONTACT US
                  </h3>
                  <div className="text-cream/80">
                    <p>For any questions about this Privacy Policy:</p>
                    <p className="mt-2">Email: <strong className="text-gold">info@fairygarden4u.com</strong></p>
                    <p>Website: <strong className="text-gold">www.fairygarden4u.com</strong></p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-center pt-6 border-t border-gold/20">
                  <p className="text-cream/50 text-xs">
                    Last updated: March 2026
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Placeholder section for navigation (invisible)
const PrivacyPolicy = () => {
  return (
    <div id="privacy-policy" className="hidden" />
  );
};

export default PrivacyPolicy;
