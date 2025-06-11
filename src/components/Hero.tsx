
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
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop" 
          alt="DJ Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-red-900/40"></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 bg-red-600/20 backdrop-blur-sm rounded-full border border-red-500/30 mb-8">
              <Play className="text-red-400 mr-2" size={18} />
              <span className="text-red-400 font-medium">Professional DJ Entertainment</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-6">
              <span className="text-white">DJ</span>
              <span className="text-red-500 ml-4">BIDEX</span>
            </h1>
            
            <h2 className="text-2xl lg:text-3xl text-gray-300 mb-6 font-light">
              Premium Sound & Entertainment
            </h2>
            
            <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
              Professional DJ services, computer solutions, and printing services. 
              Making your events unforgettable with premium quality and exceptional service.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 flex items-center justify-center space-x-2"
              >
                <Calendar size={20} />
                <span>Book Your Event</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <Link 
                to="/services/dj"
                className="group border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Music size={20} />
                <span>View Services</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-lg">
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
                  <Music className="text-red-400 mx-auto mb-2" size={24} />
                  <div className="text-white font-bold text-xl">500+</div>
                  <div className="text-gray-400 text-sm">Events</div>
                </div>
              </div>

              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
                  <Users className="text-red-400 mx-auto mb-2" size={24} />
                  <div className="text-white font-bold text-xl">1000+</div>
                  <div className="text-gray-400 text-sm">Clients</div>
                </div>
              </div>

              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
                  <Star className="text-red-400 mx-auto mb-2" size={24} />
                  <div className="text-white font-bold text-xl">5-Star</div>
                  <div className="text-gray-400 text-sm">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-black/20 rounded-2xl blur-xl opacity-60"></div>
              
              <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
                <img 
                  src="/lovable-uploads/f6f2759c-e4d0-4a4f-95da-64bce1479973.png" 
                  alt="DJ Bidex" 
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
                
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 shadow-2xl hover:scale-110 transition-all duration-300">
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
