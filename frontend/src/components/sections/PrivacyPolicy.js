import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <section
      id="privacy-policy"
      className="relative py-24 px-4 min-h-screen"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-forest/90" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Shield className="w-16 h-16 text-gold mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-gold mb-4" data-testid="privacy-policy-title">
            Privacy Policy
          </h1>
          <p className="text-cream/80 font-montserrat text-lg">
            Last updated: February 2024
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-2xl p-8 md:p-12 space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Lock className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-cinzel font-bold text-gold mb-2">Information We Collect</h2>
                <p className="text-cream/80 font-montserrat leading-relaxed">
                  We collect information you provide directly to us, including your name, email address, phone number, and any other information you choose to provide when you contact us, register for workshops, or subscribe to our newsletter.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-cinzel font-bold text-gold mb-2">How We Use Your Information</h2>
                <p className="text-cream/80 font-montserrat leading-relaxed mb-3">
                  We use the information we collect to:
                </p>
                <ul className="text-cream/80 font-montserrat leading-relaxed space-y-2 list-disc list-inside">
                  <li>Process and fulfill your orders and registrations</li>
                  <li>Communicate with you about our products and services</li>
                  <li>Send you marketing communications (if you opted in)</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-cinzel font-bold text-gold mb-2">Data Security</h2>
                <p className="text-cream/80 font-montserrat leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-cinzel font-bold text-gold mb-2">Newsletter & Marketing</h2>
                <p className="text-cream/80 font-montserrat leading-relaxed">
                  If you opt in to receive our newsletter, we will send you periodic updates about our products, workshops, and special offers. You can unsubscribe at any time by clicking the unsubscribe link in any email we send you.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-cinzel font-bold text-gold mb-2">Your Rights</h2>
              <p className="text-cream/80 font-montserrat leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="text-cream/80 font-montserrat leading-relaxed space-y-2 list-disc list-inside">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-cinzel font-bold text-gold mb-2">Contact Us</h2>
              <p className="text-cream/80 font-montserrat leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
                <br />
                <span className="text-gold">contact@fairygarden.com</span>
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gold/20">
            <p className="text-cream/60 font-montserrat text-sm">
              By using our website and services, you consent to the collection and use of your information as described in this Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;