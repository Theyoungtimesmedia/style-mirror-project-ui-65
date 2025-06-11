
import { Music, Monitor, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoreServices = () => {
  const services = [
    {
      icon: Music,
      title: "DJ Entertainment",
      description: "Professional DJ services for weddings, corporate events, house parties, and special celebrations across Nigeria.",
      features: ["Professional Sound System", "Dynamic Lighting Effects", "MC Services", "Custom Playlists"],
      link: "/services/dj",
      image: "/lovable-uploads/b148959e-ba8c-409e-8fe9-fb0844cb56f2.png"
    },
    {
      icon: Monitor,
      title: "Computer Services",
      description: "Complete computer solutions including sales, repairs, and supply of computer accessories and systems.",
      features: ["Computer Sales", "Repair Services", "Technical Support", "Hardware Supply"],
      link: "/contact",
      image: "/lovable-uploads/1f308943-178d-49aa-85c3-22a61691948d.png"
    },
    {
      icon: Printer,
      title: "Print & Branding",
      description: "Professional printing services for flyers, invitations, posters, and all your branding needs with direct image printing.",
      features: ["Event Flyers", "Wedding Invitations", "Business Posters", "Direct Image Print"],
      link: "/contact",
      image: "/lovable-uploads/c384eba2-da4d-4532-85e5-c609b5bfdd02.png"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Our <span className="text-red-600">Core Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From professional DJ entertainment to complete computer solutions and printing services, 
            we've got all your event and business needs covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                
                <div className="absolute top-6 right-6">
                  <div className="p-3 rounded-full bg-white/90 backdrop-blur-sm border border-white/50 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="text-red-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-red-600 mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to={service.link}
                  className="group/btn inline-flex items-center justify-center w-full py-4 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 hover:scale-105"
                >
                  <span className="group-hover/btn:mr-2 transition-all duration-300">Learn More</span>
                  <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
