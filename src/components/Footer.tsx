
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = "+2347038603819";
  const whatsappMessage = "Hello! I'd like to send you a message.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="animate-fade-in">
            <img 
              src="/lovable-uploads/4f36b461-ddc9-494a-8022-d6409f46ed4e.png" 
              alt="DJ Bidex Entertainment" 
              className="h-16 w-auto mb-6"
              loading="lazy"
            />
            <p className="text-gray-400 mb-6 font-['Inter']">
              Professional DJ entertainment, computer services, and printing solutions. 
              Making your events unforgettable across Nigeria.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/DjbidexBidex" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@djbidexx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@djaybidex" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-red-400 transition-all duration-300 hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-xl font-bold mb-6 text-red-400 font-['Inter']">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300 font-['Inter']">
                  Home
                </a>
              </li>
              <li>
                <a href="/services/dj" className="text-gray-400 hover:text-white transition-colors duration-300 font-['Inter']">
                  DJ Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 font-['Inter']">
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 font-['Inter']"
                >
                  Send Message
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold mb-6 text-red-400 font-['Inter']">Get In Touch</h3>
            <div className="space-y-4">
              <a 
                href={`tel:${whatsappNumber}`}
                className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <Phone className="mr-3 group-hover:scale-110 transition-transform duration-300" size={20} />
                <span className="font-['Inter']">{whatsappNumber}</span>
              </a>
              <a 
                href="mailto:djbidex@gmail.com"
                className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <Mail className="mr-3 group-hover:scale-110 transition-transform duration-300" size={20} />
                <span className="font-['Inter']">djbidex@gmail.com</span>
              </a>
              <div className="flex items-center text-gray-400">
                <MapPin className="mr-3" size={20} />
                <span className="font-['Inter']">Nigeria</span>
              </div>
            </div>

            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 mt-6 font-['Inter'] font-semibold"
            >
              <Phone className="mr-2" size={18} />
              Contact Us
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-12 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-400 font-['Inter']">
            © 2025 DJ Bidex Entertainment. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
