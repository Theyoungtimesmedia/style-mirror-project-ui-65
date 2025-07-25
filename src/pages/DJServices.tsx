import { useState } from 'react';
import { Check, Music, Users, Star, Calendar, ArrowRight, Phone, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DJServices = () => {
  const [selectedPackage, setSelectedPackage] = useState('full');
  const whatsappNumber = "+2349026001136";
  const whatsappMessage = "Hello! I'd like to book DJ services for my event.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const serviceTypes = [
    {
      title: "Corporate Events",
      description: "Professional entertainment for conferences, product launches, and company parties",
      image: "/lovable-uploads/832bae32-428c-4c3b-a03a-b213d53d4780.png"
    },
    {
      title: "Wedding Celebrations",
      description: "Make your special day unforgettable with romantic music and elegant atmosphere",
      image: "/lovable-uploads/f7b40b6e-a587-44ca-b1de-53d202638257.png"
    },
    {
      title: "Party Events",
      description: "High-energy entertainment for birthdays, house parties and celebrations",
      image: "/lovable-uploads/dac82fd3-5350-4321-a0c4-4b9ed104b342.png"
    },
    {
      title: "Religious Ceremonies",
      description: "Respectful and professional sound services for religious and spiritual events",
      image: "/lovable-uploads/51e483f4-f26f-4055-92cb-afcfff1020a2.png"
    },
    {
      title: "Baby Showers",
      description: "Gentle, celebratory music perfect for welcoming the new bundle of joy",
      image: "/lovable-uploads/ddb2ad2e-ae2b-4122-81b9-8d2daf5980d5.png"
    },
    {
      title: "Private Events",
      description: "Intimate gatherings with personalized music selection and professional service",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop"
    }
  ];

  const packages = {
    full: {
      name: "Full Setup",
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
      text: "DJ Bidex made our wedding absolutely perfect! The music selection was incredible and he kept everyone dancing all night.",
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
      <section className="relative bg-black pt-24 pb-20">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/c8b55511-147a-42e4-81d2-c83ab36d78dd.png')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['Inter']">
              DJ Entertainment Services
            </h1>
            <p className="text-xl text-gray-300 mb-8 font-['Inter']">
              Professional DJ services that transform your events into unforgettable experiences. 
              From intimate gatherings to grand celebrations, we bring the perfect sound and energy.
            </p>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 font-['Inter']"
            >
              Book Your Event
              <Calendar className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Video Demos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-black mb-6 font-['Inter']">See Us In Action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
              Watch our DJ performances and see why we're the perfect choice for your event
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
              <div className="aspect-video">
                <iframe 
                  src="https://youtube.com/embed/JIFEf7DdKEw" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen
                  className="w-full h-full"
                  title="DJ Bidex Performance Demo 1"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-['Inter']">Live Performance</h3>
                <p className="text-gray-400 font-['Inter']">Watch our professional DJ setup in action</p>
              </div>
            </div>

            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="aspect-video">
                <iframe 
                  src="https://youtube.com/embed/3c-IhydwwkQ" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen
                  className="w-full h-full"
                  title="DJ Bidex Performance Demo 2"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-['Inter']">Event Highlights</h3>
                <p className="text-gray-400 font-['Inter']">Experience the energy we bring to every event</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-black mb-6">Our Event Services</h2>
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
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{service.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in delay-500">
            <p className="text-xl text-black font-semibold">And Lots More...</p>
            <p className="text-gray-600 mt-2">Every event is unique, and we're here to make yours special</p>
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-black mb-6 font-['Inter']">DJ Service Packages</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
              Choose the perfect package for your event. Both options include professional service and quality equipment.
              <br />
              <span className="text-red-600 font-semibold">Prices vary by event type and will be discussed via WhatsApp</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Object.entries(packages).map(([key, pkg]) => (
              <div 
                key={key}
                className={`relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:scale-105 animate-fade-in border-2 ${
                  pkg.popular ? 'border-red-500' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold font-['Inter']">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-black mb-4 font-['Inter']">{pkg.name}</h3>
                  <p className="text-gray-600 font-['Inter']">{pkg.description}</p>
                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-red-600 font-semibold text-sm font-['Inter']">
                      Custom pricing based on your event needs
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-red-500 mr-3 mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-700 font-['Inter']">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:scale-105 font-['Inter'] ${
                    pkg.popular 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
                  }`}
                >
                  Get Quote for {pkg.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-black mb-6">Why Choose DJ Bidex?</h2>
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
      <section className="py-20 bg-black">
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
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/15 transition-all duration-300 animate-fade-in border border-red-500/20"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-red-500 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-red-400 text-sm">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="container mx-auto px-6 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-white mb-6 font-['Inter']">Ready to Book Your Event?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-['Inter']">
            Let's make your next event unforgettable. Contact us today for a free consultation and custom quote.
          </p>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white text-red-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-['Inter']"
          >
            <Phone className="mr-2" size={20} />
            Get Your Custom Quote
            <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DJServices;
