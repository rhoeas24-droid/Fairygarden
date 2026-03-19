import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Building2, Gift, Sparkles, PartyPopper } from 'lucide-react';

const SolutionsIndex = () => {
  const solutions = [
    {
      title: 'Branded Florariums',
      path: '/corporate/solutions/branded-florariums',
      description: 'Custom gifts featuring your branding — perfect for corporate events and client gifts.',
      icon: Gift
    },
    {
      title: 'Office Decor',
      path: '/corporate/solutions/office-decor',
      description: 'Living installations for workspaces that bring nature into your environment.',
      icon: Building2
    },
    {
      title: 'Event Decor',
      path: '/corporate/solutions/event-decor',
      description: 'Stunning displays for conferences, exhibitions, and special occasions.',
      icon: PartyPopper
    },
    {
      title: 'Partner Gifts',
      path: '/corporate/solutions/partner-gifts',
      description: 'Premium pieces for VIP relationships — lasting impressions for valued partners.',
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-gold italic mb-4">
              Florarium Solutions
            </h1>
            <p className="text-cream/70 font-montserrat text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Enhance your brand presence through elegant, self-sustaining living compositions — 
              from branded gifts to stunning office installations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {solutions.map((sol, index) => (
              <motion.div
                key={sol.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={sol.path}
                  className="block h-full group"
                >
                  <div className="h-full p-6 bg-forest/40 border border-gold/20 rounded-lg 
                    hover:border-gold/40 hover:bg-forest/50 transition-all flex flex-col">
                    <sol.icon className="w-10 h-10 text-gold mb-4" />
                    <h3 className="text-xl font-cinzel font-bold text-gold mb-2 
                      group-hover:text-gold-light transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-cream/60 font-montserrat text-sm leading-relaxed mb-4 flex-1">
                      {sol.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold font-montserrat text-sm font-semibold">
                      Learn More
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsIndex;
