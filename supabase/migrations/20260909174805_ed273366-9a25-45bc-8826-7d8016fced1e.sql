CREATE TABLE public.user_artworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  artist TEXT,
  note TEXT,
  location TEXT,
  image_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_artworks TO authenticated;
GRANT ALL ON public.user_artworks TO service_role;

ALTER TABLE public.user_artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own artworks" ON public.user_artworks
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER set_user_artworks_updated_at
  BEFORE UPDATE ON public.user_artworks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Users read own artwork files" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'user-artworks' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users upload own artwork files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'user-artworks' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users update own artwork files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'user-artworks' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users delete own artwork files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'user-artworks' AND (storage.foldername(name))[1] = auth.uid()::text);