import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Clock, CheckCircle, Mail, Sparkles } from 'lucide-react';

const TeamBuilding = () => {
  const activities = [
    {
      name: 'Collaborative Terrarium Challenge',
      description: 'Teams compete to create the most creative terrarium design.',
      duration: '2-3 hours'
    },
    {
      name: 'Mindful Building Workshop',
      description: 'A guided, meditative experience focused on presence and creativity.',
      duration: '1.5-2 hours'
    },
    {
      name: 'Design & Present',
      description: 'Teams design and present their terrariums, fostering communication skills.',
      duration: '2-3 hours'
    },
    {
      name: 'Nature Connection Session',
      description: 'Combine terrarium building with outdoor activities and nature walks.',
      duration: '4-6 hours'
    }
  ];

  const testimonials = [
    {
      quote: "The terrarium workshop was the highlight of our team retreat. Everyone was engaged and the results were beautiful!",
      author: "Maria K.",
      company: "Tech Solutions Cyprus"
    },
    {
      quote: "A refreshing break from typical team building. Our team still talks about it months later.",
      author: "Andreas P.",
      company: "Coastal Hotels Group"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/corporate"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors mb-8 font-montserrat"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Corporate
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-gold mb-6">
                Team Building Workshops
              </h1>
              <p className="text-xl text-cream/80 font-montserrat mb-6">
                Build connections while building terrariums.
              </p>
              <p className="text-cream/70 font-montserrat leading-relaxed mb-8">
                Our team building workshops are designed to foster collaboration, creativity, 
                and communication in a unique, hands-on environment. Whether you're looking to 
                break the ice with a new team or strengthen existing bonds, our workshops 
                provide the perfect setting.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Users className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">5-100 people</span>
                </div>
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">1.5-6 hours</span>
                </div>
                <div className="flex items-center gap-2 bg-forest/50 border border-gold/30 rounded-full px-4 py-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span className="text-cream/80 font-montserrat text-sm">Customizable</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/business_teambuilding.png"
                alt="Team Building"
                className="w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-gold/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 px-4 bg-forest/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            Workshop Activities
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-forest/60 backdrop-blur-sm border border-gold/30 rounded-xl p-6 hover:border-gold/50 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-cinzel font-bold text-gold">{activity.name}</h3>
                  <span className="text-cream/60 font-montserrat text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {activity.duration}
                  </span>
                </div>
                <p className="text-cream/70 font-montserrat">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold text-center mb-12">
            What Teams Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-forest/40 border border-gold/20 rounded-xl p-6"
              >
                <p className="text-cream/80 font-montserrat italic mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="text-gold font-cinzel font-bold">{testimonial.author}</p>
                  <p className="text-cream/60 font-montserrat text-sm">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-forest/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-cinzel font-bold text-gold mb-6">
            Plan Your Team Building Event
          </h2>
          <p className="text-cream/70 font-montserrat mb-8">
            Let's create a customized workshop that meets your team's needs and goals.
          </p>
          <Link
            to="/corporate#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-forest font-montserrat font-bold rounded-full hover:bg-gold-light transition-colors"
          >
            <Mail className="w-5 h-5" />
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TeamBuilding;
