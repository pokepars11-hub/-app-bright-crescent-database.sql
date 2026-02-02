import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-shinobi-dark text-white mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="bg-shinobi-red px-4 py-2 rounded-md inline-block mb-4">
              <h2 className="text-white font-bold text-xl tracking-wide">SHINOBI</h2>
              <p className="text-white text-xs uppercase tracking-wider">APPLIANCES</p>
            </div>
            <p className="text-gray-400 text-sm">
              Premium smart home and lifestyle products. Quality you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-shinobi-gold transition-colors" data-testid="footer-home">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-shinobi-gold transition-colors" data-testid="footer-products">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-shinobi-gold transition-colors" data-testid="footer-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-shinobi-gold transition-colors" data-testid="footer-contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-shinobi-gold transition-colors" data-testid="footer-privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-shinobi-gold transition-colors" data-testid="footer-terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={18} />
                <a href="mailto:info@shinobi-appliances.com" className="hover:text-shinobi-gold transition-colors" data-testid="footer-email">
                  info@shinobi-appliances.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={18} />
                <span>+971 XX XXX XXXX</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-shinobi-gold transition-colors" aria-label="Facebook" data-testid="social-facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-shinobi-gold transition-colors" aria-label="Instagram" data-testid="social-instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-shinobi-gold transition-colors" aria-label="Twitter" data-testid="social-twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SHINOBI Appliances. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
