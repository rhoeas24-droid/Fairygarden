import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Leaf, Sparkles, Star, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Blinking Mushroom Component
const BlinkingMushroom = ({ mirrored = false }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150); // Eyes closed for 150ms
    };
    
    // Random blink interval between 2-4 seconds
    const scheduleNextBlink = () => {
      const delay = 2000 + Math.random() * 2000;
      return setTimeout(() => {
        blink();
        scheduleNextBlink();
      }, delay);
    };
    
    const timeoutId = scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, []);
  
  return (
    <div 
      className="relative w-full h-full"
      style={{ transform: mirrored ? 'scaleX(-1)' : 'none' }}
    >
      <img 
        src={isBlinking 
          ? "https://fairygarden4u.com/fairy_mushroom_closed.png"
          : "https://fairygarden4u.com/fairy_mushroom.png"
        }
        alt=""
        className="w-full h-auto transition-opacity duration-75"
        style={{ filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.4))' }}
      />
    </div>
  );
};

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-3xl bg-forest border-2 border-gold/50 rounded-2xl shadow-2xl flex flex-col"
            style={{ maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - fixed position */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest border border-gold/30 text-gold hover:bg-gold hover:text-forest transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 lg:p-10">
              {/* Title and Photo */}
              <div className="flex flex-col items-center mb-6">
                <img 
                  src="https://fairygarden4u.com/attila_portrait.jpg" 
                  alt="Attila Szlávik"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gold/50 shadow-lg mb-4"
                />
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold text-center">
                  About Me
                </h2>
              </div>
              
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
                  Of course, getting there took work — and plenty of failures. Mold, rotting plants, bottles that looked promising for a few weeks before slowly falling apart. The researcher in me refused to give up, and equally refused to settle for surface-level answers. Instead of quick fixes, I went deep — reading scientific publications, studying substrate chemistry, understanding the biology of self-sustaining florarium ecosystems from the ground up. Then came years of hands-on experimenting: testing and rebuilding drainage layers, refining substrate compositions, learning how to maintain stable humidity and prevent mold without chemicals inside a completely sealed environment. Failing, learning, refining — and eventually, getting it beautifully right.
                </p>
                
                <p>
                  Today, every handcrafted closed florarium I create is built using my own tried-and-tested substrate mix and planted almost exclusively with plants I propagate myself — grown with the same curiosity and care I've carried since childhood.
                </p>
                
                <p className="text-gold/90">
                  I'm so glad you're here — and I'd love to share a little of this magic with you.
                </p>
                
                <p>
                  Please, browse my webshop to find a garden I've already lovingly put together, join one of my florarium workshops to create your very own, or reach out and let's bring your own idea to life together.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Our Story Modal Component
const OurStoryModal = ({ isOpen, onClose }) => {
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
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-3xl bg-forest border-2 border-gold/50 rounded-2xl shadow-2xl flex flex-col"
            style={{ maxHeight: '85vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest border border-gold/30 text-gold hover:bg-gold hover:text-forest transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8 lg:p-10">
              {/* Title */}
              <div className="flex items-center gap-3 justify-center mb-6">
                <Leaf className="w-8 h-8 text-gold" />
                <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold">
                  Our Story
                </h2>
              </div>
              
              {/* Content */}
              <div className="text-cream/90 font-montserrat text-sm sm:text-base leading-relaxed space-y-4 text-justify">
                <p className="italic text-gold/90">
                  Fairy Garden didn't start as a business. It started as a quiet obsession in 2020.
                </p>
                
                <p>
                  A bottle. Some soil. A few tiny plants. A sealed lid — and suddenly, a whole living world humming away completely on its own. That first closed florarium was never meant to be anything more than a personal project, a creative escape, a way to bring a little nature indoors. But something about it refused to stay small.
                </p>
                
                <p>
                  What began as a hobby quickly became something deeper. Questions started piling up faster than answers. Why does this substrate hold moisture better than that one? What keeps mold from taking hold inside a sealed glass ecosystem? How do you build something truly self-sustaining — a bottle garden that doesn't just survive behind glass for a few weeks, but genuinely thrives for months, for years, possibly forever? Each bottle became an experiment. Each experiment became a lesson. Years of refining, testing and quietly perfecting went into what is now our own custom substrate mix and our own plant propagation methods — developed entirely out of love for getting it right.
                </p>
                
                <p>
                  Somewhere along the way, the hobby became a craft. The research became confidence. And the handcrafted florariums — those little sealed worlds that had always felt like pure magic to us — started finding their way into other people's homes. They became art.
                </p>
                
                <p>
                  That's when something unexpected happened. The joy didn't stay ours alone. It travelled with every garden. And watching that happen — seeing someone else light up over a tiny self-sustaining ecosystem sitting on their windowsill — turned a deeply personal dream into something worth sharing with the world.
                </p>
                
                <p className="text-gold/90">
                  Fairy Garden is that dream, finally out of the bottle. (wink wink) 😉
                </p>
                
                <p>
                  A hobby that grew into a passion. A passion that grew into a craft. And a craft we now get to share with wonderful people who love nature just as much as we do.
                </p>
                
                <p className="text-gold font-semibold">
                  Welcome to our little world — we're so glad you found it.
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
  const [isOurStoryOpen, setIsOurStoryOpen] = useState(false);

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
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2 text-justify">
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
            <p className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base italic">
              Fairy Garden didn't start as a business. It started as a quiet obsession in 2020.
            </p>
            <p className="text-cream/90 font-montserrat leading-relaxed text-justify text-sm sm:text-base">
              A bottle. Some soil. A few tiny plants. A sealed lid — and suddenly, a whole living world humming away completely on its own. That first closed florarium was never meant to be anything more than a personal project, a creative escape, a way to bring a little nature indoors. But something about it refused to stay small...
            </p>
            
            {/* Read More button */}
            <button
              onClick={() => setIsOurStoryOpen(true)}
              className="text-gold hover:text-gold-light font-montserrat font-semibold underline decoration-gold/50 hover:decoration-gold transition-colors text-sm sm:text-base"
            >
              Read More →
            </button>
            
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
            <p className="text-cream/70 font-montserrat text-xs sm:text-sm text-justify">{t('about.value1Desc')}</p>
          </div>
          
          <div className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-xl p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
            </div>
            <h4 className="font-cinzel font-bold text-gold text-base sm:text-lg mb-2">{t('about.value2Title')}</h4>
            <p className="text-cream/70 font-montserrat text-xs sm:text-sm text-justify">{t('about.value2Desc')}</p>
          </div>
          
          <div className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-xl p-4 sm:p-6 text-center sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-gold" />
            </div>
            <h4 className="font-cinzel font-bold text-gold text-base sm:text-lg mb-2">{t('about.value3Title')}</h4>
            <p className="text-cream/70 font-montserrat text-xs sm:text-sm text-justify">{t('about.value3Desc')}</p>
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
          
          <div className="flex justify-center items-end gap-4 sm:gap-8 lg:gap-16">
            {/* Left Mushroom - mirrored */}
            <motion.div
              className="hidden sm:block w-20 sm:w-24 lg:w-32 flex-shrink-0 self-end"
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <BlinkingMushroom mirrored={true} />
            </motion.div>

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
            
            {/* Right Mushroom */}
            <motion.div
              className="hidden sm:block w-20 sm:w-24 lg:w-32 flex-shrink-0 self-end"
              animate={{ y: [0, -5, 0] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <BlinkingMushroom mirrored={false} />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* About Me Modal */}
      <AboutMeModal isOpen={isAboutMeOpen} onClose={() => setIsAboutMeOpen(false)} />
      
      {/* Our Story Modal */}
      <OurStoryModal isOpen={isOurStoryOpen} onClose={() => setIsOurStoryOpen(false)} />
    </section>
  );
};

export default About;
