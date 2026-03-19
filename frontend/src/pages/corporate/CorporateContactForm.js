import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Loader2 } from 'lucide-react';

const CorporateContactForm = ({ serviceType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Create mailto link with pre-filled subject
    const subject = encodeURIComponent(`Inquiry: ${serviceType}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
    );
    
    // Open email client
    window.location.href = `mailto:info@fairygarden4u.com?subject=${subject}&body=${body}`;
    
    setStatus('success');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold mb-3">
            Interested in {serviceType}?
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
          onSubmit={handleSubmit}
          className="space-y-4 bg-forest/30 backdrop-blur-sm border border-gold/20 rounded-xl p-5 sm:p-6"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2.5 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-2.5 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
            />
          </div>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full px-4 py-2.5 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none transition-colors"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            rows={3}
            className="w-full px-4 py-2.5 bg-forest/50 border border-gold/30 rounded-lg text-cream font-montserrat text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none resize-none transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto px-6 py-2.5 
              bg-gradient-to-r from-[#C9A84C] via-[#D4B65A] to-[#C9A84C] 
              text-forest font-montserrat font-bold text-sm rounded
              border border-[#A88A3D]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]
              hover:from-[#D4B65A] hover:via-[#E0C26A] hover:to-[#D4B65A]
              disabled:opacity-50
              transition-all flex items-center justify-center gap-2 mx-auto"
          >
            {status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Mail className="w-4 h-4" />
            )}
            {status === 'success' ? 'Opening Email...' : 'Request a Proposal'}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default CorporateContactForm;
