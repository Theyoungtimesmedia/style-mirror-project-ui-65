
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      {/* Background crowd silhouette overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <h1 className="text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-cyan-400">DJ</span>{' '}
              <span className="text-white">Bidex</span>
            </h1>
            <h2 className="text-xl lg:text-2xl text-white/90 mb-6">
              Professional DJ Player from Las Vegas
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
              enim ad minim veniam, quis nostrud exercitat.
            </p>
            <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center space-x-2 group">
              <span>Contact Us</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Content - DJ Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="/lovable-uploads/29a2316b-be67-4264-baca-dfacaabc93d1.png" 
                alt="DJ Bidex performing" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-cyan-400/20 blur-3xl rounded-full transform scale-110 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </section>
  );
};

export default Hero;
