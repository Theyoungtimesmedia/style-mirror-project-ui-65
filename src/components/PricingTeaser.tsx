
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingTeaser = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            DJ Service Packages
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional DJ entertainment packages designed to make your event unforgettable
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Full Setup Package */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105 animate-fade-in">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Full Setup</h3>
              <div className="text-2xl font-bold text-cyan-400 mb-2">Complete Package</div>
              <p className="text-gray-300">Premium DJ Experience</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Professional Sound System",
                "Dynamic Lighting Effects",
                "MC Services Included",
                "Unlimited Song Requests",
                "Full Event Coverage",
                "Professional Setup"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center text-white">
                  <Check className="text-cyan-400 mr-3 flex-shrink-0" size={20} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="text-center">
              <Link 
                to="/services/dj"
                className="inline-flex items-center justify-center w-full py-3 px-6 rounded-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold transition-all duration-300 group-hover:scale-105"
              >
                View Details
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>

          {/* Half Setup Package */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group hover:scale-105 animate-fade-in delay-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Half Setup</h3>
              <div className="text-2xl font-bold text-purple-400 mb-2">Essential Package</div>
              <p className="text-gray-300">Core DJ Services</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                "Core Sound System",
                "Basic Lighting",
                "Music Mixing",
                "Event Coordination",
                "Professional DJ Service"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center text-white">
                  <Check className="text-purple-400 mr-3 flex-shrink-0" size={20} />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="text-center">
              <Link 
                to="/services/dj"
                className="inline-flex items-center justify-center w-full py-3 px-6 rounded-full border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold transition-all duration-300 group-hover:scale-105"
              >
                Learn More
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 animate-fade-in delay-400">
          <p className="text-gray-300 mb-6">
            Custom pricing based on your event type, location, and requirements. Get your personalized quote via WhatsApp.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center py-3 px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Get Custom Quote
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;
