
import { ArrowRight, Music, Users, Star, Play, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* DJ Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/df8c8c96-ae9a-4224-85d6-0510019b4ddf.png" 
          alt="DJ Bidex" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/85 to-red-900/90"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-400/20 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-yellow-400/15 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Floating Music Notes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 text-cyan-400/30 animate-bounce delay-300">
          <Music size={32} />
        </div>
        <div className="absolute top-3/4 right-1/3 text-purple-400/30 animate-bounce delay-1000">
          <Play size={28} />
        </div>
        <div className="absolute bottom-1/4 left-1/2 text-pink-400/30 animate-bounce delay-700">
          <Music size={24} />
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30 mb-6 animate-scale-in">
                <Play className="text-cyan-400 mr-2" size={16} />
                <span className="text-cyan-400 text-sm font-medium">Professional DJ Services</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-scale-in">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  DJ BIDEX
                </span>
              </h1>
              
              <h2 className="text-xl lg:text-2xl text-white/90 mb-6 animate-fade-in delay-200">
                Professional DJ Player & Entertainment Services
              </h2>
              
              <p className="text-gray-300 text-lg mb-8 max-w-xl animate-fade-in delay-300">
                From weddings to corporate events, I bring premium sound, lighting, and energy 
                to make your celebration extraordinary. Based in Kogi State, serving all of Nigeria.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in delay-500">
                <Link 
                  to="/contact"
                  className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 flex items-center justify-center space-x-2"
                >
                  <Calendar size={20} />
                  <span>Book Your Event</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  to="/services/dj"
                  className="group border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/25 flex items-center justify-center space-x-2"
                >
                  <Music size={20} />
                  <span>View Packages</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-lg animate-fade-in delay-700">
                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors">
                    <Music className="text-cyan-400 mx-auto mb-2" size={24} />
                    <div className="text-white font-bold text-lg">500+</div>
                    <div className="text-gray-300 text-sm">Events</div>
                  </div>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 border border-purple-400/20 group-hover:border-purple-400/40 transition-colors">
                    <Users className="text-purple-400 mx-auto mb-2" size={24} />
                    <div className="text-white font-bold text-lg">1000+</div>
                    <div className="text-gray-300 text-sm">Happy Clients</div>
                  </div>
                </div>

                <div className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-4 border border-pink-400/20 group-hover:border-pink-400/40 transition-colors">
                    <Star className="text-pink-400 mx-auto mb-2" size={24} />
                    <div className="text-white font-bold text-lg">5-Star</div>
                    <div className="text-gray-300 text-sm">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative animate-fade-in delay-300">
            <div className="relative group">
              {/* Glowing Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
              
              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/20">
                <img 
                  src="/lovable-uploads/089fc801-fad3-4fe2-8413-752aee3e2e25.png" 
                  alt="DJ Bidex at work" 
                  className="w-full h-auto rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Play Button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-full p-4 shadow-2xl hover:scale-110 transition-all duration-300 group-hover:animate-pulse">
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
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
