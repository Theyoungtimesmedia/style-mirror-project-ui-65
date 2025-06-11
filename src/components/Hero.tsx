
import { ArrowRight, Music, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-400/10 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="animate-fade-in">
            <h1 className="text-6xl lg:text-8xl font-bold mb-6 animate-scale-in">
              <span className="text-cyan-400">DJ</span>{' '}
              <span className="text-white">Marcos</span>
            </h1>
            <h2 className="text-2xl lg:text-3xl text-white/90 mb-8 animate-fade-in delay-200">
              Professional DJ Player from Las Vegas
            </h2>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in delay-300">
              Creating unforgettable moments with premium DJ entertainment services. 
              From weddings to corporate events, I bring the perfect sound and energy 
              to make your celebration extraordinary.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in delay-500">
              <Link 
                to="/contact"
                className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center space-x-2 group"
              >
                <span>Contact Me</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/services/dj"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                View Services
              </Link>
            </div>

            {/* Stats/Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in delay-700">
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-400/20 transition-colors">
                  <Music className="text-cyan-400" size={28} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Premium Sound</h3>
                <p className="text-gray-300 text-sm">Professional grade equipment for crystal clear audio</p>
              </div>

              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-400/20 transition-colors">
                  <Users className="text-cyan-400" size={28} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">All Events</h3>
                <p className="text-gray-300 text-sm">Weddings, parties, corporate events & more</p>
              </div>

              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-400/20 transition-colors">
                  <Star className="text-cyan-400" size={28} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">5-Star Service</h3>
                <p className="text-gray-300 text-sm">Rated excellent by hundreds of satisfied clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
