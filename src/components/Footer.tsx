import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 p-2 rounded-lg">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Maa Mangala</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner for all car repair and maintenance needs. Expert technicians, quality parts, and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Home
              </Link>
              <Link to="/services" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Services
              </Link>
              <Link to="/brands" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Brands
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors duration-200">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-400">+91 79789 33702</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-600" />
                <span className="text-gray-400">maamangalaautoworks5@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-600 mt-1" />
                <span className="text-gray-400">
                  Near Symphony Mall, Rudrapur, Hanspal<br />
                  Bhubaneswar, Odisha 752101
                </span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-gray-400">Mon - Sat</p>
                  <p className="text-white">8:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-gray-400">Sunday</p>
                  <p className="text-white">10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Maa Mangala. All rights reserved. | Designed with ❤️ by <a className='text-blue-400 hover:text-green-400' href="https://dayacs.com/" target='_blank' rel="noreferrer">DCS</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;