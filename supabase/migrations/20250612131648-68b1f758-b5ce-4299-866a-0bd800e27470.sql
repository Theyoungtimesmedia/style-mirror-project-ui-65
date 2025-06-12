
-- Create mixtapes table to store mixtape information
CREATE TABLE public.mixtapes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL DEFAULT 'DJ Bidex',
  description TEXT,
  audio_url TEXT,
  thumbnail_url TEXT,
  genre TEXT,
  release_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admins table for secure admin authentication
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.mixtapes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for mixtape files
INSERT INTO storage.buckets (id, name, public) VALUES ('mixtapes', 'mixtapes', true);

-- Create storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public) VALUES ('thumbnails', 'thumbnails', true);

-- RLS policies for mixtapes (public read, admin write)
CREATE POLICY "Anyone can view mixtapes" 
  ON public.mixtapes 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert mixtapes" 
  ON public.mixtapes 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Only admins can update mixtapes" 
  ON public.mixtapes 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Only admins can delete mixtapes" 
  ON public.mixtapes 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

-- RLS policies for admins table
CREATE POLICY "Admins can view admin records" 
  ON public.admins 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Storage policies for mixtapes bucket
CREATE POLICY "Anyone can view mixtapes storage" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'mixtapes');

CREATE POLICY "Only admins can upload mixtapes" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'mixtapes' AND 
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Only admins can delete mixtapes storage" 
  ON storage.objects 
  FOR DELETE 
  USING (
    bucket_id = 'mixtapes' AND 
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

-- Storage policies for thumbnails bucket
CREATE POLICY "Anyone can view thumbnails storage" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'thumbnails');

CREATE POLICY "Only admins can upload thumbnails" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'thumbnails' AND 
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Only admins can delete thumbnails storage" 
  ON storage.objects 
  FOR DELETE 
  USING (
    bucket_id = 'thumbnails' AND 
    EXISTS (
      SELECT 1 FROM public.admins 
      WHERE user_id = auth.uid()
    )
  );
