
import { useState } from 'react';
import { Check, Music, Users, Star, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DJServices = () => {
  const [selectedPackage, setSelectedPackage] = useState('full');

  const serviceTypes = [
    {
      title: "Weddings",
      description: "Make your special day unforgettable with romantic music and elegant lighting",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop"
    },
    {
      title: "Birthday Parties",
      description: "Celebrate another year with high-energy music and vibrant party atmosphere",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop"
    },
    {
      title: "Corporate Events",
      description: "Professional entertainment for conferences, product launches, and company parties",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop"
    },
    {
      title: "Private Events",
      description: "Intimate gatherings with personalized music selection and professional service",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
    },
    {
      title: "Baby Showers",
      description: "Gentle, celebratory music perfect for welcoming the new bundle of joy",
      image: "https://images.unsplash.com/photo-1576649678881-42d2ba37bf10?w=400&h=300&fit=crop"
    },
    {
      title: "House Parties",
      description: "Turn your home into the ultimate party destination with great beats",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop"
    }
  ];

  const packages = {
    full: {
      name: "Full Setup",
      price: "₦120,000",
      description: "Complete DJ experience with all the bells and whistles",
      features: [
        "Professional Sound System (4-6 Speakers)",
        "Dynamic LED Lighting Effects",
        "Professional MC Services",
        "Unlimited Song Requests",
        "Custom Playlist Preparation",
        "Full Event Coverage (6-8 hours)",
        "Professional Setup & Breakdown",
        "Backup Equipment Available",
        "Event Coordination Support",
        "Social Media Documentation"
      ],
      popular: true
    },
    half: {
      name: "Half Setup",
      price: "₦50,000",
      description: "Essential DJ package for smaller gatherings",
      features: [
        "Core Sound System (2-3 Speakers)",
        "Basic Lighting Setup",
        "Professional DJ Mixing",
        "Event Coordination",
        "Music Selection & Mixing",
        "Standard Event Coverage (4-5 hours)",
        "Professional Setup",
        "Song Request Handling"
      ],
      popular: false
    }
  };

  const testimonials = [
    {
      name: "Sarah & John",
      event: "Wedding Reception",
      text: "DJ Marcos made our wedding absolutely perfect! The music selection was incredible and he kept everyone dancing all night.",
      rating: 5
    },
    {
      name: "Corporate Solutions Ltd",
      event: "Annual Conference",
      text: "Professional, punctual, and perfectly executed. Our corporate event was a huge success thanks to DJ Bidex.",
      rating: 5
    },
    {
      name: "Maria Santos",
      event: "Birthday Party",
      text: "Amazing energy and great music selection! My guests are still talking about how great the party was.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 pt-24 pb-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              DJ Entertainment Services
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Professional DJ services that transform your events into unforgettable experiences. 
              From intimate gatherings to grand celebrations, we bring the perfect sound and energy.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-cyan-400 hover:bg-cyan-500 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              Book Your Event
              <Calendar className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Event Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in a wide variety of events, each with its own unique atmosphere and requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceTypes.map((service, index) => (
              <div 
                key={service.title}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in delay-500">
            <p className="text-xl text-gray-700 font-semibold">And Lots More...</p>
            <p className="text-gray-600 mt-2">Every event is unique, and we're here to make yours special</p>
          </div>
        </div>
      </section>

      {/* Package Details & Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">DJ Packages & Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect package for your event. Both options include professional service and quality equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Object.entries(packages).map(([key, pkg]) => (
              <div 
                key={key}
                className={`relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-105 animate-fade-in ${
                  pkg.popular ? 'border-2 border-cyan-400' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cyan-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-5xl font-bold text-cyan-600 mb-4">{pkg.price}</div>
                  <p className="text-gray-600">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-cyan-500 mr-3 mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/contact"
                  className={`block w-full text-center py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    pkg.popular 
                      ? 'bg-cyan-400 hover:bg-cyan-500 text-black' 
                      : 'border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-400 hover:text-black'
                  }`}
                >
                  Book This Package
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in delay-300">
            <p className="text-gray-600 mb-6">
              Need custom equipment or additional services? We offer flexible add-ons including:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {[
                "Live Streaming Setup",
                "Extended Hours",
                "Additional Speakers",
                "Special Lighting Effects",
                "Photo Booth Integration",
                "Karaoke Setup"
              ].map((addon, idx) => (
                <span key={idx} className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full">
                  {addon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose DJ Bidex?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-100 rounded-full p-3">
                    <Music className="text-cyan-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Years of Experience</h3>
                    <p className="text-gray-600">Over 5 years of professional DJ experience across hundreds of successful events.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Users className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Service</h3>
                    <p className="text-gray-600">Punctual, reliable, and professional service that exceeds expectations every time.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-pink-100 rounded-full p-3">
                    <Star className="text-pink-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Equipment</h3>
                    <p className="text-gray-600">Top-tier sound systems and lighting equipment for crystal clear audio and stunning visuals.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in delay-200">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop" 
                alt="DJ Equipment Setup"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-cyan-400 text-sm">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cyan-400">
        <div className="container mx-auto px-6 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-black mb-6">Ready to Book Your Event?</h2>
          <p className="text-xl text-gray-900 mb-8 max-w-2xl mx-auto">
            Let's make your next event unforgettable. Contact us today for a free consultation and custom quote.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center bg-black text-white font-semibold px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            Book Your Event Now
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DJServices;
