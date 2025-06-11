
import { ArrowRight, Music, Users, Star, Play, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const whatsappNumber = "+2347038603819";
  const whatsappMessage = "Hello! I'd like to book DJ services for my event.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/c8b55511-147a-42e4-81d2-c83ab36d78dd.png" 
          alt="DJ Background" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-red-900/30"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 bg-red-600/20 backdrop-blur-sm rounded-full border border-red-500/30 mb-8 hover:bg-red-600/30 transition-all duration-300">
              <Play className="text-red-400 mr-2 animate-pulse" size={18} />
              <span className="text-red-400 font-semibold font-['Inter']">Professional DJ Entertainment</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 font-['Inter']">
              <span className="text-white animate-slide-in-left">DJ</span>
              <span className="text-red-500 ml-4 animate-slide-in-right">BIDEX</span>
            </h1>
            
            <h2 className="text-xl lg:text-2xl text-gray-300 mb-6 font-light font-['Inter'] animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Premium Sound & Entertainment Solutions
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed font-['Inter'] animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Professional DJ services, computer solutions, and printing services. 
              Making your events unforgettable with premium quality and exceptional service across Nigeria.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 flex items-center justify-center space-x-2 font-['Inter']"
              >
                <Calendar size={20} />
                <span>Book Your Event</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <Link 
                to="/services/dj"
                className="group border-2 border-white/80 text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 font-['Inter']"
              >
                <Music size={20} />
                <span>View Services</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/20 hover:border-red-500/40 transition-colors duration-300">
                  <Music className="text-red-400 mx-auto mb-2" size={24} />
                  <div className="text-white font-bold text-xl font-['Inter']">500+</div>
                  <div className="text-gray-400 text-sm font-['Inter']">Events</div>
                </div>
              </div>

              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/20 hover:border-red-500/40 transition-colors duration-300">
                  <Users className="text-red-400 mx-auto mb-2" size={24} />
                  <div className="text-white font-bold text-xl font-['Inter']">1000+</div>
                  <div className="text-gray-400 text-sm font-['Inter']">Clients</div>
                </div>
              </div>

              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/20 hover:border-red-500/40 transition-colors duration-300">
                  <Star className="text-red-400 mx-auto mb-2" size={24} />
                  <div className="text-white font-bold text-xl font-['Inter']">5-Star</div>
                  <div className="text-gray-400 text-sm font-['Inter']">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-black/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20 hover:border-red-500/40 transition-colors duration-300">
                <img 
                  src="/lovable-uploads/f6f2759c-e4d0-4a4f-95da-64bce1479973.png" 
                  alt="DJ Bidex Professional" 
                  className="w-full h-auto rounded-xl shadow-2xl transform scale-110 object-cover hover:scale-115 transition-transform duration-500"
                  loading="eager"
                />
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse">
                    <Play size={32} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-red-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-red-400/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
