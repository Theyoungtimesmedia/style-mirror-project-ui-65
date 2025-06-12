
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Music, Trash2, Edit, Play, Pause } from 'lucide-react';
import { format } from 'date-fns';

interface Mixtape {
  id: string;
  title: string;
  artist: string;
  description: string;
  audio_url: string;
  thumbnail_url: string;
  genre: string;
  release_date: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [mixtapes, setMixtapes] = useState<Mixtape[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  useEffect(() => {
    fetchMixtapes();
  }, []);

  const fetchMixtapes = async () => {
    try {
      const { data, error } = await supabase
        .from('mixtapes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMixtapes(data || []);
    } catch (error) {
      console.error('Error fetching mixtapes:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMixtape = async (id: string, audioUrl: string, thumbnailUrl: string) => {
    if (!confirm('Are you sure you want to delete this mixtape?')) return;

    try {
      // Delete files from storage
      if (audioUrl) {
        const audioPath = audioUrl.split('/').pop();
        if (audioPath) {
          await supabase.storage.from('mixtapes').remove([audioPath]);
        }
      }
      
      if (thumbnailUrl) {
        const thumbnailPath = thumbnailUrl.split('/').pop();
        if (thumbnailPath) {
          await supabase.storage.from('thumbnails').remove([thumbnailPath]);
        }
      }

      // Delete record from database
      await supabase.from('mixtapes').delete().eq('id', id);
      
      // Refresh the list
      fetchMixtapes();
    } catch (error) {
      console.error('Error deleting mixtape:', error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Music className="text-red-400" size={32} />
            <span>Mixtapes Management</span>
          </h1>
          <a
            href="/admin/upload"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Upload New Mixtape
          </a>
        </div>

        {mixtapes.length === 0 ? (
          <div className="text-center py-12">
            <Music className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Mixtapes Yet</h3>
            <p className="text-gray-500 mb-6">Upload your first mixtape to get started</p>
            <a
              href="/admin/upload"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 inline-block"
            >
              Upload Mixtape
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mixtapes.map((mixtape) => (
              <div key={mixtape.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="relative">
                  <img
                    src={mixtape.thumbnail_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format&q=80"}
                    alt={mixtape.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => setCurrentlyPlaying(currentlyPlaying === mixtape.id ? null : mixtape.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-300"
                    >
                      {currentlyPlaying === mixtape.id ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{mixtape.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{mixtape.artist}</p>
                  {mixtape.description && (
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{mixtape.description}</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{mixtape.genre}</span>
                    <span>{format(new Date(mixtape.release_date), 'MMM dd, yyyy')}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors duration-300 flex items-center justify-center space-x-1">
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteMixtape(mixtape.id, mixtape.audio_url, mixtape.thumbnail_url)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-medium transition-colors duration-300 flex items-center justify-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {currentlyPlaying === mixtape.id && mixtape.audio_url && (
                  <div className="p-4 border-t border-gray-700">
                    <audio
                      controls
                      className="w-full"
                      src={mixtape.audio_url}
                      onEnded={() => setCurrentlyPlaying(null)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
