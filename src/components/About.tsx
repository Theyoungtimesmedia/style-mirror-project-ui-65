
import { ArrowRight, Award, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-purple-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative group">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-3xl p-6 shadow-2xl border border-purple-200/50">
                <img 
                  src="/lovable-uploads/df8c8c96-ae9a-4224-85d6-0510019b4ddf.png" 
                  alt="DJ Bidex - Professional DJ" 
                  className="w-full h-96 object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Stats Cards */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-sm">Years Experience</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="text-sm">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-in delay-300">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-cyan-400/20 mb-6">
              <Award className="text-cyan-500 mr-2" size={20} />
              <span className="text-cyan-600 font-medium">About DJ Bidex</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Meet Your <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Professional DJ</span>
            </h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed mb-8">
              <p className="text-lg">
                Welcome to DJ Bidex Entertainment! I'm Obadiah Abidemi Samson, your professional DJ bringing 
                premium sound and unforgettable experiences to events across Nigeria. Based in Kogi State, 
                I specialize in creating the perfect atmosphere for your special moments.
              </p>
              
              <p>
                With years of experience in the entertainment industry, I understand that every event is unique. 
                Whether it's a wedding, corporate function, birthday party, or house party, I bring professional-grade 
                equipment, dynamic lighting, and an extensive music library to ensure your guests have an amazing time.
              </p>
              
              <p>
                Beyond DJ services, DJ Bidex Computers offers comprehensive computer solutions including sales, 
                repairs, and technical support. We also provide professional printing and branding services to 
                meet all your business and event needs.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-xl border border-cyan-200/50 hover:scale-105 transition-transform duration-300">
                <Users className="text-cyan-500 mx-auto mb-2" size={32} />
                <div className="font-semibold text-gray-900">1000+ Events</div>
                <div className="text-sm text-gray-600">Successfully Hosted</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 hover:scale-105 transition-transform duration-300">
                <Award className="text-purple-500 mx-auto mb-2" size={32} />
                <div className="font-semibold text-gray-900">Premium Quality</div>
                <div className="text-sm text-gray-600">Professional Equipment</div>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl border border-pink-200/50 hover:scale-105 transition-transform duration-300">
                <Calendar className="text-pink-500 mx-auto mb-2" size={32} />
                <div className="font-semibold text-gray-900">Available 24/7</div>
                <div className="text-sm text-gray-600">Ready to Serve</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact"
                className="group bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center space-x-2"
              >
                <span>Book Your Event</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/services/dj"
                className="group border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>View Services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
