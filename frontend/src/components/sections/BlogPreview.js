import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogPostModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-8 sm:pt-20 pb-4 sm:pb-8 overflow-y-auto"
        onClick={onClose}
        data-testid="blog-modal-overlay"
      >
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-cream rounded-2xl overflow-hidden shadow-2xl mb-4"
          onClick={(e) => e.stopPropagation()}
          data-testid="blog-modal"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-forest/80 text-cream hover:bg-forest transition-colors"
            data-testid="blog-modal-close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero image */}
          {post.image && (
            <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Meta */}
            <div className="flex items-center gap-4 text-forest/60 text-sm font-montserrat mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-forest mb-6">
              {post.title}
            </h2>

            {/* Post content - rendered HTML from WordPress */}
            <div
              className="prose prose-lg max-w-none font-montserrat text-forest/85
                prose-headings:font-cinzel prose-headings:text-forest
                prose-a:text-gold-dark prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-lg
                prose-p:leading-relaxed prose-p:text-justify"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BlogCard = ({ post, index, onReadMore }) => {
  const { t } = useTranslation();

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300
        hover:-translate-y-2 group cursor-pointer"
      data-testid={`blog-card-${post.id}`}
      onClick={() => onReadMore(post)}
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
        
        <p className="text-forest/70 font-montserrat text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 text-justify">
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
  const [selectedPost, setSelectedPost] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  // Handle direct blog post links via URL parameter
  useEffect(() => {
    const handleBlogLink = async () => {
      const params = new URLSearchParams(window.location.search);
      const postSlug = params.get('post');
      
      if (postSlug) {
        try {
          // Fetch the specific post by slug
          const response = await axios.get(`${API}/blog/posts`);
          const post = response.data.find(p => p.slug === postSlug);
          if (post) {
            setSelectedPost(post);
            // Clean up URL
            window.history.replaceState({}, '', window.location.pathname);
          }
        } catch (error) {
          console.error('Error fetching blog post:', error);
        }
      }
    };
    
    handleBlogLink();
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
    <>
      <section
        id="blog"
        className="relative py-12 sm:py-16 lg:py-24 px-3 sm:px-4 bg-cream"
      >
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-forest mb-3 sm:mb-4" data-testid="blog-title">
              {t('blog.title')}
            </h2>
            <p className="text-forest/70 font-montserrat text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2 text-justify">
              {t('blog.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} onReadMore={setSelectedPost} />
            ))}
          </div>
        </div>
      </section>

      <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </>
  );
};

export default BlogPreview;
