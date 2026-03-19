import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Mail } from 'lucide-react';

const CorporateHome = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-bold mb-3 leading-tight">
                <span className="text-gold italic">Florarium Solutions</span><br />
                <span className="text-cream">for Teams & Brands</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl font-cinzel text-gold/70 mb-4">
                Creative. Reflective. Impactful.
              </p>
              
              <div className="w-12 h-0.5 bg-gold/40 mb-4" />
              
              <p className="text-cream/75 font-montserrat text-sm sm:text-base leading-relaxed">
                We offer transformative team experiences and elegant brand solutions with handcrafted, self-sustaining living compositions designed to inspire & impress.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img
                  src="/business_gift_exclusive.png"
                  alt="Elegant Florarium"
                  className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-gold/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Choose Your Path Section */}
      <section id="choose-path" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-gold italic mb-3">
              Choose Your Path
            </h2>
            <p className="text-cream/60 font-montserrat text-sm sm:text-base max-w-xl mx-auto">
              Team-building workshops or branded botanical displays,<br className="hidden sm:block" />
              tailored for your organization.
            </p>
          </motion.div>

          {/* Two Cards - Equal Size */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Team Experiences Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="h-full"
            >
              <div className="relative overflow-hidden rounded-lg border border-gold/20 bg-forest/40 backdrop-blur-sm h-full flex flex-col">
                {/* Image */}
                <div className="h-[220px] sm:h-[260px] overflow-hidden">
                  <img
                    src="/business_teambuilding.png"
                    alt="Team Experiences"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-2">
                    Team Experiences
                  </h3>
                  <p className="text-cream/65 font-montserrat text-sm leading-relaxed mb-5 flex-1">
                    Bring your team together through shared creation, reflection, and collaboration.
                  </p>
                  
                  {/* Styled Gold Button */}
                  <Link
                    to="/corporate/experiences"
                    className="inline-flex items-center justify-between w-full max-w-[220px] px-4 py-2.5 
                      bg-gradient-to-r from-[#C9A84C] via-[#D4B65A] to-[#C9A84C] 
                      text-forest font-montserrat font-semibold text-sm
                      rounded border border-[#A88A3D]
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]
                      hover:from-[#D4B65A] hover:via-[#E0C26A] hover:to-[#D4B65A]
                      transition-all duration-200"
                    data-testid="explore-experiences-btn"
                  >
                    <span>Explore Experiences</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Florarium Solutions Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-full"
            >
              <div className="relative overflow-hidden rounded-lg border border-gold/20 bg-forest/40 backdrop-blur-sm h-full flex flex-col">
                {/* Image */}
                <div className="h-[220px] sm:h-[260px] overflow-hidden">
                  <img
                    src="/business_office_decor.png"
                    alt="Florarium Solutions"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-gold mb-2">
                    Florarium Solutions
                  </h3>
                  <p className="text-cream/65 font-montserrat text-sm leading-relaxed mb-5 flex-1">
                    Enhance your brand presence through elegant, living compositions —
                  </p>
                  
                  {/* Styled Gold Button */}
                  <Link
                    to="/corporate/solutions"
                    className="inline-flex items-center justify-between w-full max-w-[260px] px-4 py-2.5 
                      bg-gradient-to-r from-[#C9A84C] via-[#D4B65A] to-[#C9A84C] 
                      text-forest font-montserrat font-semibold text-sm
                      rounded border border-[#A88A3D]
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]
                      hover:from-[#D4B65A] hover:via-[#E0C26A] hover:to-[#D4B65A]
                      transition-all duration-200"
                    data-testid="explore-solutions-btn"
                  >
                    <span>Explore Florarium Solutions</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-3">
              Let's Create Something Unique
            </h2>
            <p className="text-cream/60 font-montserrat text-sm">
              Tell us about your vision and we'll craft a tailored proposal.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 bg-forest/30 backdrop-blur-sm border border-gold/20 rounded-xl p-5 sm:p-6"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2.5 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2.5 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-2.5 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
            />
            <select
              className="w-full px-4 py-2.5 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat text-sm focus:border-gold focus:outline-none transition-colors"
            >
              <option value="" className="bg-forest">Select Service Interest</option>
              <option value="experiences" className="bg-forest">Team Experiences</option>
              <option value="solutions" className="bg-forest">Florarium Solutions</option>
            </select>
            <textarea
              placeholder="Tell us about your project..."
              rows={3}
              className="w-full px-4 py-2.5 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none resize-none transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 
                bg-gradient-to-r from-[#C9A84C] via-[#D4B65A] to-[#C9A84C] 
                text-forest font-montserrat font-bold text-sm rounded
                border border-[#A88A3D]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]
                hover:from-[#D4B65A] hover:via-[#E0C26A] hover:to-[#D4B65A]
                transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Mail className="w-4 h-4" />
              Request a Proposal
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default CorporateHome;
