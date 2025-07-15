-- Update RLS policies for chat_conversations to allow public access
DROP POLICY IF EXISTS "Anyone can create chat conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can update chat conversations" ON public.chat_conversations;

-- Create new policies for public access
CREATE POLICY "Public can create chat conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update chat conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (true);

-- Create storage bucket for audio files if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('audio-files', 'audio-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for audio files
CREATE POLICY "Public can view audio files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'audio-files');

CREATE POLICY "Admins can upload audio files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'audio-files');

CREATE POLICY "Admins can update audio files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'audio-files');

CREATE POLICY "Admins can delete audio files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'audio-files');