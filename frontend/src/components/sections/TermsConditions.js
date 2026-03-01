import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';

// Terms Modal Component
export const TermsModal = ({ isOpen, onClose }) => {
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
                <FileText className="w-12 h-12 text-gold mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-2">
                  TERMS AND CONDITIONS
                </h2>
                <p className="text-cream/70 font-montserrat text-sm">
                  Fairygarden For You Ltd | https://fairygarden4u.com
                </p>
              </div>
              
              {/* Content */}
              <div className="font-montserrat text-cream/90 space-y-6 text-sm leading-relaxed">
                
                {/* Section 1 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    1. General information and company details
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>1.1 These Terms and Conditions ("Terms") govern all purchases and orders made through the website https://fairygarden4u.com ("Website"), operated by Fairygarden For You Ltd, a company registered in the Republic of Cyprus.</p>
                    <p>1.2 The Company is subject to the laws of the Republic of Cyprus, including the Consumer Protection Law of 2021 (Law 112(I)/2021), the Consumer Rights Law (Law 133(I)/2013), the Electronic Commerce Law (Law 156(I)/2004), and all applicable European Union regulations and directives governing consumer rights and e-commerce.</p>
                    <p>1.3 For any questions, complaints, or requests regarding these Terms, please contact us using the details provided in Section 16 below.</p>
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    2. Scope and applicability
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>2.1 These Terms apply to all contracts concluded between the Company and any natural person acting for purposes outside their trade, business, craft, or profession ("Customer" or "you") through the Website, by telephone, or by email.</p>
                    <p>2.2 By placing an order through the Website, you confirm that: (a) you are at least 18 years of age or have the consent of a legal guardian; (b) you have read, understood, and agree to be bound by these Terms; (c) you have read and acknowledge our Privacy Policy.</p>
                    <p>2.3 These Terms are made available on the Website in a manner that allows you to store, download, and print them before placing your order.</p>
                    <p>2.4 These Terms apply to all product categories offered through the Website, including ready-made florariums, DIY florarium kits, and custom "Build Your Own Florarium" orders. Specific additional conditions for custom orders are set out in Section 5 below.</p>
                  </div>
                </div>

                {/* Section 3 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    3. Products and services
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>3.1 The Company offers the following products through the Website:</p>
                    <p>(a) <strong>Handcrafted closed florariums</strong> — Self-sustaining glass ecosystems containing living plants, moss, and decorative elements. These are handmade products containing living organisms and are therefore subject to natural variation. Each florarium is unique.</p>
                    <p>(b) <strong>DIY florarium kits</strong> — Pre-packaged kits containing materials, tools, and instructions for building your own florarium at home.</p>
                    <p>(c) <strong>Custom "Build Your Own Florarium" orders</strong> — Bespoke florariums designed and built to your individual specifications through our online configurator and design consultation process. These are made-to-order products and are subject to the special conditions in Section 5.</p>
                    <p>3.2 Product descriptions, images, and specifications on the Website are provided as accurately as possible. However, because our products are handcrafted and contain living organisms, slight variations in colour, size, shape, and plant growth between the product image and the delivered product are normal and do not constitute a defect.</p>
                  </div>
                </div>

                {/* Section 4 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    4. Ordering process
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>4.1 <strong>Placing an order.</strong> To place an order for a ready-made florarium or DIY kit, follow these steps: (a) Select your product(s) and add them to your shopping cart. (b) Review your cart and proceed to checkout. (c) Enter your delivery and billing details. (d) Select your preferred delivery method. (e) Select your preferred payment method. (f) Review your order summary, including total price with VAT and delivery charges. (g) Confirm that you have read and accept these Terms by ticking the checkbox provided. (h) Click the "Order with obligation to pay" button to submit your order.</p>
                    <p>4.2 <strong>Order confirmation.</strong> After submitting your order, you will receive an automatic order acknowledgement by email. This acknowledgement confirms that we have received your order but does not constitute acceptance of your order. A binding contract is formed only when we send you a separate Order Confirmation email or when we dispatch the goods, whichever occurs first.</p>
                    <p>4.3 <strong>Right to refuse orders.</strong> We reserve the right to refuse or cancel any order for legitimate reasons, including but not limited to: product unavailability, pricing errors on the Website, suspicion of fraud, or inability to deliver to the specified address.</p>
                  </div>
                </div>

                {/* Section 5 - Custom Orders (Important!) */}
                <div className="bg-gold/10 border border-gold/40 rounded-xl p-4 sm:p-6" id="terms-section-5">
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3 flex items-center gap-2 flex-wrap">
                    <span className="bg-gold text-forest px-2 py-1 rounded text-xs">⚠️ IMPORTANT</span>
                    5. Custom florarium orders ("Build Your Own")
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p className="font-bold text-gold/90">IMPORTANT NOTICE: Custom florarium orders are bespoke products made to your individual specifications. Under Article 16(c) of EU Directive 2011/83/EU and Cyprus Law 133(I)/2013, goods made to the consumer's specifications or clearly personalised are exempt from the 14-day statutory right of withdrawal. By placing a custom order, you acknowledge and accept that you will not have the right to cancel under the statutory cooling-off period.</p>
                    
                    <p><strong>5.1 Configurator and price calculation</strong></p>
                    <p>5.1.1 The Website features an online configurator that allows you to design your own florarium by selecting options including container type and size, plant species, moss varieties, decorative elements, and optional accessories.</p>
                    <p>5.1.2 The configurator generates an estimated price based on your selections. This estimate is provided for informational purposes and serves as a starting point. The estimated price is not the final price. The final price will be determined following the consultation and design process.</p>
                    
                    <p><strong>5.2 Deposit payment (30%) and what it covers</strong></p>
                    <p>5.2.1 To confirm your custom order and initiate the design process, a non-refundable deposit of 30% of the configurator's estimated price ("Deposit") is required.</p>
                    <p>5.2.2 The Deposit covers the following services: (a) A personal consultation to discuss your vision and requirements; (b) Preparation of a written order form documenting the agreed specifications; (c) Creation of three (3) bespoke design proposals with visual renders; (d) Administrative costs including materials research and scheduling.</p>
                    <p>5.2.3 By paying the Deposit, you expressly acknowledge that: (a) your order is for a bespoke product made to your specifications; (b) the statutory 14-day right of withdrawal does not apply; (c) the Deposit is non-refundable in the circumstances described in Section 5.5; (d) the design services will commence immediately.</p>
                    
                    <p><strong>5.3 Consultation and design approval process</strong></p>
                    <p>5.3.1 Following receipt of the Deposit, we will contact you within 5 business days to schedule the consultation.</p>
                    <p>5.3.2 We will create and deliver three (3) design proposals. You may: (a) Approve one of the proposals; (b) Request reasonable modifications; (c) Decline all three proposals (subject to deposit policy).</p>
                    
                    <p><strong>5.5 Non-refundable deposit policy</strong></p>
                    <p>The Deposit is non-refundable if: (a) You decline all three design proposals and choose not to proceed; (b) You cancel the order after the consultation has taken place; (c) The order is deemed cancelled due to non-responsiveness; (d) You cancel after production has commenced.</p>
                  </div>
                </div>

                {/* Section 6 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    6. Pricing and payment methods
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>6.1 <strong>Prices.</strong> All prices displayed on the Website are in Euros (€) and include VAT at the applicable rate (currently 19% in Cyprus).</p>
                    <p>6.2 <strong>Delivery charges.</strong> Delivery charges are calculated based on the delivery method selected and the destination.</p>
                    <p>6.4 <strong>Payment methods.</strong> We accept: (a) Credit or debit card; (b) Bank transfer; (c) PayPal; (d) Cash (available only for personal pickup orders).</p>
                    <p>6.5 <strong>Payment timing.</strong> For ready-made florariums and DIY kits, full payment is required at the time of order. For custom orders, payment is split: 30% Deposit at order, balance at pickup/delivery.</p>
                  </div>
                </div>

                {/* Section 7 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    7. Delivery and shipping
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>7.1 <strong>Delivery options:</strong> (a) Pickup points and parcel lockers (Cyprus only); (b) Home delivery (Cyprus); (c) Personal pickup; (d) EU-wide shipping — Available primarily for DIY kits.</p>
                    <p>7.2 <strong>Delivery timeframes:</strong> Ready-made florariums and DIY kits (Cyprus): typically 3–7 business days. EU shipping (DIY kits): typically 5–15 business days. Custom orders: typically 2–6 weeks from design approval.</p>
                    <p>7.4 <strong>Risk and title.</strong> Risk of loss or damage passes to you upon delivery. Title passes upon receipt of full payment.</p>
                  </div>
                </div>

                {/* Section 8 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    8. Right of withdrawal and returns
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>8.1 <strong>Standard products — 14-day right of withdrawal.</strong> If you are a consumer in the European Union, you have the right to withdraw from a distance contract within 14 calendar days without giving any reason.</p>
                    <p>8.2 <strong>Exceptions.</strong> The 14-day right of withdrawal does NOT apply to: (a) Custom "Build Your Own Florarium" orders — bespoke products made to your specifications; (b) Handcrafted closed florariums containing living plants — products liable to deteriorate; (c) DIY kits containing live plant material.</p>
                  </div>
                </div>

                {/* Section 9 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    9. Warranty and liability
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>9.1 <strong>Legal guarantee of conformity.</strong> You are entitled to a legal guarantee of conformity for a period of two (2) years from the date of delivery.</p>
                    <p>9.2 <strong>Limitation for living products.</strong> The guarantee applies to defects in craftsmanship, materials, and the condition of plants at the time of delivery. It does not cover: (a) Natural changes in plant growth over time; (b) Deterioration caused by improper care; (c) Damage caused during return shipping.</p>
                  </div>
                </div>

                {/* Section 10 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    10. Living plant disclaimer
                  </h3>
                  <div className="text-cream/80 space-y-2 text-justify">
                    <p>10.1 Our handcrafted florariums and certain DIY kits contain living plants, moss, and biological organisms.</p>
                    <p>10.2 <strong>Living organisms are inherently variable.</strong> No two living plants are identical. Variations in leaf shape, colour, size, and growth pattern are natural characteristics, not defects.</p>
                    <p>10.3 <strong>Care requirements.</strong> Detailed care instructions are provided with every florarium. Failure to follow care instructions may result in plant deterioration, for which we cannot accept responsibility.</p>
                    <p>10.6 <strong>No guarantee of plant longevity.</strong> While closed florariums can thrive for years with proper care, we do not guarantee the lifespan of any living plant.</p>
                  </div>
                </div>

                {/* Sections 11-16 */}
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    11. Intellectual property
                  </h3>
                  <p className="text-cream/80 text-justify">All content on the Website is the property of Fairygarden For You Ltd or its licensors and is protected by copyright, trademark, and other intellectual property laws.</p>
                </div>

                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    12. Data protection (GDPR)
                  </h3>
                  <p className="text-cream/80 text-justify">We collect and process personal data in accordance with the EU General Data Protection Regulation (GDPR) and Cyprus Law 125(I)/2018. Full details are set out in our separate Privacy Policy.</p>
                </div>

                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    13. Governing law and jurisdiction
                  </h3>
                  <p className="text-cream/80 text-justify">These Terms are governed by and construed in accordance with the laws of the Republic of Cyprus. Any disputes shall be subject to the exclusive jurisdiction of the courts of the Republic of Cyprus, unless otherwise required by mandatory provisions of EU law.</p>
                </div>

                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    14. Dispute resolution
                  </h3>
                  <p className="text-cream/80 text-justify">If you have a complaint, please contact us first. You may also use the EU Online Dispute Resolution platform at: https://ec.europa.eu/consumers/odr</p>
                </div>

                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    15. Amendments to Terms
                  </h3>
                  <p className="text-cream/80 text-justify">We reserve the right to amend these Terms at any time. Changes will not apply retroactively to orders placed before the date of the amendment.</p>
                </div>

                <div>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    16. Contact information
                  </h3>
                  <div className="text-cream/80">
                    <p>Fairygarden For You Ltd</p>
                    <p>Email: info@fairygarden4u.com</p>
                    <p>Website: https://fairygarden4u.com</p>
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
const TermsConditions = () => {
  return (
    <div id="terms-conditions" className="hidden" />
  );
};

export default TermsConditions;
