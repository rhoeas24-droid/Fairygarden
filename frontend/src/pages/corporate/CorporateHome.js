import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Leaf, Building2, Gift, Calendar, Sparkles, ArrowRight, Mail } from 'lucide-react';

const CorporateHome = () => {
  const experiences = [
    {
      title: 'Team Retreat',
      description: 'Step away from roles and reconnect through a slow, creative process.',
      image: '/business_teambuilding.png',
      link: '/corporate/experiences/retreat',
      buttonText: 'Explore Experience'
    },
    {
      title: 'Team Building',
      description: 'Transform your workspace with bespoke botanical arrangements.',
      image: '/business_office_decor.png',
      link: '/corporate/experiences/team-building',
      buttonText: 'View Installations'
    }
  ];

  const solutions = [
    {
      title: 'Branded Florariums',
      description: 'Customized mini terrariums that keep your brand on their desks.',
      image: '/business_gift_small.png',
      link: '/corporate/solutions/branded-florariums',
      buttonText: 'See Gift Options'
    },
    {
      title: 'Office & Reception Decor',
      description: 'Transform your workspace with bespoke botanical arrangements.',
      image: '/business_office_decor.png',
      link: '/corporate/solutions/office-decor',
      buttonText: 'View Installations'
    },
    {
      title: 'Event Rental',
      description: 'Elevate events and launches with our curated terrarium displays.',
      image: '/business_event_rental.png',
      link: '/corporate/solutions/event-decor',
      buttonText: 'Explore Rental Options'
    },
    {
      title: 'Exclusive Partner Gifts',
      description: 'Impress VIP partners with bespoke, large-format living art.',
      image: '/business_gift_exclusive.png',
      link: '/corporate/solutions/partner-gifts',
      buttonText: 'See Premium Options'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/business_teambuilding.png"
                  alt="Florarium Experience"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-forest/60 to-transparent" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-gold mb-6">
                Florarium Experiences for Teams & Workspaces
              </h1>
              <p className="text-2xl text-cream/80 font-cinzel mb-6">
                Creative. Restorative. Inspiring.
              </p>
              <p className="text-cream/70 font-montserrat text-lg leading-relaxed mb-8">
                Harness the meditative art of <em className="text-gold">terrarium</em> building to elevate your corporate culture.
                Customize unforgettable <strong className="text-gold">team retreats</strong> and <strong className="text-gold">branded greenery solutions</strong> that
                inspire creativity, reduce stress, and leave a lasting impression.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-cream/80 font-montserrat text-lg mb-4">
            We offer immersive, florarium-based services that enrich your corporate environment and employee experience:
          </p>
          <p className="text-gold font-cinzel text-xl">
            Explore our tailored offerings:
          </p>
        </div>
      </section>

      {/* Two Columns: Experiences & Solutions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Team Experiences */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Leaf className="w-6 h-6 text-gold" />
                <h2 className="text-2xl font-cinzel font-bold text-gold uppercase tracking-wider">
                  Team Experiences
                </h2>
                <div className="flex-1 h-px bg-gold/30" />
              </div>

              <div className="space-y-6">
                {experiences.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-forest/40 backdrop-blur-sm border border-gold/20 rounded-xl overflow-hidden hover:border-gold/40 transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-40 h-40 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-center">
                        <h3 className="text-xl font-cinzel font-bold text-gold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-cream/70 font-montserrat text-sm mb-4">
                          {item.description}
                        </p>
                        <Link
                          to={item.link}
                          className="inline-flex items-center gap-2 text-sm font-montserrat font-semibold text-forest bg-gold/90 hover:bg-gold px-4 py-2 rounded-full transition-colors w-fit"
                        >
                          {item.buttonText}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Request Proposal Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Link
                  to="/corporate#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-gold text-gold font-montserrat font-semibold rounded-full hover:bg-gold hover:text-forest transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Request a Proposal
                </Link>
              </motion.div>
            </div>

            {/* Florarium Solutions */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-6 h-6 text-gold" />
                <h2 className="text-2xl font-cinzel font-bold text-gold uppercase tracking-wider">
                  Florarium Solutions
                </h2>
                <div className="flex-1 h-px bg-gold/30" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {solutions.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-forest/40 backdrop-blur-sm border border-gold/20 rounded-xl overflow-hidden hover:border-gold/40 transition-all group"
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-cinzel font-bold text-gold mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-cream/70 font-montserrat text-xs mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <Link
                        to={item.link}
                        className="inline-flex items-center gap-1 text-xs font-montserrat font-semibold text-forest bg-gold/90 hover:bg-gold px-3 py-1.5 rounded-full transition-colors"
                      >
                        {item.buttonText}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 bg-forest/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-cinzel font-bold text-gold mb-6">
            Let's Create Something Unique
          </h2>
          <p className="text-cream/70 font-montserrat mb-8">
            Tell us about your vision and we'll craft a tailored proposal for your team or workspace.
          </p>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat focus:border-gold focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat focus:border-gold focus:outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat focus:border-gold focus:outline-none"
            />
            <select
              className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat focus:border-gold focus:outline-none"
            >
              <option value="">Select Service Interest</option>
              <option value="retreat">Team Retreat</option>
              <option value="team-building">Team Building</option>
              <option value="branded">Branded Florariums</option>
              <option value="office">Office Decor</option>
              <option value="event">Event Rental</option>
              <option value="gifts">Partner Gifts</option>
            </select>
            <textarea
              placeholder="Tell us about your project..."
              rows={4}
              className="w-full px-4 py-3 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat focus:border-gold focus:outline-none resize-none"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gold text-forest font-montserrat font-bold rounded-full hover:bg-gold-light transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CorporateHome;
