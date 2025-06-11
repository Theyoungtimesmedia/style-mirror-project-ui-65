
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
      gradient: "from-purple-500 to-pink-500",
      image: "/lovable-uploads/b148959e-ba8c-409e-8fe9-fb0844cb56f2.png"
    },
    {
      icon: Monitor,
      title: "Computer Services",
      description: "Complete computer solutions including sales, repairs, and supply of computer accessories and systems.",
      features: ["Computer Sales", "Repair Services", "Technical Support", "Hardware Supply"],
      link: "/contact",
      gradient: "from-blue-500 to-cyan-500",
      image: "/lovable-uploads/1f308943-178d-49aa-85c3-22a61691948d.png"
    },
    {
      icon: Printer,
      title: "Print & Branding",
      description: "Professional printing services for flyers, invitations, posters, and all your branding needs with direct image printing.",
      features: ["Event Flyers", "Wedding Invitations", "Business Posters", "Direct Image Print"],
      link: "/contact",
      gradient: "from-green-500 to-teal-500",
      image: "/lovable-uploads/c384eba2-da4d-4532-85e5-c609b5bfdd02.png"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Core Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From professional DJ entertainment to complete computer solutions and printing services, 
            we've got all your event and business needs covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className="group bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 overflow-hidden border border-white/20 hover:border-cyan-400/50 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Floating Icon */}
                <div className="absolute top-6 right-6">
                  <div className={`p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="text-white" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3 group-hover:animate-pulse`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to={service.link}
                  className={`group/btn inline-flex items-center justify-center w-full py-4 px-6 rounded-full bg-gradient-to-r ${service.gradient} text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40`}
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
