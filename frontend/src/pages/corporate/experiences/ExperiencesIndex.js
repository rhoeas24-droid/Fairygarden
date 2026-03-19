import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Leaf } from 'lucide-react';

const ExperiencesIndex = () => {
  const teamGains = [
    'Reveals hidden strengths and untapped potential',
    'Deepens interpersonal understanding beyond workplace roles',
    'Creates space for authentic connection and reflection',
    'Develops skills aligned with your team\'s real challenges',
    'Strengthens communication, trust, and collaboration',
    'Designed around your company\'s specific goals and dynamics'
  ];

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
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold mb-2 leading-tight">
                <span className="text-gold italic">Florarium-Based Team Experiences</span>
              </h1>
              
              <p className="text-base sm:text-lg font-cinzel text-gold/70 italic mb-4">
                Creative. Reflective. Deeply Human.
              </p>
              
              <div className="w-12 h-0.5 bg-gold/40 mb-4" />
              
              <p className="text-cream/75 font-montserrat text-sm sm:text-base leading-relaxed">
                Bring your team together through a hands-on experience that blends creativity, nature, and meaningful collaboration.
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
                  alt="Florarium Experience"
                  className="w-full h-[280px] sm:h-[350px] lg:h-[400px] object-cover rounded-xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-xl ring-1 ring-gold/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Quote Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold font-cinzel italic text-base sm:text-lg mb-3">
              We use self-sustaining living ecosystems as a tool for team development.
            </p>
            <p className="text-cream/60 font-montserrat text-sm">
              Building = Creation · Caring = Responsibility · Repairing = Problem-Solving
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two Paths Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-2">
              Two Paths, One Purpose
            </h2>
            <p className="text-cream/60 font-montserrat text-sm">
              Choose the format that best suits your team's needs.
            </p>
          </motion.div>

          {/* Two Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Team Retreat Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="h-full border border-gold/30 rounded-lg bg-forest/40 backdrop-blur-sm p-5">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-cinzel font-bold text-gold uppercase tracking-wide">
                    Team Retreat
                  </h3>
                </div>
                
                {/* Content with image */}
                <div className="flex gap-4 mb-5">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded overflow-hidden">
                    <img
                      src="/business_teambuilding.png"
                      alt="Team Retreat"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-cream font-montserrat font-semibold text-sm mb-2">
                      Focus:<br />
                      <span className="text-gold">Reset, reflection, creativity</span>
                    </p>
                    <ul className="space-y-1 text-cream/70 font-montserrat text-xs">
                      <li>• Uncovering hidden talents</li>
                      <li>• Improving interpersonal bonds</li>
                      <li>• Fostering personal insight</li>
                    </ul>
                  </div>
                </div>
                
                {/* Explore Button */}
                <Link
                  to="/corporate/experiences/retreat"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center justify-center px-5 py-2.5 
                    bg-gradient-to-r from-[#C9A84C] via-[#D4B65A] to-[#C9A84C] 
                    text-forest font-montserrat font-semibold text-sm
                    rounded border border-[#A88A3D]
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]
                    hover:from-[#D4B65A] hover:via-[#E0C26A] hover:to-[#D4B65A]
                    transition-all duration-200"
                >
                  Explore
                </Link>
              </div>
            </motion.div>

            {/* Team Building Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-full border border-gold/30 rounded-lg bg-forest/40 backdrop-blur-sm p-5">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-cinzel font-bold text-gold uppercase tracking-wide">
                    Team Building
                  </h3>
                </div>
                
                {/* Content with image */}
                <div className="flex gap-4 mb-5">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 rounded overflow-hidden">
                    <img
                      src="/business_teambuilding.png"
                      alt="Team Building"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-cream font-montserrat font-semibold text-sm mb-2">
                      Focus:<br />
                      <span className="text-gold">Collaboration, communication, trust</span>
                    </p>
                    <ul className="space-y-1 text-cream/70 font-montserrat text-xs">
                      <li>• Fostering teamwork and synergy</li>
                      <li>• Strengthening communication skills</li>
                      <li>• Identifying and solving challenges collectively</li>
                    </ul>
                  </div>
                </div>
                
                {/* Explore Button */}
                <Link
                  to="/corporate/experiences/team-building"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center justify-center px-5 py-2.5 
                    bg-gradient-to-r from-[#C9A84C] via-[#D4B65A] to-[#C9A84C] 
                    text-forest font-montserrat font-semibold text-sm
                    rounded border border-[#A88A3D]
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]
                    hover:from-[#D4B65A] hover:via-[#E0C26A] hover:to-[#D4B65A]
                    transition-all duration-200"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Your Team Gains Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold">
              What Your Team Gains From This
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-x-8 gap-y-4"
          >
            {teamGains.map((gain, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-cream/80 font-montserrat text-sm">
                  {gain}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesIndex;
