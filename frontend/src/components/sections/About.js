import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Leaf, Sparkles, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const teamMembers = [
  {
    id: 1,
    nameKey: 'about.team.member1.name',
    roleKey: 'about.team.member1.role',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    nameKey: 'about.team.member2.name',
    roleKey: 'about.team.member2.role',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    nameKey: 'about.team.member3.name',
    roleKey: 'about.team.member3.role',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
  },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="relative py-24 px-4"
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
          className="text-center mb-16"
        >
          <Heart className="w-16 h-16 text-gold mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-gold mb-4" data-testid="about-title">
            {t('about.title')}
          </h2>
          <p className="text-cream/80 font-montserrat text-lg max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
                alt="Our Story"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
            </div>
            {/* Decorative element */}
            <motion.div
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-gold/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-gold" />
              <h3 className="text-2xl font-cinzel font-bold text-gold">
                {t('about.storyTitle')}
              </h3>
            </div>
            <p className="text-cream/90 font-montserrat leading-relaxed text-justify">
              {t('about.storyParagraph1')}
            </p>
            <p className="text-cream/90 font-montserrat leading-relaxed text-justify">
              {t('about.storyParagraph2')}
            </p>
            
            {/* Mission Statement */}
            <div className="bg-gold/10 border border-gold/30 rounded-xl p-6 mt-6">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-6 h-6 text-gold" />
                <h4 className="font-cinzel font-bold text-gold">{t('about.missionTitle')}</h4>
              </div>
              <p className="text-cream/80 font-montserrat italic">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          <div className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-gold" />
            </div>
            <h4 className="font-cinzel font-bold text-gold text-lg mb-2">{t('about.value1Title')}</h4>
            <p className="text-cream/70 font-montserrat text-sm">{t('about.value1Desc')}</p>
          </div>
          
          <div className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gold" />
            </div>
            <h4 className="font-cinzel font-bold text-gold text-lg mb-2">{t('about.value2Title')}</h4>
            <p className="text-cream/70 font-montserrat text-sm">{t('about.value2Desc')}</p>
          </div>
          
          <div className="bg-forest/60 backdrop-blur-md border border-gold/30 rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gold" />
            </div>
            <h4 className="font-cinzel font-bold text-gold text-lg mb-2">{t('about.value3Title')}</h4>
            <p className="text-cream/70 font-montserrat text-sm">{t('about.value3Desc')}</p>
          </div>
        </motion.div>

        {/* Meet the Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            {t('about.teamTitle')}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group"
                data-testid={`team-member-${member.id}`}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={t(member.nameKey)}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h4 className="font-cinzel font-bold text-gold text-xl mb-1">
                      {t(member.nameKey)}
                    </h4>
                    <p className="text-cream/80 font-montserrat text-sm">
                      {t(member.roleKey)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
