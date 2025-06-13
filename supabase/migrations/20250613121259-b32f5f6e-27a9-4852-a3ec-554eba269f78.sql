
-- Create a table to store chat conversations
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT,
  customer_email TEXT,
  event_type TEXT,
  event_date TEXT,
  event_location TEXT,
  chat_messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - only admins can view chat conversations
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Create policy that allows admins to view all conversations
CREATE POLICY "Admins can view all chat conversations" 
  ON public.chat_conversations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

-- Create policy that allows anyone to insert conversations (for the chatbot)
CREATE POLICY "Anyone can create chat conversations" 
  ON public.chat_conversations 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy that allows anyone to update conversations (for the chatbot)
CREATE POLICY "Anyone can update chat conversations" 
  ON public.chat_conversations 
  FOR UPDATE 
  USING (true);
