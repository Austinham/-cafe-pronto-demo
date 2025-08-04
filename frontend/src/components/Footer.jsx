import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { mockData } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-amber-900 to-amber-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8 text-amber-200" />
              <span 
                className="text-2xl font-bold"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Cafe Pronto
              </span>
            </Link>
            <p className="text-amber-100 mb-6 leading-relaxed max-w-md">
              Quality coffee served quickly. Since 2018, we've been your neighborhood's 
              premium coffee destination, combining speed with exceptional taste and service.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="bg-amber-700 hover:bg-amber-600 p-3 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-amber-700 hover:bg-amber-600 p-3 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-amber-700 hover:bg-amber-600 p-3 rounded-full transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4 text-amber-200"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Menu', path: '/menu' },
                { name: 'Catering', path: '/catering' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-amber-100 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 
              className="text-lg font-semibold mb-4 text-amber-200"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-200 mt-0.5 flex-shrink-0" />
                <p className="text-amber-100 text-sm">
                  {mockData.contact.address}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-200 flex-shrink-0" />
                <p className="text-amber-100 text-sm">
                  {mockData.contact.phone}
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-200 flex-shrink-0" />
                <p className="text-amber-100 text-sm">
                  {mockData.contact.email}
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-amber-200 mt-0.5 flex-shrink-0" />
                <div className="text-amber-100 text-sm">
                  <p>{mockData.contact.hours.weekdays}</p>
                  <p>{mockData.contact.hours.weekends}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-amber-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-amber-200 text-sm mb-4 md:mb-0">
            © {currentYear} Cafe Pronto. All rights reserved. Made with ❤️ for coffee lovers.
          </p>
          
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-amber-100 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-amber-100 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-amber-100 hover:text-white transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;