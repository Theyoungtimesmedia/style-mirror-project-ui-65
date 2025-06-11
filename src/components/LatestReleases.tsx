
import { Play, Heart, Download } from 'lucide-react';

const LatestReleases = () => {
  const releases = [
    {
      id: 1,
      title: "Buga",
      artist: "Kizz Daniel ft. Tekno",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      gradient: "from-green-400 to-blue-500"
    },
    {
      id: 2,
      title: "Last Last",
      artist: "Burna Boy",
      image: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=300&h=300&fit=crop",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Palazzo",
      artist: "Spinall ft. Asake",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      gradient: "from-orange-400 to-red-500"
    },
    {
      id: 4,
      title: "Rush",
      artist: "Ayra Starr",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      gradient: "from-cyan-400 to-purple-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-cyan-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Latest Nigerian Hits
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Feel the rhythm with the hottest tracks from Nigeria's finest artists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {releases.map((release, index) => (
            <div 
              key={release.id} 
              className="group cursor-pointer hover:scale-105 transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-6 shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${release.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                
                {/* Album Image */}
                <img 
                  src={release.image} 
                  alt={release.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <div className="flex space-x-3">
                      <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110">
                        <Play size={20} />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110">
                        <Heart size={20} />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 hover:scale-110">
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sound Wave Animation */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-white rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Song Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {release.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {release.artist}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in delay-500">
          <button className="group bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center space-x-2 mx-auto">
            <span>Explore More Tracks</span>
            <Play size={20} className="group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
