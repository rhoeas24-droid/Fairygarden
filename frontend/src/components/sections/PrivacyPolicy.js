import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X } from 'lucide-react';

// Privacy Modal Component - FULL UNABBREVIATED TEXT
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
          data-testid="privacy-modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-4xl bg-forest border-2 border-gold/50 rounded-2xl shadow-2xl flex flex-col"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
            data-testid="privacy-modal-content"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest border border-gold/30 text-gold hover:bg-gold hover:text-forest transition-all"
              data-testid="privacy-modal-close"
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
                  Website: www.fairygarden4u.com
                </p>
                <p className="text-cream/50 font-montserrat text-xs mt-1">
                  Effective date: [INSERT DATE] | Last updated: [INSERT DATE] | Version: 1.0
                </p>
              </div>
              
              {/* Full Content */}
              <div className="font-montserrat text-cream/90 space-y-6 text-sm leading-relaxed">
                
                {/* Section 1 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    1. INTRODUCTION AND DATA CONTROLLER INFORMATION
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>This Privacy Policy and Data Management Policy (hereinafter: "Policy") describes the data management practices of the Data Controller operating the website www.fairygarden4u.com (hereinafter: "Website"), in accordance with Regulation (EU) 2016/679 of the European Parliament and of the Council (General Data Protection Regulation, hereinafter: "GDPR"), the Processing of Personal Data (Protection of Individuals) Law of 2018 (Law 125(I)/2018) of the Republic of Cyprus, and all other applicable data protection legislation.</p>
                    
                    <div className="bg-black/20 p-4 rounded-lg my-3 overflow-x-auto">
                      <table className="w-full text-sm">
                        <tbody>
                          <tr><td className="text-gold py-1 pr-4">Company name</td><td>[INSERT FULL LEGAL NAME]</td></tr>
                          <tr><td className="text-gold py-1 pr-4">Registered office</td><td>[INSERT REGISTERED ADDRESS], Cyprus</td></tr>
                          <tr><td className="text-gold py-1 pr-4">Company registration number</td><td>[INSERT REGISTRATION NUMBER]</td></tr>
                          <tr><td className="text-gold py-1 pr-4">VAT identification number</td><td>CY[INSERT VAT NUMBER]</td></tr>
                          <tr><td className="text-gold py-1 pr-4">Email address</td><td>[INSERT EMAIL ADDRESS]</td></tr>
                          <tr><td className="text-gold py-1 pr-4">Telephone</td><td>[INSERT PHONE NUMBER]</td></tr>
                          <tr><td className="text-gold py-1 pr-4">Website</td><td>www.fairygarden4u.com</td></tr>
                          <tr><td className="text-gold py-1 pr-4">Data Protection Officer</td><td>[INSERT NAME AND CONTACT DETAILS, OR STATE "Not required under Article 37 GDPR based on the nature and scale of processing activities"]</td></tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <p>The Data Controller is committed to protecting the personal data of all individuals who visit the Website, place orders, create accounts, subscribe to newsletters, or otherwise interact with the Website. This Policy provides transparent information about what data is collected, how it is used, the legal bases for processing, data retention periods, and the rights of data subjects.</p>
                  </div>
                </section>

                {/* Section 2 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    2. GOVERNING LEGISLATION
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>This Policy is governed by and shall be interpreted in accordance with the following legislation:</p>
                    <div className="bg-black/20 p-4 rounded-lg my-3 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gold/30">
                            <th className="text-gold text-left py-2">Legislation</th>
                            <th className="text-gold text-left py-2">Reference</th>
                            <th className="text-gold text-left py-2">Scope</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="py-2 pr-2">General Data Protection Regulation</td><td>Regulation (EU) 2016/679</td><td>EU-wide data protection</td></tr>
                          <tr><td className="py-2 pr-2">Cyprus Data Protection Law</td><td>Law 125(I)/2018 (as amended)</td><td>National GDPR implementation</td></tr>
                          <tr><td className="py-2 pr-2">Cyprus ePrivacy Law</td><td>Law 112(I)/2004, Part 14</td><td>Cookies, electronic marketing</td></tr>
                          <tr><td className="py-2 pr-2">Cyprus Electronic Commerce Law</td><td>Law 156(I)/2004 (as amended)</td><td>E-commerce obligations</td></tr>
                          <tr><td className="py-2 pr-2">Cyprus Consumer Rights Law</td><td>Law 133(I)/2013</td><td>Consumer protection for distance selling</td></tr>
                          <tr><td className="py-2 pr-2">Cyprus Consumer Protection Law</td><td>Law 112(I)/2021</td><td>Unfair commercial practices, price transparency</td></tr>
                          <tr><td className="py-2 pr-2">EU ePrivacy Directive</td><td>Directive 2002/58/EC (as amended)</td><td>Electronic communications privacy</td></tr>
                          <tr><td className="py-2 pr-2">UK General Data Protection Regulation</td><td>UK GDPR + Data Protection Act 2018</td><td>UK data subjects</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>

                {/* Section 3 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    3. DEFINITIONS
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>For the purposes of this Policy:</p>
                    <ul className="space-y-2 mt-2">
                      <li><strong className="text-gold">Personal data</strong> means any information relating to an identified or identifiable natural person ("data subject"), as defined in Article 4(1) GDPR.</li>
                      <li><strong className="text-gold">Processing</strong> means any operation performed on personal data, whether or not by automated means, as defined in Article 4(2) GDPR.</li>
                      <li><strong className="text-gold">Data Controller</strong> means the natural or legal person which determines the purposes and means of the processing of personal data — in this case, [INSERT COMPANY NAME].</li>
                      <li><strong className="text-gold">Data Processor</strong> means a natural or legal person which processes personal data on behalf of the Data Controller.</li>
                      <li><strong className="text-gold">Consent</strong> means any freely given, specific, informed, and unambiguous indication of the data subject's wishes, as defined in Article 4(11) GDPR.</li>
                    </ul>
                    <p className="mt-3">Under Cyprus law, the age of digital consent is <strong>14 years</strong> (Article 8 of Law 125(I)/2018).</p>
                    <p><strong className="text-gold">Supervisory Authority</strong> means the Commissioner for the Protection of Personal Data of the Republic of Cyprus (Επίτροπος Προστασίας Δεδομένων Προσωπικού Χαρακτήρα).</p>
                  </div>
                </section>

                {/* Section 4 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    4. PRINCIPLES OF DATA PROCESSING
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>The Data Controller processes personal data in compliance with the principles set out in Article 5 GDPR and the provisions of Cyprus Law 125(I)/2018:</p>
                    <ul className="space-y-2 mt-2">
                      <li><strong className="text-gold">Lawfulness, fairness, and transparency</strong> — Data is processed lawfully, fairly, and in a transparent manner.</li>
                      <li><strong className="text-gold">Purpose limitation</strong> — Data is collected for specified, explicit, and legitimate purposes and not further processed in a manner incompatible with those purposes.</li>
                      <li><strong className="text-gold">Data minimisation</strong> — Data collected is adequate, relevant, and limited to what is necessary.</li>
                      <li><strong className="text-gold">Accuracy</strong> — Data is accurate and kept up to date; inaccurate data is erased or rectified without delay.</li>
                      <li><strong className="text-gold">Storage limitation</strong> — Data is kept in a form that permits identification of data subjects for no longer than necessary.</li>
                      <li><strong className="text-gold">Integrity and confidentiality</strong> — Data is processed in a manner that ensures appropriate security.</li>
                      <li><strong className="text-gold">Accountability</strong> — The Data Controller is responsible for and able to demonstrate compliance with these principles.</li>
                    </ul>
                  </div>
                </section>

                {/* Section 5 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    5. DATA PROCESSING ACTIVITIES
                  </h3>
                  <div className="text-cream/80 space-y-4 text-justify">
                    <p>The following sets out all categories of personal data processed through the Website, the purposes, lawful bases, categories of data subjects, and retention periods.</p>
                    
                    {/* 5.1 */}
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="text-gold font-semibold mb-2">5.1 Website Visiting and Technical Operation</h4>
                      <ul className="space-y-1 text-xs">
                        <li><strong>Purpose:</strong> Providing and maintaining the Website; ensuring technical functionality, security, and performance</li>
                        <li><strong>Lawful basis:</strong> Article 6(1)(f) GDPR — Legitimate interest of the Data Controller</li>
                        <li><strong>Categories of data subjects:</strong> All Website visitors</li>
                        <li><strong>Categories of personal data:</strong> IP address, browser type and version, operating system, device type, date and time of access, pages visited, referral URL</li>
                        <li><strong>Source of data:</strong> Automatically collected by the web server</li>
                        <li><strong>Retention period:</strong> Server logs: 30 days from date of collection</li>
                      </ul>
                    </div>

                    {/* 5.2 */}
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="text-gold font-semibold mb-2">5.2 User Account Registration</h4>
                      <ul className="space-y-1 text-xs">
                        <li><strong>Purpose:</strong> Creating and managing user accounts; enabling order history, saved addresses, and personalised experience</li>
                        <li><strong>Lawful basis:</strong> Article 6(1)(b) GDPR — Performance of a contract</li>
                        <li><strong>Categories of data subjects:</strong> Registered users</li>
                        <li><strong>Categories of personal data:</strong> Full name, email address, password (encrypted), billing address, shipping address, telephone number, order history</li>
                        <li><strong>Retention period:</strong> Duration of the account's existence plus 5 years following account deletion</li>
                      </ul>
                    </div>

                    {/* 5.3 */}
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="text-gold font-semibold mb-2">5.3 Order Processing and Contract Fulfilment</h4>
                      <ul className="space-y-1 text-xs">
                        <li><strong>Purpose:</strong> Processing and fulfilling orders; managing payments, shipping, and delivery; handling returns and refunds</li>
                        <li><strong>Lawful basis:</strong> Article 6(1)(b) GDPR — Performance of a contract</li>
                        <li><strong>Categories of data subjects:</strong> Customers (registered and guest)</li>
                        <li><strong>Categories of personal data:</strong> Full name, email address, billing address, shipping address, telephone number, order details, payment transaction ID (full payment card details are NOT stored)</li>
                        <li><strong>Retention period:</strong> 7 years from the date of the transaction (Cyprus tax and accounting obligations)</li>
                      </ul>
                    </div>

                    {/* 5.4 */}
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="text-gold font-semibold mb-2">5.4 Invoicing and Tax Compliance</h4>
                      <ul className="space-y-1 text-xs">
                        <li><strong>Purpose:</strong> Issuing invoices; complying with tax and accounting obligations under Cyprus law</li>
                        <li><strong>Lawful basis:</strong> Article 6(1)(c) GDPR — Compliance with a legal obligation</li>
                        <li><strong>Categories of personal data:</strong> Full name, billing address, VAT number (if applicable), invoice details, transaction amount</li>
                        <li><strong>Retention period:</strong> 7 years from the end of the tax year (10 years for OSS transactions)</li>
                      </ul>
                    </div>

                    {/* 5.5 */}
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="text-gold font-semibold mb-2">5.5 Newsletter and Marketing Communications</h4>
                      <ul className="space-y-1 text-xs">
                        <li><strong>Purpose:</strong> Sending newsletters, promotional offers, product updates, and marketing communications</li>
                        <li><strong>Lawful basis:</strong> Article 6(1)(a) GDPR — Consent (opt-in); or Article 6(1)(f) — Legitimate interest (soft opt-in for existing customers)</li>
                        <li><strong>Categories of personal data:</strong> Full name, email address, subscription preferences, email engagement data</li>
                        <li><strong>Retention period:</strong> Until consent is withdrawn plus 30 days for processing</li>
                      </ul>
                    </div>

                    {/* 5.6 */}
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="text-gold font-semibold mb-2">5.6 Customer Service and Enquiries</h4>
                      <ul className="space-y-1 text-xs">
                        <li><strong>Purpose:</strong> Responding to customer enquiries, complaints, and support requests</li>
                        <li><strong>Lawful basis:</strong> Article 6(1)(b) GDPR (order-related); Article 6(1)(f) (general enquiries)</li>
                        <li><strong>Categories of personal data:</strong> Full name, email address, telephone number, content of communications, order number</li>
                        <li><strong>Retention period:</strong> 3 years from the date of the last communication</li>
                      </ul>
                    </div>

                    {/* 5.7 */}
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="text-gold font-semibold mb-2">5.7 Cookies and Similar Technologies</h4>
                      <ul className="space-y-1 text-xs">
                        <li><strong>Purpose:</strong> See Section 8 (Cookie Policy) for full details</li>
                        <li><strong>Lawful basis:</strong> Strictly necessary cookies: Article 6(1)(f) GDPR — Legitimate interest. All other cookies: Article 6(1)(a) GDPR — Consent</li>
                      </ul>
                    </div>

                    {/* 5.8 */}
                    <div className="bg-black/20 p-4 rounded-lg">
                      <h4 className="text-gold font-semibold mb-2">5.8 Fraud Prevention and Security</h4>
                      <ul className="space-y-1 text-xs">
                        <li><strong>Purpose:</strong> Detecting, preventing, and investigating fraud, security incidents, and misuse</li>
                        <li><strong>Lawful basis:</strong> Article 6(1)(f) GDPR — Legitimate interest</li>
                        <li><strong>Categories of personal data:</strong> IP address, transaction data, device fingerprint, behavioural data</li>
                        <li><strong>Retention period:</strong> 3 years from the date of collection</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 6 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    6. DATA PROCESSORS AND RECIPIENTS
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>The Data Controller may share personal data with the following categories of recipients and data processors. All data processors are bound by data processing agreements (DPAs) in accordance with Article 28 GDPR.</p>
                    <div className="bg-black/20 p-4 rounded-lg my-3 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gold/30">
                            <th className="text-gold text-left py-2">Category</th>
                            <th className="text-gold text-left py-2">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="py-2 pr-2">Hosting provider</td><td>Website hosting and server infrastructure</td></tr>
                          <tr><td className="py-2 pr-2">Payment processor</td><td>Processing online payments securely</td></tr>
                          <tr><td className="py-2 pr-2">Shipping/courier services</td><td>Delivering orders to customers</td></tr>
                          <tr><td className="py-2 pr-2">Email marketing service</td><td>Sending newsletters and marketing communications</td></tr>
                          <tr><td className="py-2 pr-2">Analytics provider</td><td>Website traffic analysis and performance monitoring</td></tr>
                          <tr><td className="py-2 pr-2">Cookie consent platform</td><td>Managing cookie consent</td></tr>
                          <tr><td className="py-2 pr-2">Accounting/invoicing software</td><td>Invoice generation and tax compliance</td></tr>
                          <tr><td className="py-2 pr-2">Cyprus Tax Department</td><td>VAT reporting and tax compliance</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p>The Data Controller does <strong>not</strong> sell, rent, or trade personal data to third parties for their independent marketing purposes.</p>
                  </div>
                </section>

                {/* Section 7 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    7. INTERNATIONAL DATA TRANSFERS
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>The Data Controller is established in the Republic of Cyprus, a member state of the European Union. Personal data is primarily processed within the EU/EEA. Where personal data is transferred to countries outside the EU/EEA, the Data Controller ensures that appropriate safeguards are in place:</p>
                    <p><strong>7.1 Adequacy decisions.</strong> The European Commission has issued adequacy decisions for certain countries, meaning they provide an adequate level of data protection. Transfers to these countries do not require additional safeguards. Countries with adequacy decisions include the United Kingdom, Switzerland, Japan, South Korea, Canada (commercial organisations), Argentina, New Zealand, Israel, Uruguay, Brazil, and the United States (for organisations certified under the EU-US Data Privacy Framework).</p>
                    <p><strong>7.2 Standard Contractual Clauses (SCCs).</strong> Where data is transferred to a country without an adequacy decision, the Data Controller relies on Standard Contractual Clauses adopted by the European Commission (Implementing Decision (EU) 2021/914) and conducts Transfer Impact Assessments in accordance with the EDPB Recommendations 01/2020.</p>
                    <p><strong>7.3 Cyprus-specific requirement.</strong> In accordance with Law 125(I)/2018, prior notification to the Commissioner for Personal Data Protection is provided before transferring sensitive personal data (special categories of data under Article 9 GDPR) to a third country that does not benefit from an adequacy decision.</p>
                    <p><strong>7.4 US-based service providers.</strong> Where the Data Controller uses US-based service providers, transfers are covered by the EU-US Data Privacy Framework where the provider is certified, or by SCCs with supplementary measures where the provider is not DPF-certified. Data subjects may request information about the safeguards in place by contacting the Data Controller.</p>
                    <p><strong>7.5 UK data subjects.</strong> For personal data of data subjects in the United Kingdom, the Data Controller complies with the UK GDPR and the Data Protection Act 2018. The EU has renewed its adequacy decision for the United Kingdom, permitting the free flow of personal data between the EU and the UK.</p>
                  </div>
                </section>

                {/* Section 8 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    8. COOKIE POLICY
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p><strong>8.1 What are cookies?</strong></p>
                    <p>Cookies are small text files placed on your device when you visit a website. They serve various purposes including enabling the website to function, remembering your preferences, and analysing how the website is used.</p>
                    
                    <p><strong>8.2 Legal basis for cookies</strong></p>
                    <p>In accordance with Part 14 of the Law on the Regulation of Electronic Communications and Postal Services (Law 112(I)/2004) transposing the EU ePrivacy Directive, and in conjunction with GDPR:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Strictly necessary cookies</strong> are placed without consent, as they are essential for the Website to function. The legal basis is Article 6(1)(f) GDPR (legitimate interest).</li>
                      <li>All <strong>other cookies</strong> (analytics, functional, marketing/advertising) require your prior, informed, and explicit consent before being placed on your device.</li>
                    </ul>
                    
                    <p className="mt-3"><strong>8.3 Categories of cookies used</strong></p>
                    <div className="bg-black/20 p-4 rounded-lg my-3 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gold/30">
                            <th className="text-gold text-left py-2">Category</th>
                            <th className="text-gold text-left py-2">Purpose</th>
                            <th className="text-gold text-left py-2">Consent required?</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="py-2 pr-2">Strictly necessary</td><td>Enable core Website functionality (shopping cart, checkout, login session, security)</td><td>No</td></tr>
                          <tr><td className="py-2 pr-2">Functional</td><td>Remember user preferences (language, currency, recently viewed products)</td><td>Yes</td></tr>
                          <tr><td className="py-2 pr-2">Analytics</td><td>Measure Website traffic, understand user behaviour, improve Website performance</td><td>Yes</td></tr>
                          <tr><td className="py-2 pr-2">Marketing / Advertising</td><td>Deliver relevant advertisements, track ad campaign effectiveness, retargeting</td><td>Yes</td></tr>
                          <tr><td className="py-2 pr-2">Third-party / Embedded content</td><td>Enable functionality from third-party services (e.g., embedded videos, social media widgets)</td><td>Yes</td></tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <p><strong>8.4 Managing your cookie preferences</strong></p>
                    <p>You can manage, change, or withdraw your cookie consent at any time by:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Clicking the cookie settings link in the Website footer, which reopens the cookie consent banner</li>
                      <li>Adjusting your browser settings to block or delete cookies</li>
                      <li>Using browser extensions designed to manage cookies</li>
                    </ul>
                    <p>Please note that disabling certain cookies may affect the functionality of the Website.</p>
                    
                    <p className="mt-3"><strong>8.5 Third-party cookies</strong></p>
                    <p>Some cookies are placed by third-party services integrated into the Website. The Data Controller has no control over how these third parties use cookies. Please review the privacy policies of these third parties for more information.</p>
                  </div>
                </section>

                {/* Section 9 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    9. RIGHTS OF DATA SUBJECTS
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>Under GDPR and Cyprus Law 125(I)/2018, you have the following rights in relation to your personal data. You may exercise these rights free of charge by contacting the Data Controller at [INSERT EMAIL ADDRESS].</p>
                    <div className="bg-black/20 p-4 rounded-lg my-3 overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-gold/30">
                            <th className="text-gold text-left py-2">Right</th>
                            <th className="text-gold text-left py-2">Description</th>
                            <th className="text-gold text-left py-2">Legal basis</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="py-2 pr-2">Right to information</td><td>You have the right to receive clear, transparent information about how your personal data is processed.</td><td>Articles 13–14 GDPR</td></tr>
                          <tr><td className="py-2 pr-2">Right of access</td><td>You have the right to obtain confirmation of whether your personal data is being processed and to receive a copy of that data.</td><td>Article 15 GDPR</td></tr>
                          <tr><td className="py-2 pr-2">Right to rectification</td><td>You have the right to request correction of inaccurate personal data or completion of incomplete data.</td><td>Article 16 GDPR</td></tr>
                          <tr><td className="py-2 pr-2">Right to erasure ("right to be forgotten")</td><td>You have the right to request the deletion of your personal data where there is no compelling reason for its continued processing.</td><td>Article 17 GDPR</td></tr>
                          <tr><td className="py-2 pr-2">Right to restriction of processing</td><td>You have the right to request that the processing of your personal data be restricted in certain circumstances.</td><td>Article 18 GDPR</td></tr>
                          <tr><td className="py-2 pr-2">Right to data portability</td><td>You have the right to receive your personal data in a structured, commonly used, and machine-readable format.</td><td>Article 20 GDPR</td></tr>
                          <tr><td className="py-2 pr-2">Right to object</td><td>You have the right to object to the processing of your personal data based on legitimate interests or for direct marketing.</td><td>Article 21 GDPR</td></tr>
                          <tr><td className="py-2 pr-2">Right not to be subject to automated decision-making</td><td>You have the right not to be subject to a decision based solely on automated processing, including profiling.</td><td>Article 22 GDPR</td></tr>
                          <tr><td className="py-2 pr-2">Right to withdraw consent</td><td>Where processing is based on consent, you have the right to withdraw consent at any time.</td><td>Article 7(3) GDPR</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p><strong>Response time.</strong> The Data Controller will respond to data subject requests within one (1) month of receipt. This period may be extended by a further two months where necessary.</p>
                    <p><strong>Verification.</strong> To protect your rights and security, the Data Controller may need to verify your identity before processing your request.</p>
                  </div>
                </section>

                {/* Section 10 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    10. DATA SECURITY
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>The Data Controller implements appropriate technical and organisational measures to ensure a level of security appropriate to the risk, in accordance with Article 32 GDPR. These measures include, but are not limited to:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Encryption in transit:</strong> The entire Website is served over HTTPS (TLS/SSL encryption).</li>
                      <li><strong>Payment security:</strong> The Data Controller does not store, process, or transmit credit or debit card data on its own servers. All payment transactions are handled by PCI DSS-compliant third-party payment processors using hosted payment pages. Strong Customer Authentication (SCA) is implemented in accordance with the EU Payment Services Directive 2 (PSD2).</li>
                      <li><strong>Access controls:</strong> Access to personal data is restricted to authorised personnel only, on a need-to-know basis.</li>
                      <li><strong>Password security:</strong> User passwords are stored using industry-standard cryptographic hashing algorithms.</li>
                      <li><strong>Regular updates:</strong> WordPress, WooCommerce, and all plugins are kept up to date with security patches.</li>
                      <li><strong>Backups:</strong> Regular encrypted backups are maintained to ensure data can be recovered in the event of a technical incident.</li>
                      <li><strong>Data breach response:</strong> In the event of a personal data breach, the Data Controller will notify the Commissioner for Personal Data Protection within 72 hours of becoming aware of the breach, where the breach is likely to result in a risk to the rights and freedoms of natural persons (Article 33 GDPR). Affected data subjects will be notified without undue delay where the breach is likely to result in a high risk to their rights and freedoms (Article 34 GDPR).</li>
                    </ul>
                  </div>
                </section>

                {/* Section 11 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    11. CHILDREN'S DATA
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>The Website is not directed at children. In accordance with Article 8 of Cyprus Law 125(I)/2018, the age of digital consent in Cyprus is <strong>14 years</strong>. The Data Controller does not knowingly collect personal data from children under the age of 14 without verifiable consent from a holder of parental responsibility. If the Data Controller becomes aware that personal data has been collected from a child under 14 without appropriate parental consent, the data will be deleted promptly. If you believe that a child's data has been collected, please contact the Data Controller immediately at [INSERT EMAIL ADDRESS].</p>
                  </div>
                </section>

                {/* Section 12 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    12. DIRECT MARKETING AND ELECTRONIC COMMUNICATIONS
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>In accordance with Part 14 of Cyprus Law 112(I)/2004 (transposing the EU ePrivacy Directive):</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Opt-in consent</strong> is required before sending electronic marketing communications (email, SMS) to individuals, unless the soft opt-in exemption applies.</li>
                      <li><strong>Soft opt-in exemption:</strong> The Data Controller may send marketing communications to existing customers about similar products or services, provided that: (a) the customer's contact details were obtained in the context of a sale, (b) the customer was given the opportunity to object at the time of collection and in every subsequent communication, and (c) the marketing relates to similar products or services offered by the Data Controller.</li>
                      <li><strong>Opt-out mechanism:</strong> Every marketing communication includes a clear and easy-to-use unsubscribe link. Unsubscribe requests are processed within 48 hours. All commercial communications clearly identify the Data Controller as the sender and include a valid contact address.</li>
                    </ul>
                  </div>
                </section>

                {/* Section 13 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    13. SUPERVISORY AUTHORITY
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>The competent supervisory authority for data protection matters relating to the Data Controller is:</p>
                    <div className="bg-black/20 p-4 rounded-lg my-3">
                      <p className="text-gold font-semibold mb-2">Commissioner for the Protection of Personal Data</p>
                      <p>(Επίτροπος Προστασίας Δεδομένων Προσωπικού Χαρακτήρα)</p>
                      <p className="mt-2">Commissioner: Maria Christofidou</p>
                      <p>Address: Kypranoros 15, 1061 Nicosia, Cyprus</p>
                      <p>Postal address: P.O. Box 23378, CY-1682 Nicosia, Cyprus</p>
                      <p>Telephone: +357 22 818456</p>
                      <p>Fax: +357 22 304565</p>
                      <p>Email: commissioner@dataprotection.gov.cy</p>
                      <p>Website: http://www.dataprotection.gov.cy</p>
                    </div>
                    <p><strong>How to file a complaint.</strong> If you believe that the processing of your personal data infringes GDPR or Cyprus Law 125(I)/2018, you have the right to lodge a complaint with the Commissioner. Complaints can be submitted through the Commissioner's website at: https://www.dataprotection.gov.cy. The Commissioner will inform you of the progress and outcome of your complaint within 30 days of submission. If the Commissioner does not handle your complaint or fails to inform you within 3 months, you have the right to an effective judicial remedy before the Administrative Court of the Republic of Cyprus.</p>
                    <p className="mt-3"><strong>For UK data subjects:</strong> You may also lodge a complaint with the UK Information Commissioner's Office (ICO):</p>
                    <div className="bg-black/20 p-3 rounded-lg my-2 text-xs">
                      <p>Website: https://ico.org.uk</p>
                      <p>Telephone: +44 303 123 1113</p>
                      <p>Address: Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF, United Kingdom</p>
                    </div>
                  </div>
                </section>

                {/* Section 14 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    14. TAX AND FISCAL COMPLIANCE — DATA PROCESSING
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>In compliance with Cyprus tax legislation, certain personal data is processed and retained for tax and accounting purposes:</p>
                    <div className="bg-black/20 p-4 rounded-lg my-3">
                      <p className="text-gold font-semibold mb-2">Competent tax authority</p>
                      <p>Tax Department (Τμήμα Φορολογίας), Ministry of Finance, Republic of Cyprus</p>
                      <p>Address: Corner Michalaki Karaoli & Gregory Afxentiou, 1471 Nicosia, Cyprus</p>
                      <p>Telephone: +357 22 807413</p>
                      <p>Website: https://www.mof.gov.cy/mof/tax/taxdep.nsf</p>
                      <p>Tax portal: https://taxportal.mof.gov.cy</p>
                      <p>VAT rate: 19% standard rate (reduced rates of 9%, 5%, and 3% apply to certain categories)</p>
                    </div>
                    <p><strong>Legal obligations requiring data retention:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Cyprus VAT Act (Chapter 113, as amended):</strong> Invoices, transaction records, and supporting documents must be retained for a minimum of 7 years from the end of the relevant tax year.</li>
                      <li><strong>EU One-Stop Shop (OSS) transactions:</strong> Records of cross-border B2C sales within the EU filed through the Union OSS system must be retained for 10 years from the end of the year of the transaction.</li>
                      <li><strong>Income Tax Law (Chapter 117, as amended):</strong> Books of account and supporting records must be retained for a minimum of 6 years.</li>
                    </ul>
                    <p className="mt-2">The Data Controller processes invoicing and transaction data under Article 6(1)(c) GDPR (compliance with a legal obligation). This data cannot be erased upon request until the statutory retention period has expired.</p>
                  </div>
                </section>

                {/* Section 15 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    15. CONSUMER RIGHTS — DISTANCE SELLING
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>In accordance with Cyprus Consumer Rights Law (Law 133(I)/2013) transposing EU Directive 2011/83/EU, and Cyprus Consumer Protection Law (Law 112(I)/2021):</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Right of withdrawal:</strong> You have the right to withdraw from a distance contract within 14 calendar days from the date you (or a person indicated by you) receive the goods, without giving any reason. If you are not informed of this right, the withdrawal period is extended by 12 months.</li>
                      <li><strong>Refunds:</strong> Upon valid withdrawal, the Data Controller will refund all payments received within 14 days of receiving the withdrawal notification.</li>
                      <li><strong>Model withdrawal form:</strong> A model withdrawal form is available on the Website.</li>
                      <li><strong>Exceptions to the right of withdrawal</strong> include: sealed goods which were unsealed after delivery and are not suitable for return due to health protection or hygiene reasons, goods made to the consumer's specifications or clearly personalised, and goods which are liable to deteriorate or expire rapidly.</li>
                    </ul>
                    <p className="mt-3"><strong>Complaint resolution.</strong> Consumers may submit complaints to:</p>
                    <div className="bg-black/20 p-3 rounded-lg my-2 text-xs">
                      <p><strong>Cyprus Consumer Protection Service:</strong> 2 Agapinoros Street, IRIS Tower, CY-1421 Nicosia; Tel: +357 22 200900; Email: ccps@meci.gov.cy; Website: www.consumer.gov.cy</p>
                      <p><strong>European Consumer Centre (ECC) Cyprus:</strong> For cross-border EU disputes</p>
                      <p><strong>EU Online Dispute Resolution (ODR) Platform:</strong> https://ec.europa.eu/consumers/odr/</p>
                    </div>
                  </div>
                </section>

                {/* Section 16 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    16. INFORMATION FOR INTERNATIONAL VISITORS
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p><strong>16.1 Visitors from the United States</strong></p>
                    <p>The Data Controller is a Cyprus-registered entity and is primarily governed by EU GDPR and Cyprus data protection law. If you are a resident of California and the Data Controller meets the thresholds under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), you may have additional rights, including the right to know what personal information is collected, the right to delete personal information, the right to opt out of the sale or sharing of personal information, and the right to non-discrimination. To exercise these rights, contact the Data Controller at [INSERT EMAIL ADDRESS]. The Data Controller does not sell personal information as defined under the CCPA/CPRA.</p>
                    <p><strong>16.2 Visitors from the United Kingdom</strong></p>
                    <p>See Section 7.5 for UK GDPR compliance measures and Section 13 for the ICO complaint procedure. The Data Controller processes the personal data of UK data subjects in compliance with the UK GDPR and the Data Protection Act 2018.</p>
                    <p><strong>16.3 Visitors from Canada</strong></p>
                    <p>If you are a resident of Canada, your personal data may be protected under the Personal Information Protection and Electronic Documents Act (PIPEDA). Canada benefits from an EU adequacy decision, facilitating the lawful transfer of personal data between the EU and Canada.</p>
                    <p><strong>16.4 Visitors from other jurisdictions</strong></p>
                    <p>The Data Controller takes reasonable steps to comply with applicable data protection laws in jurisdictions where the Website is accessible. If you have questions about your rights under local law, please contact the Data Controller.</p>
                  </div>
                </section>

                {/* Section 17 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    17. AUTOMATED DECISION-MAKING AND PROFILING
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>The Data Controller does <strong>not</strong> use automated decision-making or profiling that produces legal effects or similarly significantly affects data subjects, as described in Article 22 GDPR.</p>
                  </div>
                </section>

                {/* Section 18 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    18. CHANGES TO THIS POLICY
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>The Data Controller reserves the right to update or modify this Policy at any time. Any material changes will be communicated by:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Posting the updated Policy on the Website with an updated "Last updated" date</li>
                      <li>Sending an email notification to registered users and newsletter subscribers where the changes materially affect their rights</li>
                    </ul>
                    <p>Where changes affect processing based on consent, fresh consent will be obtained where necessary. You are encouraged to review this Policy periodically. The current version is always available at: www.fairygarden4u.com/privacy-policy</p>
                  </div>
                </section>

                {/* Section 19 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    19. CONTACT INFORMATION
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>For any questions, requests, or complaints regarding this Policy or the processing of your personal data, please contact:</p>
                    <div className="bg-black/20 p-4 rounded-lg my-2">
                      <p><strong className="text-gold">Data Controller:</strong> [INSERT FULL LEGAL NAME]</p>
                      <p><strong>Address:</strong> [INSERT REGISTERED ADDRESS], Cyprus</p>
                      <p><strong>Email:</strong> [INSERT — e.g., privacy@fairygarden4u.com]</p>
                      <p><strong>Telephone:</strong> [INSERT PHONE NUMBER]</p>
                      <p><strong>Data Protection Officer:</strong> [INSERT DPO NAME AND EMAIL, IF APPOINTED]</p>
                      <p><strong>Website:</strong> www.fairygarden4u.com</p>
                    </div>
                  </div>
                </section>

                {/* Section 20 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    20. APPLICABLE LAW AND JURISDICTION
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>This Policy and any disputes arising out of or in connection with it shall be governed by and construed in accordance with the laws of the Republic of Cyprus, without regard to conflict of law principles. The courts of the Republic of Cyprus shall have exclusive jurisdiction, without prejudice to the right of data subjects to lodge a complaint with a supervisory authority in their member state of habitual residence, place of work, or place of the alleged infringement, in accordance with Article 77 GDPR.</p>
                  </div>
                </section>

                {/* Last Updated */}
                <div className="text-center pt-6 border-t border-gold/20">
                  <p className="text-cream/50 text-xs">
                    This Privacy Policy and Data Management Policy was last updated on [INSERT DATE]
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
