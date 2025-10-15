import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * StyleManager Component
 *
 * Manages body classes based on the current route to control CSS specificity.
 * - Admin routes (/admin/*) get 'admin-mode' class for dark theme styles
 * - Landing pages get 'landing-mode' class for landing page styles
 *
 * Both CSS files are loaded (tailwind.css and admin.css), but body classes
 * control which styles take precedence through CSS specificity.
 */
export function StyleManager() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

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
    } else {
      // Landing mode - apply light theme
      body.classList.remove('admin-mode');
      body.classList.add('landing-mode');
      html.style.colorScheme = 'light';

      // Reset background to default
      body.style.backgroundColor = '';
      body.style.color = '';
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
