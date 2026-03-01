import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogCard = ({ post, index }) => {
  const { t } = useTranslation();
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300
        hover:-translate-y-2 group"
      data-testid={`blog-card-${post.id}`}
    >
      <div className="relative overflow-hidden h-40 sm:h-48 lg:h-56">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
      </div>
      
      <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-3 sm:gap-4 text-forest/60 text-xs sm:text-sm font-montserrat flex-wrap">
          <div className="flex items-center gap-1 sm:gap-2">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{new Date(post.published_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{post.author}</span>
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-cinzel font-bold text-forest group-hover:text-gold-dark transition-colors"
            data-testid={`blog-title-${post.id}`}>
          {post.title}
        </h3>
        
        <p className="text-forest/70 font-montserrat text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
          {post.excerpt}
        </p>
        
        <button className="flex items-center gap-2 text-gold-dark font-montserrat font-semibold text-xs sm:text-sm
          group-hover:gap-4 transition-all duration-300"
          data-testid={`blog-read-more-${post.id}`}>
          {t('blog.readMore')}
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.article>
  );
};

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog/posts`);
      setPosts(response.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  return (
    <section
      id="blog"
      className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4"
      style={{
        backgroundImage: 'url(/BG_TILE_FINAL.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-forest/85" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-gold mb-3 sm:mb-4" data-testid="blog-title">
            {t('blog.title')}
          </h2>
          <p className="text-cream/80 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2 text-justify">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;