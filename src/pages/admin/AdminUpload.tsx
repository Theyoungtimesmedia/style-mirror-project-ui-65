import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Music, Image, FileText, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AdminUpload = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("DJ Bidex");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's an audio file
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        toast.success(`Audio file selected: ${file.name}`);
      } else {
        toast.error("Please select a valid audio file");
      }
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's an image file
      if (file.type.startsWith('image/')) {
        setThumbnailFile(file);
        toast.success(`Thumbnail selected: ${file.name}`);
      } else {
        toast.error("Please select a valid image file");
      }
    }
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error(`Error uploading to ${bucket}:`, error);
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!audioFile) {
      toast.error("Please select an audio file");
      return;
    }

    if (!thumbnailFile) {
      toast.error("Please select a thumbnail image");
      return;
    }

    setUploading(true);

    try {
      // Generate unique filenames
      const timestamp = Date.now();
      const audioFileName = `${timestamp}-${audioFile.name}`;
      const thumbnailFileName = `${timestamp}-${thumbnailFile.name}`;

      // Upload files
      toast.info("Uploading audio file...");
      const audioUrl = await uploadFile(audioFile, 'audio-files', audioFileName);
      
      toast.info("Uploading thumbnail...");
      const thumbnailUrl = await uploadFile(thumbnailFile, 'thumbnails', thumbnailFileName);

      // Save to database
      toast.info("Saving mixtape information...");
      const { error: dbError } = await supabase
        .from('mixtapes')
        .insert({
          title: title.trim(),
          artist: artist.trim(),
          description: description.trim() || null,
          genre: genre.trim() || null,
          release_date: releaseDate,
          audio_url: audioUrl,
          thumbnail_url: thumbnailUrl
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      toast.success("Mixtape uploaded successfully!");
      
      // Reset form
      setTitle("");
      setArtist("DJ Bidex");
      setDescription("");
      setGenre("");
      setReleaseDate(new Date().toISOString().split('T')[0]);
      setAudioFile(null);
      setThumbnailFile(null);
      
      // Reset file inputs
      const audioInput = document.getElementById('audio-upload') as HTMLInputElement;
      const thumbnailInput = document.getElementById('thumbnail-upload') as HTMLInputElement;
      if (audioInput) audioInput.value = '';
      if (thumbnailInput) thumbnailInput.value = '';

    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Failed to upload mixtape. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Upload New Mixtape</h1>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Music className="h-6 w-6" />
            Upload New Mixtape
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Mixtape Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter mixtape title"
                required
              />
            </div>

            {/* Artist */}
            <div className="space-y-2">
              <Label htmlFor="artist">Artist</Label>
              <Input
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Artist name"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your mixtape"
                rows={3}
              />
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="e.g., Afrobeats, Hip Hop, House"
              />
            </div>

            {/* Release Date */}
            <div className="space-y-2">
              <Label htmlFor="release-date">Release Date</Label>
              <Input
                id="release-date"
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>

            {/* Audio Upload */}
            <div className="space-y-2">
              <Label htmlFor="audio-upload" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Audio File *
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Input
                  id="audio-upload"
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
                <Label htmlFor="audio-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {audioFile ? audioFile.name : "Click to select audio file"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports: MP3, WAV, AAC, OGG, FLAC
                  </p>
                </Label>
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <Label htmlFor="thumbnail-upload" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Thumbnail Image *
              </Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
                <Label htmlFor="thumbnail-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {thumbnailFile ? thumbnailFile.name : "Click to select thumbnail image"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supports: JPG, PNG, WebP, GIF
                  </p>
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Mixtape
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUpload;