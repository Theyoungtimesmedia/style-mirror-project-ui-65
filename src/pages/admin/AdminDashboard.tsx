import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, MapPin, User, Mail, Clock, Music, Upload, Play, Pause, Trash2 } from 'lucide-react';
import { toast } from "sonner";

interface ChatConversation {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  event_type: string | null;
  event_date: string | null;
  event_location: string | null;
  chat_messages: any[];
  created_at: string;
  updated_at: string;
}

interface Mixtape {
  id: string;
  title: string;
  artist: string;
  description: string | null;
  genre: string | null;
  release_date: string | null;
  audio_url: string | null;
  thumbnail_url: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [mixtapes, setMixtapes] = useState<Mixtape[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMixtapes: 0,
    totalConversations: 0,
  });

  // Type for a conversation row coming from Supabase, chat_messages may be Json/string/array
  const normalizeConversation = (raw: any): ChatConversation => {
    let chat_messages: any[] = [];
    if (Array.isArray(raw.chat_messages)) {
      chat_messages = raw.chat_messages;
    } else if (typeof raw.chat_messages === "string") {
      try {
        chat_messages = JSON.parse(raw.chat_messages);
      } catch {
        chat_messages = [];
      }
    } else if (raw.chat_messages && typeof raw.chat_messages === "object") {
      chat_messages = raw.chat_messages as any[];
    }
    return {
      ...raw,
      chat_messages,
    };
  };

  useEffect(() => {
    fetchConversations();
    fetchMixtapes();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('Fetching stats...');
      
      const { count: mixtapeCount } = await supabase
        .from('mixtapes')
        .select('*', { count: 'exact', head: true });

      const { count: conversationCount } = await supabase
        .from('chat_conversations')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalMixtapes: mixtapeCount || 0,
        totalConversations: conversationCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      console.log('Fetching conversations...');
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      console.log('Conversations fetch result:', data, error);
      if (error) throw error;
      setConversations(((data as any[]) || []).map(normalizeConversation));
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMixtapes = async () => {
    try {
      console.log('Fetching mixtapes...');
      const { data, error } = await supabase
        .from('mixtapes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Mixtapes fetched:', data);
      setMixtapes(data || []);
    } catch (error) {
      console.error('Error fetching mixtapes:', error);
    }
  };

  const handlePlayPause = (mixtapeId: string, audioUrl: string) => {
    if (currentlyPlaying === mixtapeId) {
      // Pause current
      const audio = audioElements[mixtapeId];
      if (audio) {
        audio.pause();
      }
      setCurrentlyPlaying(null);
    } else {
      // Stop any currently playing audio
      if (currentlyPlaying && audioElements[currentlyPlaying]) {
        audioElements[currentlyPlaying].pause();
      }

      // Play new audio
      let audio = audioElements[mixtapeId];
      if (!audio) {
        audio = new Audio(audioUrl);
        audio.addEventListener('ended', () => setCurrentlyPlaying(null));
        setAudioElements(prev => ({ ...prev, [mixtapeId]: audio }));
      }
      
      audio.play();
      setCurrentlyPlaying(mixtapeId);
    }
  };

  const handleDeleteMixtape = async (mixtapeId: string, audioUrl: string | null, thumbnailUrl: string | null) => {
    if (!confirm('Are you sure you want to delete this mixtape?')) {
      return;
    }

    try {
      // Delete files from storage
      if (audioUrl) {
        const audioPath = audioUrl.split('/audio-files/')[1];
        if (audioPath) {
          await supabase.storage.from('audio-files').remove([audioPath]);
        }
      }

      if (thumbnailUrl) {
        const thumbnailPath = thumbnailUrl.split('/thumbnails/')[1];
        if (thumbnailPath) {
          await supabase.storage.from('thumbnails').remove([thumbnailPath]);
        }
      }

      // Delete from database
      const { error } = await supabase
        .from('mixtapes')
        .delete()
        .eq('id', mixtapeId);

      if (error) throw error;

      toast.success('Mixtape deleted successfully');
      fetchMixtapes();
      fetchStats();
    } catch (error) {
      console.error('Error deleting mixtape:', error);
      toast.error('Failed to delete mixtape');
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">DJ Bidex Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage mixtapes and chat conversations</p>
        </div>
        <Link to="/admin/upload">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Mixtape
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mixtapes</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMixtapes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Mixtapes Management */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Manage Mixtapes</CardTitle>
        </CardHeader>
        <CardContent>
          {mixtapes.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No mixtapes uploaded yet</p>
          ) : (
            <div className="space-y-4">
              {mixtapes.map((mixtape) => (
                <div key={mixtape.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {mixtape.thumbnail_url && (
                        <img 
                          src={mixtape.thumbnail_url} 
                          alt={mixtape.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{mixtape.title}</h3>
                        <p className="text-sm text-muted-foreground">{mixtape.artist}</p>
                        {mixtape.genre && (
                          <p className="text-xs text-muted-foreground">{mixtape.genre}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {mixtape.audio_url && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePlayPause(mixtape.id, mixtape.audio_url!)}
                        >
                          {currentlyPlaying === mixtape.id ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteMixtape(mixtape.id, mixtape.audio_url, mixtape.thumbnail_url)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {mixtape.description && (
                    <p className="text-sm text-muted-foreground mt-2">{mixtape.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Uploaded: {new Date(mixtape.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat Conversations ({conversations.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                <div className="space-y-2 p-4">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2 text-sm text-muted-foreground">Loading conversations...</p>
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">No conversations yet</p>
                    </div>
                  ) : (
                    conversations.map((conversation) => (
                      <Card 
                        key={conversation.id}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedConversation?.id === conversation.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium">
                                {conversation.customer_name || 'Anonymous Customer'}
                              </h3>
                              {conversation.event_type && (
                                <Badge variant="outline" className="mt-1">
                                  {conversation.event_type}
                                </Badge>
                              )}
                              <p className="text-xs text-muted-foreground mt-2">
                                {formatDate(conversation.updated_at)}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary">
                                {conversation.chat_messages?.length || 0} msgs
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Conversation Details */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {selectedConversation.customer_name || 'Anonymous Customer'}
                </CardTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {selectedConversation.customer_email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {selectedConversation.customer_email}
                    </div>
                  )}
                  {selectedConversation.event_type && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{selectedConversation.event_type}</Badge>
                    </div>
                  )}
                  {selectedConversation.event_date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {selectedConversation.event_date}
                    </div>
                  )}
                  {selectedConversation.event_location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {selectedConversation.event_location}
                    </div>
                  )}
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="p-4 space-y-4">
                    {selectedConversation.chat_messages?.map((message: any, index: number) => (
                      <div 
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-3/4 rounded-lg px-4 py-2 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-xs">
                              {message.role === 'user' 
                                ? selectedConversation.customer_name || 'Customer'
                                : 'Obadiah (Bot)'
                              }
                            </span>
                            <Clock className="h-3 w-3 opacity-60" />
                            <span className="text-xs opacity-60">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          {message.image && (
                            <div className="mb-2">
                              <img 
                                src={message.image} 
                                alt="Uploaded" 
                                className="max-h-40 rounded-md"
                              />
                            </div>
                          )}
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Select a Conversation
                </h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the list to view its details and chat history.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
