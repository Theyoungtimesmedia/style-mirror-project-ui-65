
import { Music, Monitor, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoreServices = () => {
  const services = [
    {
      icon: Music,
      title: "DJ Entertainment",
      description: "Professional DJ services for weddings, corporate events, house parties, and special celebrations.",
      features: ["Professional Sound System", "Lighting Effects", "MC Services", "Custom Playlists"],
      link: "/services/dj",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Monitor,
      title: "Computer Services",
      description: "Complete computer solutions including sales, repairs, and supply of computer accessories.",
      features: ["Computer Sales", "Repair Services", "Technical Support", "Hardware Supply"],
      link: "/contact",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Printer,
      title: "Print & Branding",
      description: "Professional printing services for flyers, invitations, posters, and all your branding needs.",
      features: ["Event Flyers", "Wedding Invitations", "Business Posters", "Custom Designs"],
      link: "/contact",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Core Services
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
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
              
              <div className="p-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="text-white" size={28} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient} mr-3`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  to={service.link}
                  className={`inline-flex items-center justify-center w-full py-3 px-6 rounded-full bg-gradient-to-r ${service.gradient} text-white font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                >
                  Learn More
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
