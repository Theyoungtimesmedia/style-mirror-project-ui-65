import { useState, useEffect } from 'react';
import { Play, Heart, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AudioPlayer from './AudioPlayer';

interface Mixtape {
  id: string;
  title: string;
  artist: string;
  thumbnail_url: string;
  audio_url: string;
  release_date: string;
}

const LatestReleases = () => {
  const [releases, setReleases] = useState<Mixtape[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  // Static fallback data
  const fallbackReleases = [
    {
      id: "1",
      title: "PITY THIS BOY",
      artist: "ODUMODUBLVCK",
      release_date: "2025-01-01",
      thumbnail_url: "/lovable-uploads/6e60fc1e-f6c3-48a9-93a5-4d9dce34879c.png",
      audio_url: ""
    },
    {
      id: "2",
      title: "Slow Down",
      artist: "Luddy Dave",
      release_date: "2025-01-01",
      thumbnail_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format&q=80",
      audio_url: ""
    },
    {
      id: "3",
      title: "We will be many",
      artist: "Sound Of Salem",
      release_date: "2025-01-01",
      thumbnail_url: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=300&h=300&fit=crop&auto=format&q=80",
      audio_url: ""
    },
    {
      id: "4",
      title: "All The Love",
      artist: "Ayra Starr",
      release_date: "2025-01-01",
      thumbnail_url: "/lovable-uploads/25e72b95-ae53-495d-a12e-e02834ed6dd2.png",
      audio_url: ""
    },
    {
      id: "5",
      title: "Update",
      artist: "Burna Boy",
      release_date: "2025-01-01",
      thumbnail_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&auto=format&q=80",
      audio_url: ""
    },
    {
      id: "6",
      title: "WHY LOVE",
      artist: "Asake",
      release_date: "2025-01-01",
      thumbnail_url: "/lovable-uploads/115a498d-1a40-4ee4-898e-21b781bfa854.png",
      audio_url: ""
    }
  ];

  useEffect(() => {
    fetchMixtapes();
  }, []);

  const fetchMixtapes = async () => {
    try {
      const { data, error } = await supabase
        .from('mixtapes')
        .select('*')
        .order('release_date', { ascending: false })
        .limit(6);

      if (error) throw error;
      
      // If we have database releases, use them, otherwise use fallback
      if (data && data.length > 0) {
        setReleases(data);
      } else {
        setReleases(fallbackReleases);
      }
    } catch (error) {
      console.error('Error fetching mixtapes:', error);
      // Use fallback data on error
      setReleases(fallbackReleases);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSelect = (trackId: string) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId);
  };

  const handleDownload = (audioUrl: string, title: string) => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `${title}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const displayReleases = releases.length > 0 ? releases : fallbackReleases;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 font-['Inter']">
            DJ BIDEX Hits and Demos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-['Inter']">
            Listen to the hottest tracks and exclusive demos from DJ Bidex Entertainment
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg animate-pulse">
                <div className="bg-gray-300 h-64 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayReleases.map((release, index) => (
              <div 
                key={release.id} 
                className="group cursor-pointer hover:scale-105 transition-all duration-500 animate-fade-in bg-white rounded-xl shadow-lg hover:shadow-2xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-t-xl mb-4 shadow-xl hover:shadow-2xl transition-all duration-500 bg-black">
                  <img 
                    src={release.thumbnail_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format&q=80"} 
                    alt={release.title}
                    className="w-full h-64 object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleTrackSelect(release.id)}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg"
                        >
                          <Play size={20} />
                        </button>
                        <button className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 hover:scale-110">
                          <Heart size={20} />
                        </button>
                        <button 
                          onClick={() => handleDownload(release.audio_url, release.title)}
                          className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
                        >
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
                    {release.artist} • {new Date(release.release_date).getFullYear()}
                  </p>
                </div>

                {/* Audio Player */}
                {playingTrack === release.id && release.audio_url && (
                  <div className="p-4 border-t">
                    <AudioPlayer
                      audioUrl={release.audio_url}
                      title={release.title}
                      artist={release.artist}
                      thumbnail={release.thumbnail_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format&q=80"}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

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
