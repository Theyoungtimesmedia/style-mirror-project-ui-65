
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Upload, Music, Image, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: 'DJ Bidex',
    description: '',
    genre: '',
    releaseDate: new Date().toISOString().split('T')[0]
  });
  
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an audio file",
          variant: "destructive"
        });
      }
    }
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setThumbnailFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
      }
    }
  };

  const uploadFile = async (file: File, bucket: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error(`Error uploading to ${bucket}:`, error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!audioFile) {
      toast({
        title: "Audio file required",
        description: "Please select an audio file to upload",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your mixtape",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload audio file
      setUploadProgress(25);
      const audioUrl = await uploadFile(audioFile, 'mixtapes');
      if (!audioUrl) throw new Error('Failed to upload audio file');

      // Upload thumbnail if provided
      setUploadProgress(50);
      let thumbnailUrl = null;
      if (thumbnailFile) {
        thumbnailUrl = await uploadFile(thumbnailFile, 'thumbnails');
      }

      // Save to database
      setUploadProgress(75);
      const { error } = await supabase
        .from('mixtapes')
        .insert([
          {
            title: formData.title,
            artist: formData.artist,
            description: formData.description,
            genre: formData.genre,
            release_date: formData.releaseDate,
            audio_url: audioUrl,
            thumbnail_url: thumbnailUrl
          }
        ]);

      if (error) throw error;

      setUploadProgress(100);
      
      toast({
        title: "Mixtape uploaded successfully!",
        description: "Your mixtape is now live on the website",
      });

      // Reset form
      setFormData({
        title: '',
        artist: 'DJ Bidex',
        description: '',
        genre: '',
        releaseDate: new Date().toISOString().split('T')[0]
      });
      setAudioFile(null);
      setThumbnailFile(null);
      
      // Reset file inputs
      const audioInput = document.getElementById('audioFile') as HTMLInputElement;
      const thumbnailInput = document.getElementById('thumbnailFile') as HTMLInputElement;
      if (audioInput) audioInput.value = '';
      if (thumbnailInput) thumbnailInput.value = '';

    } catch (error) {
      console.error('Error uploading mixtape:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your mixtape. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Upload className="text-red-400" size={32} />
            <span>Upload New Mixtape</span>
          </h1>
          <p className="text-gray-400 mt-2">Add a new mixtape to your collection</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-lg">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter mixtape title"
            />
          </div>

          {/* Artist */}
          <div>
            <label htmlFor="artist" className="block text-sm font-medium text-gray-300 mb-2">
              Artist
            </label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={formData.artist}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Artist name"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Describe your mixtape..."
            />
          </div>

          {/* Genre and Release Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-300 mb-2">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select Genre</option>
                <option value="Afrobeats">Afrobeats</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="R&B">R&B</option>
                <option value="Dancehall">Dancehall</option>
                <option value="Gospel">Gospel</option>
                <option value="Pop">Pop</option>
                <option value="Mix">Mix</option>
              </select>
            </div>

            <div>
              <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-300 mb-2">
                Release Date
              </label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Audio File Upload */}
          <div>
            <label htmlFor="audioFile" className="block text-sm font-medium text-gray-300 mb-2">
              Audio File *
            </label>
            <div className="relative">
              <input
                type="file"
                id="audioFile"
                accept="audio/*"
                onChange={handleAudioFileChange}
                className="hidden"
              />
              <label
                htmlFor="audioFile"
                className="w-full flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-red-500 transition-colors duration-300"
              >
                <div className="text-center">
                  <Music className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-400">
                    {audioFile ? audioFile.name : 'Click to upload audio file'}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">MP3, WAV, M4A supported</p>
                </div>
              </label>
              {audioFile && (
                <button
                  type="button"
                  onClick={() => setAudioFile(null)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label htmlFor="thumbnailFile" className="block text-sm font-medium text-gray-300 mb-2">
              Thumbnail Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="thumbnailFile"
                accept="image/*"
                onChange={handleThumbnailFileChange}
                className="hidden"
              />
              <label
                htmlFor="thumbnailFile"
                className="w-full flex items-center justify-center px-4 py-8 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-red-500 transition-colors duration-300"
              >
                <div className="text-center">
                  <Image className="mx-auto text-gray-400 mb-2" size={48} />
                  <p className="text-gray-400">
                    {thumbnailFile ? thumbnailFile.name : 'Click to upload thumbnail (optional)'}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">JPG, PNG, WebP supported</p>
                </div>
              </label>
              {thumbnailFile && (
                <button
                  type="button"
                  onClick={() => setThumbnailFile(null)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Uploading... {uploadProgress}%</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Upload Mixtape</span>
              </>
            )}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminUpload;
