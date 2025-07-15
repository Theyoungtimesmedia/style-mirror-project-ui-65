import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MessageCircle, Calendar, MapPin, User, Mail, Clock } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

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

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    if (isAdmin) {
      fetchConversations();
    }
  }, [isAdmin]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage chat conversations and bookings</p>
        </div>

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
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                        <p className="mt-2 text-sm text-gray-600">Loading conversations...</p>
                      </div>
                    ) : conversations.length === 0 ? (
                      <div className="text-center py-8">
                        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">No conversations yet</p>
                      </div>
                    ) : (
                      conversations.map((conversation) => (
                        <Card 
                          key={conversation.id}
                          className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedConversation?.id === conversation.id ? 'ring-2 ring-red-500' : ''
                          }`}
                          onClick={() => setSelectedConversation(conversation)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-900">
                                  {conversation.customer_name || 'Anonymous Customer'}
                                </h3>
                                {conversation.event_type && (
                                  <Badge variant="outline" className="mt-1">
                                    {conversation.event_type}
                                  </Badge>
                                )}
                                <p className="text-xs text-gray-500 mt-2">
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
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        {selectedConversation.customer_email}
                      </div>
                    )}
                    {selectedConversation.event_type && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline">{selectedConversation.event_type}</Badge>
                      </div>
                    )}
                    {selectedConversation.event_date && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {selectedConversation.event_date}
                      </div>
                    )}
                    {selectedConversation.event_location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
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
                                ? 'bg-red-600 text-white' 
                                : 'bg-gray-200 text-gray-800'
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
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a conversation from the list to view its details and chat history.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
