
const LatestReleases = () => {
  const releases = [
    {
      id: 1,
      title: "Vintagiya",
      subtitle: "Vintage dream (album)",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      title: "Party all Night",
      subtitle: "Party DJ (album)",
      image: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=300&h=300&fit=crop",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Not Alone",
      subtitle: "Romantic songs (album)",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      gradient: "from-teal-400 to-blue-500"
    },
    {
      id: 4,
      title: "Always with You",
      subtitle: "Romantic songs (album)",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
      gradient: "from-blue-600 to-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Latest Releases</h2>
          <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {releases.map((release) => (
            <div 
              key={release.id} 
              className="group cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-lg mb-4 shadow-lg">
                <div className={`absolute inset-0 bg-gradient-to-br ${release.gradient} opacity-80`}></div>
                <img 
                  src={release.image} 
                  alt={release.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{release.title}</h3>
              <p className="text-gray-600">{release.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestReleases;
