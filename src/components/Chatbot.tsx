
import { useState, useRef, useEffect } from 'react';
import { Send, X, Image, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: string;
}

interface CustomerInfo {
  name?: string;
  email?: string;
  eventType?: string;
  eventDate?: string;
  eventLocation?: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const whatsappNumber = "+2349026001136";

  // Initialize chat with greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Hello! I\'m Obadiah Samson, DJ Bidex\'s booking manager. Welcome to DJ Bidex Computers! To get started, may I have your name please?',
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Extract customer info from messages
  useEffect(() => {
    const extractCustomerInfo = () => {
      const messageText = messages.map(m => m.content).join(' ').toLowerCase();
      
      // Simple extraction logic - this could be enhanced
      if (!customerInfo.name && messageText.includes('my name is')) {
        const nameMatch = messageText.match(/my name is ([^.!?]+)/i);
        if (nameMatch) {
          setCustomerInfo(prev => ({ ...prev, name: nameMatch[1].trim() }));
        }
      }
      
      if (!customerInfo.email && messageText.includes('@')) {
        const emailMatch = messageText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        if (emailMatch) {
          setCustomerInfo(prev => ({ ...prev, email: emailMatch[1] }));
        }
      }
    };

    extractCustomerInfo();
  }, [messages, customerInfo]);

  const saveConversation = async () => {
    try {
      const conversationData = {
        customer_name: customerInfo.name || 'Anonymous Customer',
        customer_email: customerInfo.email,
        event_type: customerInfo.eventType,
        event_date: customerInfo.eventDate,
        event_location: customerInfo.eventLocation,
        chat_messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          timestamp: msg.timestamp.toISOString(),
          image: msg.image
        }))
      };

      if (conversationId) {
        // Update existing conversation
        await supabase
          .from('chat_conversations')
          .update(conversationData)
          .eq('id', conversationId);
      } else {
        // Create new conversation
        const { data, error } = await supabase
          .from('chat_conversations')
          .insert(conversationData)
          .select('id')
          .single();
        
        if (error) throw error;
        if (data) setConversationId(data.id);
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  const exportChatToEmail = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('send-chat-email', {
        body: {
          customerName: customerInfo.name || 'Anonymous Customer',
          customerEmail: customerInfo.email,
          eventType: customerInfo.eventType,
          eventDate: customerInfo.eventDate,
          eventLocation: customerInfo.eventLocation,
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp.toISOString()
          }))
        }
      });

      if (error) throw error;
      console.log('Chat exported to email successfully');
    } catch (error) {
      console.error('Error exporting chat to email:', error);
    }
  };

  const handleSendMessage = async () => {
    if ((!input.trim() && !image) || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
      image: image || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');
    setImage(null);
    setImagePreview(null);

    try {
      // Convert messages to format expected by the API
      const formattedMessages = messages
        .concat(userMessage)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: { 
          messages: formattedMessages,
          image: userMessage.image,
          conversationId: conversationId,
          customerInfo: customerInfo
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Save conversation after each exchange
      await saveConversation();

      // Handle redirect to WhatsApp and email export if needed
      if (data.redirectToWhatsApp && data.exportChat) {
        // Export chat to email first
        await exportChatToEmail();
        
        const whatsappMessage = `Hello! I've completed my booking conversation with Obadiah. My name is ${customerInfo.name || 'Customer'} and I've sent a payment screenshot for my event booking.`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Add final message before redirect
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: "Perfect! I've sent your chat details to our team via email and I'll now redirect you to our WhatsApp for immediate assistance with your payment confirmation.",
            timestamp: new Date()
          }
        ]);
        
        // Delay redirect to allow user to read message
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev, 
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 4MB)
    if (file.size > 4 * 1024 * 1024) {
      alert('Image size should be less than 4MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      setImagePreview(imageDataUrl);
      setImage(imageDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
        aria-label="Open chat"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {isOpen 
            ? <X /> 
            : <>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </>
          }
        </svg>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Chat with Obadiah</h3>
              <p className="text-xs opacity-90">DJ Bidex Booking Manager</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-3/4 rounded-lg px-4 py-2 break-words ${
                    message.role === 'user' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.image && (
                    <div className="mb-2">
                      <img 
                        src={message.image} 
                        alt="Uploaded" 
                        className="max-h-40 rounded-md"
                      />
                    </div>
                  )}
                  {message.content.split('\n').map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                  <span className="text-xs opacity-70 block mt-1">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 animate-pulse flex items-center space-x-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Obadiah is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div className="p-2 bg-gray-100 border-t border-gray-200">
              <div className="relative inline-block">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-16 rounded-md"
                />
                <button 
                  onClick={clearImage}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex items-end space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              ref={fileInputRef}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-500 hover:text-red-600 transition-colors"
              aria-label="Upload image"
            >
              <Image size={20} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-grow resize-none bg-gray-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500 h-10 max-h-32"
              rows={1}
              style={{ height: 'auto', minHeight: '40px' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading || (!input.trim() && !image)}
              className="bg-red-600 text-white rounded-full p-2 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
