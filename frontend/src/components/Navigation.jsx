import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Catering', path: '/catering' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const currentScrollDirection = scrollTop > lastScrollY ? 'down' : 'up';
      const wasScrolled = isScrolled;
      
      // Update scroll direction
      if (Math.abs(scrollTop - lastScrollY) > 10) {
        setScrollDirection(currentScrollDirection);
      }
      
      // Update scroll state with smoother threshold
      const newScrolledState = scrollTop > 30;
      setIsScrolled(newScrolledState);
      
      // Trigger flash effect when navbar state changes
      if (wasScrolled !== newScrolledState) {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 600);
      }
      
      setLastScrollY(scrollTop);
    };

    // Only add scroll listener on homepage
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true); // Always solid on other pages
    }
  }, [isHomePage, lastScrollY, isScrolled]);

  // Enhanced dynamic classes with better animations
  const navClasses = isHomePage && !isScrolled 
    ? "fixed top-0 w-full bg-transparent z-50 transition-all duration-500 ease-out transform"
    : "fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-lg border-b border-amber-100/50 transition-all duration-500 ease-out transform";

  // Logo animation classes
  const logoClasses = isHomePage && !isScrolled 
    ? "flex items-center space-x-2 text-white hover:text-white/80 transition-all duration-300 ease-out transform hover:scale-105"
    : "flex items-center space-x-2 text-amber-800 hover:text-amber-600 transition-all duration-300 ease-out transform hover:scale-105";

  // Enhanced link classes with better hover effects
  const linkClasses = (path) => {
    const baseClasses = "text-base font-medium transition-all duration-300 ease-out relative group";
    if (isActive(path)) {
      return `${baseClasses} ${isHomePage && !isScrolled ? 'text-white' : 'text-amber-700'}`;
    }
    return `${baseClasses} ${isHomePage && !isScrolled ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-amber-600'}`;
  };

  // Enhanced mobile menu classes
  const mobileMenuClasses = isHomePage && !isScrolled 
    ? "md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/20 shadow-xl transition-all duration-300 ease-out"
    : "md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-amber-100/50 shadow-xl transition-all duration-300 ease-out";

  // Enhanced mobile link classes
  const mobileLinkClasses = (path) => {
    const baseClasses = "block px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ease-out transform hover:scale-105";
    if (isActive(path)) {
      return `${baseClasses} ${isHomePage && !isScrolled ? 'text-white bg-white/10' : 'text-amber-700 bg-amber-50'}`;
    }
    return `${baseClasses} ${isHomePage && !isScrolled ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'}`;
  };

  // Enhanced button classes
  const buttonClasses = isHomePage && !isScrolled 
    ? "text-white hover:text-white hover:bg-white/10 transition-all duration-200 ease-out transform hover:scale-105"
    : "text-amber-800 hover:text-amber-600 hover:bg-amber-50 transition-all duration-200 ease-out transform hover:scale-105";

  return (
    <nav className={navClasses}>
      {/* Flash effect overlay for scroll transition */}
      {showFlash && (
        <div className="absolute inset-0 bg-white/30 navbar-flash"></div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-16">
          {/* Enhanced Logo */}
          <Link to="/" className={logoClasses}>
            <Coffee className="h-8 w-8 transition-transform duration-300 ease-out group-hover:rotate-12" />
            <span 
              className="text-2xl font-bold font-serif transition-all duration-300 ease-out" 
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Cafe Pronto
            </span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={linkClasses(link.path)}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600 rounded-full transition-all duration-300 ease-out transform scale-x-100"></span>
                )}
                {/* Enhanced hover underline effect */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className={buttonClasses}
            >
              {isOpen ? (
                <X className="h-6 w-6 transition-transform duration-300 ease-out rotate-180" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-300 ease-out" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div className={mobileMenuClasses}>
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={mobileLinkClasses(link.path)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInFromTop 0.3s ease-out forwards'
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;