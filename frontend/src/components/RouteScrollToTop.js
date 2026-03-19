import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteScrollToTop = () => {
  const { pathname } = useLocation();

  // Use useLayoutEffect to scroll before the browser paints
  useLayoutEffect(() => {
    // Multiple scroll methods for maximum compatibility
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also try scrolling any scrollable containers
    const scrollableElements = document.querySelectorAll('[class*="overflow"]');
    scrollableElements.forEach(el => {
      el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};

export default RouteScrollToTop;
