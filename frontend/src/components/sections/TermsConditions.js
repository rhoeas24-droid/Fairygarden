import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';

// Terms Modal Component - FULL UNABBREVIATED TEXT
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
          data-testid="terms-modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-4xl bg-forest border-2 border-gold/50 rounded-2xl shadow-2xl flex flex-col"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
            data-testid="terms-modal-content"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest border border-gold/30 text-gold hover:bg-gold hover:text-forest transition-all"
              data-testid="terms-modal-close"
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
                <p className="text-cream/50 font-montserrat text-xs mt-1">
                  Last updated: [DATE]
                </p>
              </div>
              
              {/* Full Content */}
              <div className="font-montserrat text-cream/90 space-y-6 text-sm leading-relaxed">
                
                {/* Section 1 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    1. General information and company details
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>1.1 These Terms and Conditions ("Terms") govern all purchases and orders made through the website https://fairygarden4u.com ("Website"), operated by:</p>
                    <div className="bg-black/20 p-4 rounded-lg my-3">
                      <p>Fairygarden For You Ltd</p>
                      <p>A company registered in the Republic of Cyprus</p>
                      <p>Registration Number: [REGISTRATION NUMBER]</p>
                      <p>VAT Number: [VAT NUMBER]</p>
                      <p>Registered Address: [REGISTERED ADDRESS, CYPRUS]</p>
                      <p>Email: [EMAIL ADDRESS]</p>
                      <p>Telephone: [PHONE NUMBER]</p>
                      <p>(hereinafter referred to as "we," "us," "our," or "the Company")</p>
                    </div>
                    <p>1.2 The Company is subject to the laws of the Republic of Cyprus, including the Consumer Protection Law of 2021 (Law 112(I)/2021), the Consumer Rights Law (Law 133(I)/2013), the Electronic Commerce Law (Law 156(I)/2004), and all applicable European Union regulations and directives governing consumer rights and e-commerce.</p>
                    <p>1.3 For any questions, complaints, or requests regarding these Terms, please contact us using the details provided in Section 16 below.</p>
                  </div>
                </section>

                {/* Section 2 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    2. Scope and applicability
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>2.1 These Terms apply to all contracts concluded between the Company and any natural person acting for purposes outside their trade, business, craft, or profession ("Customer" or "you") through the Website, by telephone, or by email.</p>
                    <p>2.2 By placing an order through the Website, you confirm that:</p>
                    <p className="ml-4">(a) you are at least 18 years of age or have the consent of a legal guardian;</p>
                    <p className="ml-4">(b) you have read, understood, and agree to be bound by these Terms;</p>
                    <p className="ml-4">(c) you have read and acknowledge our Privacy Policy, available at [PRIVACY POLICY URL].</p>
                    <p>2.3 These Terms are made available on the Website in a manner that allows you to store, download, and print them before placing your order, in compliance with Article 10(3) of EU Directive 2000/31/EC as transposed by Cyprus Law 156(I)/2004.</p>
                    <p>2.4 These Terms apply to all product categories offered through the Website, including ready-made terrariums, DIY terrarium kits, and custom "Build Your Own Terrarium" orders. Specific additional conditions for custom orders are set out in Section 5 below.</p>
                    <p>2.5 Where you are purchasing as a business (B2B), certain consumer protection provisions described in these Terms may not apply. Please contact us if you are purchasing for business purposes.</p>
                  </div>
                </section>

                {/* Section 3 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    3. Products and services
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>3.1 The Company offers the following products through the Website:</p>
                    <p className="ml-4">(a) <strong>Handcrafted closed terrariums</strong> — Self-sustaining glass ecosystems containing living plants, moss, and decorative elements. These are handmade products containing living organisms and are therefore subject to natural variation. Each terrarium is unique.</p>
                    <p className="ml-4">(b) <strong>DIY terrarium kits</strong> — Pre-packaged kits containing materials, tools, and instructions for building your own terrarium at home. These kits may or may not contain living plant material, as indicated on the individual product page.</p>
                    <p className="ml-4">(c) <strong>Custom "Build Your Own Terrarium" orders</strong> — Bespoke terrariums designed and built to your individual specifications through our online configurator and design consultation process. These are made-to-order products and are subject to the special conditions in Section 5.</p>
                    <p>3.2 Product descriptions, images, and specifications on the Website are provided as accurately as possible. However, because our products are handcrafted and contain living organisms:</p>
                    <p className="ml-4">(a) slight variations in colour, size, shape, and plant growth between the product image and the delivered product are normal and do not constitute a defect;</p>
                    <p className="ml-4">(b) plant species may be substituted with visually similar species if the specified species is unavailable at the time of assembly, unless otherwise agreed in writing for custom orders.</p>
                    <p>3.3 All products are subject to availability. We reserve the right to discontinue any product at any time without prior notice.</p>
                  </div>
                </section>

                {/* Section 4 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    4. Ordering process
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p><strong>4.1 Placing an order.</strong> To place an order for a ready-made terrarium or DIY kit, follow these steps:</p>
                    <p className="ml-4">(a) Select your product(s) and add them to your shopping cart.</p>
                    <p className="ml-4">(b) Review your cart and proceed to checkout.</p>
                    <p className="ml-4">(c) Enter your delivery and billing details.</p>
                    <p className="ml-4">(d) Select your preferred delivery method (see Section 7).</p>
                    <p className="ml-4">(e) Select your preferred payment method (see Section 6).</p>
                    <p className="ml-4">(f) Review your order summary, including total price with VAT and delivery charges.</p>
                    <p className="ml-4">(g) Confirm that you have read and accept these Terms by ticking the checkbox provided.</p>
                    <p className="ml-4">(h) Click the "Order with obligation to pay" button (or equivalent) to submit your order.</p>
                    <p><strong>4.2 Order confirmation.</strong> After submitting your order, you will receive an automatic order acknowledgement by email. This acknowledgement confirms that we have received your order but does not constitute acceptance of your order. A binding contract is formed only when we send you a separate order confirmation email ("Order Confirmation") or when we dispatch the goods, whichever occurs first.</p>
                    <p><strong>4.3 Right to refuse orders.</strong> We reserve the right to refuse or cancel any order for legitimate reasons, including but not limited to: product unavailability, pricing errors on the Website, suspicion of fraud, or inability to deliver to the specified address. If we refuse your order after payment has been taken, we will issue a full refund within 14 days.</p>
                    <p><strong>4.4 Custom orders.</strong> For custom "Build Your Own Terrarium" orders, the ordering process differs from the above. Please refer to Section 5 for full details.</p>
                  </div>
                </section>

                {/* Section 5 - IMPORTANT Custom Orders */}
                <section className="bg-gold/10 border border-gold/40 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3 flex items-center gap-2 flex-wrap">
                    <span className="bg-gold text-forest px-2 py-1 rounded text-xs">⚠️ IMPORTANT</span>
                    5. Custom terrarium orders ("Build Your Own")
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p className="font-bold text-gold/90">IMPORTANT NOTICE: Custom terrarium orders are bespoke products made to your individual specifications. Under Article 16(c) of EU Directive 2011/83/EU and Cyprus Law 133(I)/2013, goods made to the consumer's specifications or clearly personalised are exempt from the 14-day statutory right of withdrawal. By placing a custom order, you acknowledge and accept that you will not have the right to cancel under the statutory cooling-off period. Please read this entire section carefully before proceeding.</p>
                    
                    <p className="font-semibold text-gold mt-4">5.1 Configurator and price calculation</p>
                    <p>5.1.1 The Website features an online configurator that allows you to design your own terrarium by selecting options including but not limited to: container type and size, plant species and arrangement, moss varieties, decorative elements, soil composition, and optional accessories.</p>
                    <p>5.1.2 The configurator generates an estimated price based on your selections. This estimate is provided for informational purposes and serves as a starting point for your order. The estimated price is not the final price. The final price will be determined following the consultation and design process described in Section 5.3 and confirmed in the written order form.</p>
                    <p>5.1.3 The estimated price includes VAT at the applicable rate but does not include delivery charges, which will be quoted separately.</p>
                    
                    <p className="font-semibold text-gold mt-4">5.2 Deposit payment (30%) and what it covers</p>
                    <p>5.2.1 To confirm your custom order and initiate the design process, a non-refundable deposit of 30% of the configurator's estimated price ("Deposit") is required. The Deposit is payable at the time of order submission through the payment methods described in Section 6.</p>
                    <p>5.2.2 The Deposit constitutes earnest money and part-payment toward the final contract price. It serves as a guarantee of your commitment to the order and covers the following services and costs incurred by the Company upon receipt:</p>
                    <p className="ml-4">(a) A personal consultation (verbal, by phone or video call) to discuss your vision, preferences, and requirements in detail;</p>
                    <p className="ml-4">(b) Preparation and delivery of a written order form documenting the agreed specifications;</p>
                    <p className="ml-4">(c) Creation and delivery of three (3) bespoke design proposals, including visual renders or mockups, tailored to your individual specifications;</p>
                    <p className="ml-4">(d) Administrative costs including materials research, sourcing assessment, and scheduling.</p>
                    <p>5.2.3 The design consultation and proposal services described in Section 5.2.2 are professional creative services that commence immediately upon receipt of the Deposit. These services have independent commercial value and represent genuine costs incurred by the Company.</p>
                    <p>5.2.4 By paying the Deposit, you expressly acknowledge that:</p>
                    <p className="ml-4">(a) your order is for a bespoke product made to your specifications;</p>
                    <p className="ml-4">(b) the statutory 14-day right of withdrawal does not apply to this order under Article 16(c) of EU Directive 2011/83/EU;</p>
                    <p className="ml-4">(c) the Deposit is non-refundable in the circumstances described in Section 5.5;</p>
                    <p className="ml-4">(d) the design and consultation services will commence before the expiry of any withdrawal period that might otherwise apply.</p>
                    
                    <p className="font-semibold text-gold mt-4">5.3 Consultation and design approval process</p>
                    <p>5.3.1 Following receipt of the Deposit, we will contact you within 5 business days to schedule the consultation described in Section 5.2.2(a).</p>
                    <p>5.3.2 Based on the consultation, we will prepare and send you a written order form detailing the agreed specifications, materials, dimensions, and any special requirements. The written order form supersedes any selections made in the online configurator.</p>
                    <p>5.3.3 We will then create and deliver three (3) design proposals with visual renders based on the written order form. You may:</p>
                    <p className="ml-4">(a) Approve one of the three proposals — in which case we proceed to production;</p>
                    <p className="ml-4">(b) Request reasonable modifications to one of the proposals — we will accommodate minor adjustments at no additional cost. Significant changes that alter the scope, materials, or complexity of the design may result in a revised price, which will be communicated to you for approval before proceeding;</p>
                    <p className="ml-4">(c) Decline all three proposals — in which case the consequences described in Section 5.5 and 5.6 apply.</p>
                    <p>5.3.4 The design approval process should be completed within 30 calendar days from the date the three proposals are delivered to you. If you do not respond within this period, we will send a reminder. If no response is received within 14 calendar days of the reminder, we reserve the right to treat the order as cancelled by you, and the provisions of Section 5.6 shall apply.</p>
                    
                    <p className="font-semibold text-gold mt-4">5.4 Final price and balance payment</p>
                    <p>5.4.1 The final price of your custom terrarium is determined by the specifications set out in the approved written order form and the selected design proposal. The final price may differ from the configurator's estimated price due to changes in specifications, material availability, design complexity, or other factors identified during the consultation process.</p>
                    <p>5.4.2 If the final price exceeds the configurator's estimated price, we will notify you of the revised price before commencing production. You may choose to:</p>
                    <p className="ml-4">(a) Accept the revised price and proceed;</p>
                    <p className="ml-4">(b) Modify the specifications to reduce the price;</p>
                    <p className="ml-4">(c) Cancel the order, subject to the provisions of Section 5.6.</p>
                    <p>5.4.3 The balance (final price minus the Deposit already paid) is due and payable at the time of personal pickup or upon delivery, using any of the payment methods described in Section 6.</p>
                    <p>5.4.4 We will not commence production of your custom terrarium until a design has been approved and, where applicable, a revised price has been accepted.</p>
                    
                    <p className="font-semibold text-gold mt-4">5.5 Non-refundable deposit policy</p>
                    <p>5.5.1 The Deposit is non-refundable in the following circumstances:</p>
                    <p className="ml-4">(a) You decline all three design proposals and choose not to proceed with the order;</p>
                    <p className="ml-4">(b) You cancel the order after the consultation has taken place, regardless of the stage of the design process;</p>
                    <p className="ml-4">(c) The order is deemed cancelled due to your non-responsiveness under Section 5.3.4;</p>
                    <p className="ml-4">(d) You cancel the order after production has commenced.</p>
                    <p>5.5.2 Legal basis for non-refundability. The retention of the Deposit is justified on the following grounds:</p>
                    <p className="ml-4">(a) Bespoke goods exemption: Your custom terrarium is a product made to your individual specifications within the meaning of Article 16(c) of EU Directive 2011/83/EU, as transposed into Cyprus law by Law 133(I)/2013. The statutory right of withdrawal does not apply.</p>
                    <p className="ml-4">(b) Services already rendered: Upon receipt of the Deposit, the Company immediately commences professional design services (consultation, order documentation, creation of three bespoke design proposals with visual renders). These services have been fully or substantially performed and cannot be "returned."</p>
                    <p className="ml-4">(c) Genuine pre-estimate of loss: The Deposit amount (30% of the estimated price) represents a genuine pre-estimate of the costs and losses the Company incurs when a custom order does not proceed, including but not limited to: designer time, material research, administrative costs, and lost opportunity to serve other customers during the reserved time.</p>
                    <p>5.5.3 The Deposit cannot be converted into store credit, applied to a different order, or transferred to another person.</p>
                    <p>5.5.4 Nothing in this section affects your statutory rights in the event that the Company is at fault — for example, if we fail to provide the consultation or design proposals as described, or if we materially breach these Terms.</p>
                    
                    <p className="font-semibold text-gold mt-4">5.6 Cancellation by customer</p>
                    <p>5.6.1 If you wish to cancel a custom order before the consultation has taken place and before any design work has commenced, please contact us as soon as possible. In this limited circumstance, we will make reasonable efforts to refund the Deposit in full, less any administrative costs already incurred, within 14 days.</p>
                    <p>5.6.2 If you cancel after the consultation has taken place or after any design proposal has been delivered, the Deposit is non-refundable as described in Section 5.5.</p>
                    <p>5.6.3 If you cancel after production has commenced, you shall be liable for the full Deposit plus any additional costs of materials purchased and work completed up to the date of cancellation. We will provide you with a breakdown of these costs.</p>
                    <p>5.6.4 Cancellation by the Company. If we are unable to fulfil your custom order for reasons within our control (for example, inability to source specified materials, capacity constraints, or any other reason not attributable to you), we will:</p>
                    <p className="ml-4">(a) Notify you promptly;</p>
                    <p className="ml-4">(b) Refund the Deposit in full within 14 days;</p>
                    <p className="ml-4">(c) Where applicable, offer reasonable compensation for any inconvenience caused. This provision ensures reciprocity in the parties' rights and obligations.</p>
                  </div>
                </section>

                {/* Section 6 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    6. Pricing and payment methods
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p><strong>6.1 Prices.</strong> All prices displayed on the Website are in Euros (€) and include VAT at the applicable rate (currently 19% in Cyprus). Where a different VAT rate applies due to your delivery destination within the EU, the applicable rate will be calculated and displayed at checkout.</p>
                    <p><strong>6.2 Delivery charges.</strong> Delivery charges are calculated based on the delivery method selected and the destination. These charges are displayed separately at checkout before you confirm your order and are not included in the product price.</p>
                    <p><strong>6.3 Total price.</strong> The total price payable is the sum of the product price (including VAT), delivery charges, and any other charges clearly indicated at checkout. No additional charges will be applied without your express consent.</p>
                    <p><strong>6.4 Payment methods.</strong> We accept the following payment methods:</p>
                    <p className="ml-4">(a) Credit or debit card (processed securely online through our payment gateway);</p>
                    <p className="ml-4">(b) Bank transfer (to our Cyprus bank account; details provided at checkout or upon request);</p>
                    <p className="ml-4">(c) PayPal;</p>
                    <p className="ml-4">(d) Cash (available only for personal pickup orders, payable at the time of collection).</p>
                    <p><strong>6.5 Payment timing.</strong> For ready-made terrariums and DIY kits, full payment is required at the time of order. For custom "Build Your Own" orders, payment is split as described in Section 5 (30% Deposit at order, balance at pickup/delivery).</p>
                    <p><strong>6.6 Payment security.</strong> All online card payments are processed through a secure, PCI DSS-compliant payment gateway. We do not store your full card details on our servers.</p>
                    <p><strong>6.7 Currency.</strong> All transactions are processed in Euros (€).</p>
                    <p><strong>6.8 Cross-border VAT.</strong> For deliveries to EU countries outside Cyprus, VAT is charged at the rate applicable in your country of delivery, in accordance with the EU One-Stop Shop (OSS) scheme, where applicable. The final VAT amount is displayed at checkout.</p>
                  </div>
                </section>

                {/* Section 7 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    7. Delivery and shipping
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p><strong>7.1 Delivery options.</strong> We offer the following delivery methods:</p>
                    <p className="ml-4">(a) Pickup points and parcel lockers (Cyprus only) — Your order is delivered to a pickup point or parcel locker of your choice within Cyprus. Available locations are displayed at checkout. You will be notified by email and/or SMS when your order is ready for collection.</p>
                    <p className="ml-4">(b) Home delivery (Cyprus) — Your order is delivered to the address you provide at checkout. Delivery is carried out by our logistics partner.</p>
                    <p className="ml-4">(c) Personal pickup — You may collect your order from our premises at an agreed time. No delivery charge applies. Payment of the balance (for custom orders) or full payment (for standard orders paid by cash) is due at the time of collection.</p>
                    <p className="ml-4">(d) EU-wide shipping — Available primarily for DIY terrarium kits and other non-perishable products. Handcrafted closed terrariums containing living plants may be available for EU shipping on a case-by-case basis, subject to seasonal conditions and shipping feasibility. Please contact us before ordering a live terrarium for delivery outside Cyprus.</p>
                    <p><strong>7.2 Delivery timeframes.</strong> Ready-made terrariums and DIY kits (Cyprus): typically 3–7 business days from Order Confirmation. EU shipping (DIY kits): typically 5–15 business days from Order Confirmation, depending on destination. Custom orders: delivery/pickup will be arranged following completion of production, typically 2–6 weeks from design approval, depending on complexity. These timeframes are estimates. In all cases, delivery will be completed within a maximum of 30 days from Order Confirmation, unless a different timeframe has been expressly agreed, in accordance with Cyprus Law 133(I)/2013.</p>
                    <p><strong>7.3 Delivery delays.</strong> If we are unable to deliver within the agreed timeframe, we will notify you as soon as possible. If delivery is not made within 30 days (or the agreed extended timeframe), you may cancel your order and receive a full refund, except where the delay is attributable to force majeure. This does not apply to custom orders where the production timeline has been separately agreed.</p>
                    <p><strong>7.4 Risk and title.</strong> Risk of loss or damage to the goods passes to you upon delivery (i.e., when you or a person designated by you, other than the carrier, acquires physical possession of the goods). Title to the goods passes to you upon receipt of full payment.</p>
                    <p><strong>7.5 Delivery to the correct address.</strong> It is your responsibility to provide a complete and accurate delivery address. We are not liable for delays or failed deliveries caused by incorrect address information provided by you.</p>
                    <p><strong>7.6 Inspection upon delivery.</strong> We strongly encourage you to inspect your order upon delivery or collection. If external packaging shows visible signs of damage, please note this when signing for delivery and contact us within 48 hours with photographs. For living plant products, please refer to Section 10 (Living Plant Disclaimer).</p>
                    <p><strong>7.7 International shipping restrictions.</strong> Certain products containing living plant material may be subject to phytosanitary regulations, import restrictions, or seasonal shipping limitations. It is your responsibility to verify that import of living plants is permitted in your country. We are not liable for goods seized or destroyed by customs authorities due to import restrictions.</p>
                  </div>
                </section>

                {/* Section 8 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    8. Right of withdrawal and returns
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p className="font-semibold text-gold">8.1 Standard products — 14-day right of withdrawal</p>
                    <p>8.1.1 If you are a consumer in the European Union, you have the right to withdraw from a distance contract within 14 calendar days without giving any reason, in accordance with EU Directive 2011/83/EU and Cyprus Law 133(I)/2013.</p>
                    <p>8.1.2 Withdrawal period. The withdrawal period expires 14 calendar days from the day on which you, or a third party indicated by you (other than the carrier), acquires physical possession of the goods. If your order contains multiple items delivered separately, the period runs from receipt of the last item.</p>
                    <p>8.1.3 How to exercise your right. To exercise your right of withdrawal, you must inform us of your decision by an unequivocal statement sent to:</p>
                    <div className="bg-black/20 p-3 rounded-lg my-2">
                      <p>Fairygarden For You Ltd</p>
                      <p>Email: [EMAIL ADDRESS]</p>
                      <p>Telephone: [PHONE NUMBER]</p>
                      <p>Address: [REGISTERED ADDRESS]</p>
                    </div>
                    <p>You may use the model withdrawal form provided in Annex A below, but this is not mandatory. You may also submit a withdrawal request through the contact form on our Website.</p>
                    <p>8.1.4 Effects of withdrawal. If you withdraw from the contract:</p>
                    <p className="ml-4">(a) We will reimburse all payments received from you, including standard delivery costs (but not supplementary costs if you chose a delivery method more expensive than the least expensive standard delivery we offer).</p>
                    <p className="ml-4">(b) Reimbursement will be made within 14 days from the day we are informed of your decision to withdraw, using the same payment method you used for the original transaction, unless you expressly agree otherwise.</p>
                    <p className="ml-4">(c) We may withhold reimbursement until we have received the goods back or you have provided proof of having sent them back, whichever is earliest.</p>
                    <p>8.1.5 Returning goods. You must send the goods back to us without undue delay and in any event within 14 days from the day you communicate your withdrawal. You bear the direct cost of returning the goods. Goods must be returned in their original condition, unused, and in their original packaging where possible. You are liable for any diminished value of the goods resulting from handling other than what is necessary to establish the nature, characteristics, and functioning of the goods.</p>
                    
                    <p className="font-semibold text-gold mt-4">8.1.6 Model withdrawal form (Annex A):</p>
                    <div className="bg-black/20 p-4 rounded-lg my-2 text-sm">
                      <p>To: Fairygarden For You Ltd, [REGISTERED ADDRESS], [EMAIL ADDRESS]</p>
                      <p className="mt-2">I hereby give notice that I withdraw from my contract of sale of the following goods:</p>
                      <p>— Product(s): _______________</p>
                      <p>— Order number: _______________</p>
                      <p>— Ordered on / received on: _______________</p>
                      <p>— Name of consumer: _______________</p>
                      <p>— Address of consumer: _______________</p>
                      <p>— Date: _______________</p>
                      <p>— Signature (only if sent on paper): _______________</p>
                    </div>
                    
                    <p className="font-semibold text-gold mt-4">8.2 Exceptions — custom orders, living plants, and perishable goods</p>
                    <p>8.2.1 The 14-day right of withdrawal described in Section 8.1 does NOT apply to the following:</p>
                    <p className="ml-4">(a) Custom "Build Your Own Terrarium" orders — These are goods made to your individual specifications within the meaning of Article 16(c) of EU Directive 2011/83/EU. Because these products are bespoke and cannot be resold to another customer, the right of withdrawal is excluded. The deposit and cancellation provisions in Section 5 apply instead.</p>
                    <p className="ml-4">(b) Handcrafted closed terrariums containing living plants — These products contain living organisms (plants, moss, microorganisms) that are liable to deteriorate if not maintained in their sealed environment. Once assembled and sealed, each terrarium becomes a unique, living ecosystem. We rely on Article 16(d) of EU Directive 2011/83/EU (goods liable to deteriorate or expire rapidly) and, where the terrarium has been made or customised to any extent to the customer's order, Article 16(c) (goods made to the consumer's specifications).</p>
                    <p className="ml-4">(c) DIY kits containing live plant material — Where a DIY kit includes living plants, moss, or other perishable biological material, the right of withdrawal may be excluded under Article 16(d) in respect of the perishable components. If a DIY kit contains only non-perishable materials (soil, tools, containers, decorations, instructions), the standard 14-day withdrawal right applies.</p>
                    <p>8.2.2 Before you complete your purchase of any product to which an exception applies, the Website will clearly inform you that the right of withdrawal does not apply and require your express acknowledgement, in compliance with Article 6(1)(k) of EU Directive 2011/83/EU.</p>
                    <p>8.2.3 Defective goods. The exceptions above apply only to the right of withdrawal (i.e., changing your mind). They do not affect your statutory rights if goods are defective, not as described, or not fit for purpose. If you receive a defective product, please see Section 9 (Warranty & Liability).</p>
                  </div>
                </section>

                {/* Section 9 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    9. Warranty and liability
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p><strong>9.1 Legal guarantee of conformity.</strong> Under EU Directive 2019/771 (Sale of Goods Directive) and Cyprus law, all goods must conform to the contract at the time of delivery. You are entitled to a legal guarantee of conformity for a period of two (2) years from the date of delivery. During this period, if goods are found to be non-conforming (defective, not as described, or not fit for the purpose communicated to us), you are entitled to request:</p>
                    <p className="ml-4">(a) Repair or replacement of the goods, free of charge;</p>
                    <p className="ml-4">(b) A proportionate reduction in price; or</p>
                    <p className="ml-4">(c) Termination of the contract and a full refund, in accordance with the hierarchy of remedies established by law.</p>
                    <p><strong>9.2 Limitation for living products.</strong> Given the nature of products containing living organisms, the legal guarantee of conformity applies to defects in craftsmanship, materials, and the condition of plants at the time of delivery. It does not cover:</p>
                    <p className="ml-4">(a) Natural changes in plant growth, colour, or appearance over time;</p>
                    <p className="ml-4">(b) Deterioration caused by improper care, exposure to extreme temperatures, direct sunlight, or failure to follow the care instructions provided;</p>
                    <p className="ml-4">(c) Damage caused during the return shipping process where the consumer chose to return the product under the right of withdrawal (where applicable).</p>
                    <p><strong>9.3 Burden of proof.</strong> For the first 12 months from delivery, any lack of conformity that becomes apparent is presumed to have existed at the time of delivery, unless this presumption is incompatible with the nature of the goods or the nature of the lack of conformity. After 12 months, the burden of proof shifts to you.</p>
                    <p><strong>9.4 Reporting defects.</strong> If you believe your product is defective, please contact us within a reasonable time of discovering the defect, providing:</p>
                    <p className="ml-4">(a) Your order number and date of purchase;</p>
                    <p className="ml-4">(b) A description of the defect;</p>
                    <p className="ml-4">(c) Photographs or video clearly showing the issue.</p>
                    <p>We will assess the defect and respond within 10 business days with our proposed remedy.</p>
                    <p><strong>9.5 Limitation of liability.</strong> To the maximum extent permitted by law:</p>
                    <p className="ml-4">(a) Our total liability under or in connection with any contract shall not exceed the total price paid by you for the relevant product(s).</p>
                    <p className="ml-4">(b) We shall not be liable for any indirect, incidental, special, or consequential damages, including loss of profit, loss of data, or loss of goodwill.</p>
                    <p className="ml-4">(c) Nothing in these Terms excludes or limits our liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under applicable law.</p>
                    <p><strong>9.6 Force majeure.</strong> We shall not be liable for any failure or delay in performing our obligations where such failure or delay results from events beyond our reasonable control, including but not limited to: natural disasters, pandemics, war, government actions, strikes, supply chain disruptions, or extreme weather conditions affecting the viability of living plant products.</p>
                  </div>
                </section>

                {/* Section 10 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    10. Living plant disclaimer
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>10.1 Our handcrafted terrariums and certain DIY kits contain living plants, moss, and biological organisms. By purchasing these products, you acknowledge and accept the following:</p>
                    <p><strong>10.2 Living organisms are inherently variable.</strong> No two living plants are identical. Variations in leaf shape, colour, size, growth pattern, and overall appearance are natural characteristics, not defects. The product you receive may differ in appearance from Website photographs.</p>
                    <p><strong>10.3 Care requirements.</strong> Closed terrariums are designed to be largely self-sustaining, but they still require basic care. Detailed care instructions are provided with every terrarium and are also available on the Website. Failure to follow care instructions may result in plant deterioration or death, for which we cannot accept responsibility.</p>
                    <p><strong>10.4 Seasonal and environmental factors.</strong> Living plants may be affected by temperature extremes during shipping. We take reasonable precautions (insulated packaging, heat packs in winter, and shipping on appropriate days), but we cannot guarantee that plants will not be affected by conditions during transit, particularly for long-distance or international deliveries. If you receive a terrarium with visible plant damage due to transit, please contact us within 48 hours with photographs for assessment.</p>
                    <p><strong>10.5 Plant substitution.</strong> We reserve the right to substitute plant species with visually similar alternatives if a specified species is unavailable due to seasonal factors, supply issues, or plant health considerations. For custom orders, we will notify you of any substitution before proceeding.</p>
                    <p><strong>10.6 No guarantee of plant longevity.</strong> While closed terrariums can thrive for years with proper care, we do not guarantee the lifespan of any living plant. Factors including ambient temperature, light conditions, and handling are beyond our control once the product is delivered.</p>
                    <p><strong>10.7 Allergens.</strong> Terrariums contain soil, moss, and organic matter. Persons with allergies to mould, soil organisms, or specific plant species should exercise caution. If you have known allergies, please contact us before purchasing to discuss plant options.</p>
                  </div>
                </section>

                {/* Section 11 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    11. Intellectual property
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>11.1 All content on the Website — including but not limited to text, images, photographs, graphics, logos, design elements, product descriptions, video content, and software — is the property of Fairygarden For You Ltd or its licensors and is protected by copyright, trademark, and other intellectual property laws of the Republic of Cyprus and the European Union.</p>
                    <p>11.2 You may not reproduce, distribute, modify, publicly display, or create derivative works from any content on the Website without our prior written consent.</p>
                    <p>11.3 Custom design proposals. The design proposals, visual renders, and creative materials produced as part of the custom order process (Section 5) remain the intellectual property of the Company. Approval of a design for production grants you the right to receive the physical product, but does not transfer ownership of the underlying design, render files, or creative concepts. You may not reproduce, share, or use these materials for any commercial purpose.</p>
                    <p>11.4 Customer content. By submitting images, descriptions, or specifications through the online configurator or during the consultation process, you grant us a non-exclusive, royalty-free licence to use this content solely for the purpose of fulfilling your order.</p>
                  </div>
                </section>

                {/* Section 12 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    12. Data protection (GDPR)
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>12.1 We collect and process personal data in accordance with the EU General Data Protection Regulation (Regulation (EU) 2016/679, "GDPR") and Cyprus Law 125(I)/2018 on the Protection of Natural Persons with Regard to the Processing of Personal Data.</p>
                    <p>12.2 Full details of how we collect, use, store, and protect your personal data are set out in our separate Privacy Policy, available at [PRIVACY POLICY URL]. We strongly encourage you to read the Privacy Policy before placing an order.</p>
                    <p>12.3 By placing an order, you acknowledge that we will process your personal data as necessary for the performance of the contract (GDPR Article 6(1)(b)), including:</p>
                    <p className="ml-4">(a) Processing your order and payment;</p>
                    <p className="ml-4">(b) Arranging delivery;</p>
                    <p className="ml-4">(c) Communicating with you about your order;</p>
                    <p className="ml-4">(d) Providing after-sales support and honouring our warranty obligations;</p>
                    <p className="ml-4">(e) Complying with legal and tax obligations (GDPR Article 6(1)(c)).</p>
                    <p>12.4 Marketing communications will only be sent with your express consent, obtained separately from your acceptance of these Terms. You may withdraw consent at any time.</p>
                    <p>12.5 Data Protection Authority. The supervisory authority for data protection in Cyprus is the Commissioner for Personal Data Protection (Γραφείο Επιτρόπου Προστασίας Δεδομένων Προσωπικού Χαρακτήρα):</p>
                    <div className="bg-black/20 p-3 rounded-lg my-2">
                      <p>Address: 15 Kypranoros Street, 1061 Nicosia, Cyprus</p>
                      <p>Website: https://www.dataprotection.gov.cy</p>
                    </div>
                    <p>You have the right to lodge a complaint with the Commissioner if you believe your data protection rights have been violated.</p>
                  </div>
                </section>

                {/* Section 13 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    13. Governing law and jurisdiction
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>13.1 These Terms and any contracts concluded through the Website are governed by and construed in accordance with the laws of the Republic of Cyprus.</p>
                    <p>13.2 Any disputes arising from or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the Republic of Cyprus, unless otherwise required by mandatory provisions of EU law.</p>
                    <p>13.3 Mandatory consumer protection. If you are a consumer habitually resident in another EU Member State, you shall also benefit from any mandatory provisions of the consumer protection law of that Member State that cannot be derogated from by agreement, in accordance with Article 6(2) of Regulation (EC) No 593/2008 (Rome I Regulation). Nothing in these Terms restricts your rights under such mandatory provisions.</p>
                    <p>13.4 For consumers habitually resident in the EU, these Terms do not deprive you of the right to bring proceedings in the courts of your place of habitual residence, in accordance with Regulation (EU) No 1215/2012 (Brussels I Regulation).</p>
                  </div>
                </section>

                {/* Section 14 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    14. Dispute resolution
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p><strong>14.1 Direct resolution.</strong> If you have a complaint about any product or service, we encourage you to contact us first at [EMAIL ADDRESS] or [PHONE NUMBER]. We will endeavour to resolve your complaint amicably within 15 business days.</p>
                    <p><strong>14.2 EU Online Dispute Resolution (ODR) platform.</strong> In accordance with Regulation (EU) No 524/2013, the European Commission provides an Online Dispute Resolution platform for consumers who wish to resolve disputes arising from online purchases without going to court. The platform is accessible at: https://ec.europa.eu/consumers/odr</p>
                    <p>Our email address for ODR purposes is: [EMAIL ADDRESS]</p>
                    <p><strong>14.3 Alternative Dispute Resolution (ADR).</strong> Under Cyprus Law 85(I)/2017 (transposing EU Directive 2013/11/EU on consumer ADR), you may also refer disputes to an approved Alternative Dispute Resolution entity in Cyprus. A list of approved ADR entities is available from the Cyprus Consumer Protection Service at https://consumer.gov.cy.</p>
                    <p><strong>14.4 European Consumer Centre (ECC) Cyprus.</strong> For cross-border disputes within the EU, you may also contact ECC Cyprus, which provides free advice and assistance to consumers with cross-border complaints within the EU and EEA.</p>
                    <p>14.5 The availability of ADR and ODR mechanisms does not affect your right to bring legal proceedings before the competent courts.</p>
                  </div>
                </section>

                {/* Section 15 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    15. Amendments to Terms
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>15.1 We reserve the right to amend these Terms at any time. The updated Terms will be published on the Website with the "Last updated" date clearly indicated at the top of the document.</p>
                    <p>15.2 Changes to these Terms will not apply retroactively to orders placed before the date of the amendment. The Terms in effect at the time you place your order will govern that transaction.</p>
                    <p>15.3 We encourage you to review these Terms periodically. Continued use of the Website after changes have been published constitutes acknowledgement of the amended Terms for future transactions.</p>
                    <p>15.4 If any material changes affect your rights as a consumer, we will take reasonable steps to notify registered customers by email.</p>
                  </div>
                </section>

                {/* Section 16 */}
                <section>
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    16. Contact information
                  </h3>
                  <div className="text-cream/80 space-y-3 text-justify">
                    <p>For any questions, concerns, or complaints regarding these Terms, your order, or our products and services, please contact us:</p>
                    <div className="bg-black/20 p-4 rounded-lg my-2">
                      <p className="font-semibold text-gold">Fairygarden For You Ltd</p>
                      <p>Email: [EMAIL ADDRESS]</p>
                      <p>Telephone: [PHONE NUMBER]</p>
                      <p>Address: [REGISTERED ADDRESS, CYPRUS]</p>
                      <p>Website: https://fairygarden4u.com</p>
                    </div>
                    <p>Our customer service team is available [BUSINESS HOURS, e.g., Monday–Friday, 9:00–17:00 EET].</p>
                  </div>
                </section>

                {/* Annex A */}
                <section className="bg-black/20 p-4 sm:p-6 rounded-xl">
                  <h3 className="text-lg font-cinzel font-bold text-gold mb-3">
                    Annex A — Model withdrawal form
                  </h3>
                  <p className="text-cream/70 text-xs mb-3">(Complete and return this form only if you wish to withdraw from the contract)</p>
                  <div className="text-cream/80 space-y-2 text-sm">
                    <p><strong>To:</strong></p>
                    <p>Fairygarden For You Ltd</p>
                    <p>[REGISTERED ADDRESS]</p>
                    <p>[EMAIL ADDRESS]</p>
                    <p className="mt-3">I hereby give notice that I withdraw from my contract of sale of the following goods:</p>
                    <p className="mt-2">Product(s): _______________________________________________</p>
                    <p>Order number: ____________________________________________</p>
                    <p>Ordered on: ________________ / Received on: _________________</p>
                    <p className="mt-2">Name of consumer: ________________________________________</p>
                    <p>Address of consumer: ______________________________________</p>
                    <p className="mt-2">Date: ____________________________________________________</p>
                    <p>Signature (only if this form is sent on paper): __________________</p>
                  </div>
                </section>

                {/* Last Updated */}
                <div className="text-center pt-6 border-t border-gold/20">
                  <p className="text-cream/50 text-xs">
                    These Terms and Conditions were last updated on [DATE]
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
