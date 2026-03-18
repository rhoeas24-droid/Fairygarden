import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const CorporateHome = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-gold mb-4 leading-tight">
                Florarium Solutions<br />
                <span className="text-cream">for Teams & Brands</span>
              </h1>
              
              <p className="text-xl sm:text-2xl font-cinzel text-gold/80 mb-6">
                Creative. Reflective. Impactful.
              </p>
              
              <div className="w-16 h-0.5 bg-gold/50 mb-6" />
              
              <p className="text-cream/80 font-montserrat text-base sm:text-lg leading-relaxed mb-8">
                Offer transformative team experiences and elegant brand solutions with handcrafted, 
                <em className="text-gold"> self-sustaining</em> living compositions designed to inspire & impress.
              </p>
              
              <Link
                to="#choose-path"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('choose-path')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-forest font-montserrat font-semibold rounded-full hover:bg-gold-light transition-all"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                  className="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-gold/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Choose Your Path Section */}
      <section id="choose-path" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold italic mb-4">
              Choose Your Path
            </h2>
            <p className="text-cream/70 font-montserrat text-base sm:text-lg max-w-2xl mx-auto">
              Team-building workshops or branded botanical displays,<br className="hidden sm:block" />
              tailored for your organization.
            </p>
          </motion.div>

          {/* Two Columns */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Team Experiences */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to="/corporate/experiences/retreat"
                className="block group"
              >
                <div className="relative overflow-hidden rounded-xl border border-gold/30 hover:border-gold/50 transition-all bg-forest/30 backdrop-blur-sm">
                  {/* Image */}
                  <div className="h-[250px] sm:h-[300px] overflow-hidden">
                    <img
                      src="/business_teambuilding.png"
                      alt="Team Experiences"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-3">
                      Team Experiences
                    </h3>
                    <p className="text-cream/70 font-montserrat text-sm sm:text-base leading-relaxed mb-4">
                      Bring your team together through shared creation, reflection, and collaboration. 
                      Our sustainable terrarium workshops foster mindfulness and connection.
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold font-montserrat text-sm font-semibold group-hover:gap-3 transition-all">
                      Explore Experiences
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Florarium Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/corporate/solutions/branded-florariums"
                className="block group"
              >
                <div className="relative overflow-hidden rounded-xl border border-gold/30 hover:border-gold/50 transition-all bg-forest/30 backdrop-blur-sm">
                  {/* Image */}
                  <div className="h-[250px] sm:h-[300px] overflow-hidden">
                    <img
                      src="/business_office_decor.png"
                      alt="Florarium Solutions"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-3">
                      Florarium Solutions
                    </h3>
                    <p className="text-cream/70 font-montserrat text-sm sm:text-base leading-relaxed mb-4">
                      Enhance your brand presence through elegant, self-sustaining living compositions — 
                      from branded gifts to stunning office installations.
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold font-montserrat text-sm font-semibold group-hover:gap-3 transition-all">
                      Explore Solutions
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-4">
              Our Services
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: 'Team Retreat', path: '/corporate/experiences/retreat', desc: 'Immersive day or weekend experiences' },
              { title: 'Team Building', path: '/corporate/experiences/team-building', desc: 'Creative workshops for any group size' },
              { title: 'Branded Florariums', path: '/corporate/solutions/branded-florariums', desc: 'Custom gifts with your branding' },
              { title: 'Office Decor', path: '/corporate/solutions/office-decor', desc: 'Living installations for workspaces' },
              { title: 'Event Rental', path: '/corporate/solutions/event-decor', desc: 'Stunning displays for special occasions' },
              { title: 'Partner Gifts', path: '/corporate/solutions/partner-gifts', desc: 'Premium pieces for VIP relationships' },
            ].map((service, index) => (
              <motion.div
                key={service.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={service.path}
                  className="block p-5 bg-forest/40 border border-gold/20 rounded-lg hover:border-gold/40 hover:bg-forest/50 transition-all group"
                >
                  <h4 className="text-lg font-cinzel font-bold text-gold mb-2 group-hover:text-gold-light transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-cream/60 font-montserrat text-sm">
                    {service.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-gold mb-4">
              Let's Create Something Unique
            </h2>
            <p className="text-cream/70 font-montserrat">
              Tell us about your vision and we'll craft a tailored proposal.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 bg-forest/30 backdrop-blur-sm border border-gold/20 rounded-xl p-6 sm:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
            />
            <select
              className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat focus:border-gold focus:outline-none transition-colors"
            >
              <option value="" className="bg-forest">Select Service Interest</option>
              <option value="retreat" className="bg-forest">Team Retreat</option>
              <option value="team-building" className="bg-forest">Team Building</option>
              <option value="branded" className="bg-forest">Branded Florariums</option>
              <option value="office" className="bg-forest">Office Decor</option>
              <option value="event" className="bg-forest">Event Rental</option>
              <option value="gifts" className="bg-forest">Partner Gifts</option>
            </select>
            <textarea
              placeholder="Tell us about your project..."
              rows={4}
              className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat placeholder:text-cream/40 focus:border-gold focus:outline-none resize-none transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gold text-forest font-montserrat font-bold rounded-full hover:bg-gold-light transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <Mail className="w-5 h-5" />
              Request a Proposal
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default CorporateHome;
