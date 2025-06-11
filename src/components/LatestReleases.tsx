
import { Play, Heart, Download } from 'lucide-react';

const LatestReleases = () => {
  const releases = [
    {
      id: 1,
      title: "PITY THIS BOY",
      artist: "ODUMODUBLVCK",
      year: "2025",
      image: "/lovable-uploads/6e60fc1e-f6c3-48a9-93a5-4d9dce34879c.png"
    },
    {
      id: 2,
      title: "Slow Down",
      artist: "Luddy Dave",
      year: "2025",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format&q=80"
    },
    {
      id: 3,
      title: "We will be many",
      artist: "Sound Of Salem",
      year: "2025",
      image: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=300&h=300&fit=crop&auto=format&q=80"
    },
    {
      id: 4,
      title: "All The Love",
      artist: "Ayra Starr",
      year: "2025",
      image: "/lovable-uploads/25e72b95-ae53-495d-a12e-e02834ed6dd2.png"
    },
    {
      id: 5,
      title: "Update",
      artist: "Burna Boy",
      year: "2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&auto=format&q=80"
    },
    {
      id: 6,
      title: "WHY LOVE",
      artist: "Asake",
      year: "2025",
      image: "/lovable-uploads/115a498d-1a40-4ee4-898e-21b781bfa854.png"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 font-['Inter']">
            Latest Nigerian Hits
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-['Inter']">
            Feel the rhythm with the hottest tracks from Nigeria's finest artists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <div 
              key={release.id} 
              className="group cursor-pointer hover:scale-105 transition-all duration-500 animate-fade-in bg-white rounded-xl shadow-lg hover:shadow-2xl"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-xl mb-4 shadow-xl hover:shadow-2xl transition-all duration-500 bg-black">
                <img 
                  src={release.image} 
                  alt={release.title}
                  className="w-full h-64 object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <div className="flex space-x-3">
                      <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg">
                        <Play size={20} />
                      </button>
                      <button className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 hover:scale-110">
                        <Heart size={20} />
                      </button>
                      <button className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 hover:scale-110">
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-red-500 rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center p-4">
                <h3 className="text-xl font-bold text-black mb-2 group-hover:text-red-600 transition-colors duration-300 font-['Inter']">
                  {release.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 font-['Inter']">
                  {release.artist} • {release.year}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in delay-500">
          <Link 
            to="/services/dj"
            className="group bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-2 mx-auto w-fit font-['Inter']"
          >
            <span>Learn More</span>
            <Play size={20} className="group-hover:rotate-180 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
