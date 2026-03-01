import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsConditions = () => {
  return (
    <section
      id="terms-conditions"
      className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-forest/95" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold mb-3 sm:mb-4" data-testid="terms-title">
            TERMS AND CONDITIONS
          </h2>
          <p className="text-cream/70 font-montserrat">
            Fairygarden For You Ltd<br />
            https://fairygarden4u.com
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12"
        >
          <div className="prose prose-invert prose-gold max-w-none font-montserrat text-cream/90 space-y-6 sm:space-y-8 text-sm sm:text-base">
            
            {/* Section 1 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                1. General information and company details
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p>1.1 These Terms and Conditions ("Terms") govern all purchases and orders made through the website https://fairygarden4u.com ("Website"), operated by Fairygarden For You Ltd, a company registered in the Republic of Cyprus.</p>
                <p>1.2 The Company is subject to the laws of the Republic of Cyprus, including the Consumer Protection Law of 2021 (Law 112(I)/2021), the Consumer Rights Law (Law 133(I)/2013), the Electronic Commerce Law (Law 156(I)/2004), and all applicable European Union regulations and directives governing consumer rights and e-commerce.</p>
                <p>1.3 For any questions, complaints, or requests regarding these Terms, please contact us using the details provided in Section 16 below.</p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                2. Scope and applicability
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p>2.1 These Terms apply to all contracts concluded between the Company and any natural person acting for purposes outside their trade, business, craft, or profession ("Customer" or "you") through the Website, by telephone, or by email.</p>
                <p>2.2 By placing an order through the Website, you confirm that: (a) you are at least 18 years of age or have the consent of a legal guardian; (b) you have read, understood, and agree to be bound by these Terms; (c) you have read and acknowledge our Privacy Policy.</p>
                <p>2.3 These Terms apply to all product categories offered through the Website, including ready-made florariums, DIY florarium kits, and custom "Build Your Own Florarium" orders.</p>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                3. Products and services
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p>3.1 The Company offers: (a) Handcrafted closed florariums — Self-sustaining glass ecosystems containing living plants, moss, and decorative elements. These are handmade products containing living organisms and are therefore subject to natural variation. (b) DIY florarium kits — Pre-packaged kits containing materials, tools, and instructions for building your own florarium at home. (c) Custom "Build Your Own Florarium" orders — Bespoke florariums designed and built to your individual specifications.</p>
                <p>3.2 Product descriptions, images, and specifications on the Website are provided as accurately as possible. However, because our products are handcrafted and contain living organisms, slight variations in colour, size, shape, and plant growth between the product image and the delivered product are normal and do not constitute a defect.</p>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                4. Ordering process
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p>4.1 To place an order: (a) Select your product(s) and add them to your shopping cart. (b) Review your cart and proceed to checkout. (c) Enter your delivery and billing details. (d) Select your preferred delivery method. (e) Select your preferred payment method. (f) Review your order summary. (g) Confirm that you have read and accept these Terms. (h) Click the "Order with obligation to pay" button to submit your order.</p>
                <p>4.2 After submitting your order, you will receive an automatic order acknowledgement by email. A binding contract is formed only when we send you a separate Order Confirmation email or when we dispatch the goods.</p>
              </div>
            </div>

            {/* Section 5 - Custom Orders (Important!) */}
            <div className="bg-gold/10 border border-gold/40 rounded-xl p-4 sm:p-6" id="terms-chapter-5">
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4 flex items-center gap-2 flex-wrap">
                <span className="bg-gold text-forest px-2 py-1 rounded text-xs sm:text-sm">IMPORTANT</span>
                5. Custom florarium orders ("Build Your Own")
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p className="font-bold text-gold/90">IMPORTANT NOTICE: Custom florarium orders are bespoke products made to your individual specifications. Under Article 16(c) of EU Directive 2011/83/EU and Cyprus Law 133(I)/2013, goods made to the consumer's specifications are exempt from the 14-day statutory right of withdrawal.</p>
                
                <p><strong>5.1 Configurator and price calculation</strong> — The Website features an online configurator that allows you to design your own florarium. The configurator generates an estimated price based on your selections. This estimate is not the final price.</p>
                
                <p><strong>5.2 Deposit payment (30%)</strong> — To confirm your custom order, a non-refundable deposit of 30% of the configurator's estimated price is required. The Deposit covers: (a) A personal consultation to discuss your vision; (b) Preparation of a written order form; (c) Creation of three (3) bespoke design proposals; (d) Administrative costs.</p>
                
                <p><strong>5.3 Consultation and design approval</strong> — Following receipt of the Deposit, we will contact you within 5 business days. We will create three design proposals. You may approve one, request modifications, or decline all three (subject to deposit policy).</p>
                
                <p><strong>5.4 Final price and balance</strong> — The final price is determined by the approved specifications. The balance is due at pickup or delivery.</p>
                
                <p><strong>5.5 Non-refundable deposit policy</strong> — The Deposit is non-refundable if: (a) You decline all three design proposals; (b) You cancel after consultation; (c) You are non-responsive for 30+ days; (d) You cancel after production has commenced.</p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                6. Pricing and payment methods
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p>6.1 All prices are in Euros (€) and include VAT at the applicable rate (currently 19% in Cyprus).</p>
                <p>6.2 Delivery charges are calculated based on the delivery method and destination.</p>
                <p>6.4 We accept: Credit or debit card, Bank transfer, PayPal, Cash (for personal pickup only).</p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                7. Delivery and shipping
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p>7.1 Delivery options: (a) Pickup points and parcel lockers (Cyprus only); (b) Home delivery (Cyprus); (c) Personal pickup; (d) EU-wide shipping (primarily for DIY kits).</p>
                <p>7.2 Delivery timeframes: Ready-made florariums and DIY kits (Cyprus): 3–7 business days. EU shipping: 5–15 business days. Custom orders: 2–6 weeks from design approval.</p>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                8. Right of withdrawal and returns
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p>8.1 For standard products, you have the right to withdraw within 14 calendar days without giving any reason.</p>
                <p>8.2 The 14-day right of withdrawal does NOT apply to: (a) Custom "Build Your Own" orders; (b) Handcrafted closed florariums containing living plants; (c) DIY kits containing live plant material.</p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                9. Warranty and liability
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p>9.1 You are entitled to a legal guarantee of conformity for two (2) years from delivery.</p>
                <p>9.2 The guarantee does not cover: natural changes in plant growth, deterioration from improper care, or damage during return shipping.</p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                10. Living plant disclaimer
              </h3>
              <div className="text-cream/80 leading-relaxed space-y-3">
                <p>Our products contain living plants, moss, and biological organisms. Variations in appearance are natural. Care instructions are provided with every florarium. We do not guarantee plant longevity as factors including temperature and light are beyond our control after delivery.</p>
              </div>
            </div>

            {/* Section 11-12 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                11. Intellectual property
              </h3>
              <p className="text-cream/80 leading-relaxed">All content on the Website is the property of Fairygarden For You Ltd and is protected by copyright, trademark, and intellectual property laws.</p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                12. Data protection (GDPR)
              </h3>
              <p className="text-cream/80 leading-relaxed">We process personal data in accordance with the EU GDPR and Cyprus Law 125(I)/2018. Full details are in our Privacy Policy.</p>
            </div>

            {/* Section 13-14 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                13. Governing law and jurisdiction
              </h3>
              <p className="text-cream/80 leading-relaxed">These Terms are governed by the laws of the Republic of Cyprus. Disputes are subject to the courts of Cyprus, unless otherwise required by EU law.</p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                14. Dispute resolution
              </h3>
              <p className="text-cream/80 leading-relaxed">Contact us first for complaints. You may also use the EU Online Dispute Resolution platform at: https://ec.europa.eu/consumers/odr</p>
            </div>

            {/* Section 15-16 */}
            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                15. Amendments to Terms
              </h3>
              <p className="text-cream/80 leading-relaxed">We may amend these Terms at any time. Changes will not apply retroactively to orders placed before the amendment.</p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-cinzel font-bold text-gold mb-3 sm:mb-4">
                16. Contact information
              </h3>
              <div className="text-cream/80 leading-relaxed">
                <p>Fairygarden For You Ltd</p>
                <p>Email: info@fairygarden4u.com</p>
                <p>Website: https://fairygarden4u.com</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center pt-6 sm:pt-8 border-t border-gold/20">
              <p className="text-cream/50 text-xs sm:text-sm">
                Last updated: March 2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsConditions;
