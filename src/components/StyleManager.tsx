import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * StyleManager Component
 *
 * Manages body classes based on the current route to control CSS specificity.
 * - Admin routes (/admin/*) get 'admin-mode' class for dark theme styles
 * - Landing pages get 'landing-mode' class for landing page styles
 *
 * Also manages global dark/light mode preference with localStorage persistence.
 */
export function StyleManager() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Initialize dark mode from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;

    // Default to dark mode if no preference saved
    if (savedTheme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
    }

    // Set direction to LTR
    html.setAttribute('dir', 'ltr');
  }, []);

  // Update body background when theme changes (landing pages only)
  useEffect(() => {
    if (isAdminRoute) return; // Admin always dark

    const updateBackground = () => {
      const html = document.documentElement;
      const body = document.body;
      const isDark = html.classList.contains('dark');
      body.style.backgroundColor = isDark ? '#000000' : '#f8fafc';
      body.style.color = isDark ? '#ffffff' : '#0f172a';
      html.style.colorScheme = isDark ? 'dark' : 'light';
    };

    // Initial update
    updateBackground();

    // Watch for theme class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateBackground();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [isAdminRoute]);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isAdminRoute) {
      // Admin mode - apply dark theme
      body.classList.remove('landing-mode');
      body.classList.add('admin-mode');
      html.style.colorScheme = 'dark';

      // Ensure background is dark immediately (prevents flash)
      body.style.backgroundColor = '#0a0a0a';
      body.style.color = '#ffffff';

      // Force dark mode for admin
      html.classList.remove('light');
      html.classList.add('dark');
    } else {
      // Landing mode - respect user's theme preference
      body.classList.remove('admin-mode');
      body.classList.add('landing-mode');

      // Background is managed by the MutationObserver above
    }

    // Cleanup function
    return () => {
      body.classList.remove('admin-mode', 'landing-mode');
      html.style.colorScheme = '';
      body.style.backgroundColor = '';
      body.style.color = '';
    };
  }, [isAdminRoute, location.pathname]);

  // This component doesn't render anything
  return null;
}
