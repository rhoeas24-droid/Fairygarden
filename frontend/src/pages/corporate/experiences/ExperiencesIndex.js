import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Users, TreePine } from 'lucide-react';

const ExperiencesIndex = () => {
  const experiences = [
    {
      title: 'Team Retreat',
      path: '/corporate/experiences/retreat',
      description: 'Immersive day or weekend experiences designed for reflection and team bonding.',
      icon: TreePine
    },
    {
      title: 'Team Building',
      path: '/corporate/experiences/team-building',
      description: 'Creative workshops for groups of any size, fostering collaboration and mindfulness.',
      icon: Users
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
              Team Experiences
            </h1>
            <p className="text-cream/70 font-montserrat text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Bring your team together through shared creation, reflection, and collaboration. 
              Our sustainable terrarium workshops foster mindfulness and connection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={exp.path}
                  className="block h-full group"
                >
                  <div className="h-full p-6 bg-forest/40 border border-gold/20 rounded-lg 
                    hover:border-gold/40 hover:bg-forest/50 transition-all flex flex-col">
                    <exp.icon className="w-10 h-10 text-gold mb-4" />
                    <h3 className="text-xl font-cinzel font-bold text-gold mb-2 
                      group-hover:text-gold-light transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-cream/60 font-montserrat text-sm leading-relaxed mb-4 flex-1">
                      {exp.description}
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

export default ExperiencesIndex;
