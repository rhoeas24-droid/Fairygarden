import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Leaf, Sparkles, Star, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const teamMembers = [
  {
    id: 1,
    nameKey: 'about.team.member1.name',
    roleKey: 'about.team.member1.role',
    image: 'https://fairygarden4u.com/team_founder.jpg',
  },
];

// About Me Modal Component
const AboutMeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-forest border-2 border-gold/50 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-forest/80 border border-gold/30 text-gold hover:bg-gold hover:text-forest transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 lg:p-10">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-6 text-center">
                About Me
              </h2>
              
              {/* Content */}
              <div className="text-cream/90 font-montserrat text-sm sm:text-base leading-relaxed space-y-4 text-justify">
                <p className="italic text-gold/90">
                  Some people discover their passion. I was born with mine.
                </p>
                
                <p>
                  Hello there! My name is Attila. Please, let me tell you how my friendship with bottle gardens started.
                </p>
                
                <p>
                  As a child, I was completely captivated by nature — endlessly curious, endlessly amazed. I remember being genuinely obsessed with one question: how on earth can a giant tree be hiding inside a tiny seed? That sense of wonder never left me. It led me to study biology, then public health, and through years of work in nature conservation and health care, nature was always right there beside me — a constant companion.
                </p>
                
                <p>
                  Outside of work I was always chasing creative projects: aquariums, painting, plants, dogs (two very beloved ones, to whom I was a loyal and humble servant for sixteen years 🐾). But something was still missing, something to create that is more than just an object. Then in 2020, I discovered bottle gardens — and everything clicked.
                </p>
                
                <p>
                  There is something that happens when you seal a little world inside a glass container and watch it sustain itself. The moisture cycles. The plants breathe. Life finds its balance. For me, these tiny closed ecosystems feel like nothing short of pure magic — a whole living world, thriving quietly behind glass, needing almost nothing from the outside. I find it endlessly fascinating and, honestly, a little miraculous every single time.
                </p>
                
                <p>
                  Of course, getting there took work — and plenty of failures. Mold, rotting plants, bottles that looked promising for a few weeks before slowly falling apart. The researcher in me refused to give up, and equally refused to settle for surface-level answers. Instead of quick fixes, I went deep — reading scientific publications, studying substrate chemistry, understanding the biology of self-sustaining terrarium ecosystems from the ground up. Then came years of hands-on experimenting: testing and rebuilding drainage layers, refining substrate compositions, learning how to maintain stable humidity and prevent mold without chemicals inside a completely sealed environment. Failing, learning, refining — and eventually, getting it beautifully right.
                </p>
                
                <p>
                  Today, every handcrafted closed terrarium I create is built using my own tried-and-tested substrate mix and planted almost exclusively with plants I propagate myself — grown with the same curiosity and care I've carried since childhood.
                </p>
                
                <p className="text-gold/90">
                  I'm so glad you're here — and I'd love to share a little of this magic with you.
                </p>
                
                <p>
                  Please, browse my webshop to find a garden I've already lovingly put together, join one of my terrarium workshops to create your very own, or reach out and let's bring your own idea to life together.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const About = () => {
  const { t } = useTranslation();
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-forest/90" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gold mx-auto mb-4 sm:mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold mb-3 sm:mb-4" data-testid="about-title">
            {t('about.title')}
          </h2>
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://fairygarden4u.com/workshop_space.jpg"
                alt="Our Story"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
            </div>
            {/* Decorative element */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gold/20 rounded-full blur-xl hidden sm:block"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-gold">
                {t('about.storyTitle')}
              </h3>
            </div>
            <p className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
              {t('about.storyParagraph1')}
            </p>
            <p className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
              {t('about.storyParagraph2')}
            </p>
            
            {/* Mission Statement */}
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-4 sm:p-6 mt-4 sm:mt-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                <h4 className="font-cinzel font-bold text-gold text-sm sm:text-base">{t('about.missionTitle')}</h4>
              </div>
              <p className="text-cream/80 font-montserrat italic text-xs sm:text-sm">
                "{t('about.missionText')}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-xl p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
            </div>
            <h4 className="font-cinzel font-bold text-gold text-base sm:text-lg mb-2">{t('about.value1Title')}</h4>
            <p className="text-cream/70 font-montserrat text-xs sm:text-sm">{t('about.value1Desc')}</p>
          </div>
          
          <div className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-xl p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
            </div>
            <h4 className="font-cinzel font-bold text-gold text-base sm:text-lg mb-2">{t('about.value2Title')}</h4>
            <p className="text-cream/70 font-montserrat text-xs sm:text-sm">{t('about.value2Desc')}</p>
          </div>
          
          <div className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-xl p-4 sm:p-6 text-center sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
            </div>
            <h4 className="font-cinzel font-bold text-gold text-base sm:text-lg mb-2">{t('about.value3Title')}</h4>
            <p className="text-cream/70 font-montserrat text-xs sm:text-sm">{t('about.value3Desc')}</p>
          </div>
        </motion.div>

        {/* Meet the Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold text-center mb-8 sm:mb-12">
            {t('about.teamTitle')}
          </h3>
          
          <div className="flex justify-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group max-w-sm"
                data-testid={`team-member-${member.id}`}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={t(member.nameKey)}
                    className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h4 
                      className="font-cinzel font-bold text-gold text-lg sm:text-xl mb-1 cursor-pointer hover:text-gold-light transition-colors underline decoration-gold/50 hover:decoration-gold"
                      onClick={() => setIsAboutMeOpen(true)}
                    >
                      {t(member.nameKey)}
                    </h4>
                    <p className="text-cream/80 font-montserrat text-xs sm:text-sm">
                      {t(member.roleKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* About Me Modal */}
      <AboutMeModal isOpen={isAboutMeOpen} onClose={() => setIsAboutMeOpen(false)} />
    </section>
  );
};

export default About;
