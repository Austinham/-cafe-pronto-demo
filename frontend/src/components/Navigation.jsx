import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee } from 'lucide-react';
import { Button } from './ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
      setIsScrolled(scrollTop > 50);
    };

    // Only add scroll listener on homepage
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true); // Always solid on other pages
    }
  }, [isHomePage]);

  // Dynamic classes based on scroll state and page
  const navClasses = isHomePage && !isScrolled 
    ? "fixed top-0 w-full bg-transparent z-50 transition-all duration-300"
    : "fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm border-b border-amber-100 transition-all duration-300";

  const textClasses = isHomePage && !isScrolled 
    ? "text-white"
    : "text-amber-800";

  const linkClasses = (path) => {
    const baseClasses = "text-base font-medium transition-colors duration-200 relative";
    if (isActive(path)) {
      return `${baseClasses} ${isHomePage && !isScrolled ? 'text-white' : 'text-amber-700'}`;
    }
    return `${baseClasses} ${isHomePage && !isScrolled ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-amber-600'}`;
  };

  const mobileMenuClasses = isHomePage && !isScrolled 
    ? "md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/20 shadow-lg"
    : "md:hidden absolute top-16 left-0 w-full bg-white border-b border-amber-100 shadow-lg";

  const mobileLinkClasses = (path) => {
    const baseClasses = "block px-4 py-3 rounded-md text-base font-medium transition-colors";
    if (isActive(path)) {
      return `${baseClasses} ${isHomePage && !isScrolled ? 'text-white bg-white/10' : 'text-amber-700 bg-amber-50'}`;
    }
    return `${baseClasses} ${isHomePage && !isScrolled ? 'text-white/90 hover:text-white hover:bg-white/10' : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'}`;
  };

  const buttonClasses = isHomePage && !isScrolled 
    ? "text-white hover:text-white hover:bg-white/10"
    : "text-amber-800 hover:text-amber-600 hover:bg-amber-50";

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-amber-800 hover:text-amber-600 transition-colors">
            <Coffee className="h-8 w-8" />
            <span className="text-2xl font-bold font-serif" style={{ fontFamily: 'Playfair Display, serif' }}>
              Cafe Pronto
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-base font-medium transition-colors duration-200 relative ${
                  isActive(link.path)
                    ? 'text-amber-700'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-800 hover:text-amber-600 hover:bg-amber-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-amber-100 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-amber-700 bg-amber-50'
                      : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
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