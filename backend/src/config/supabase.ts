import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY; // Service role key to bypass RLS for uploads

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ WARNING: Supabase URL or Secret Key is missing in backend env variables.');
}

export const supabase = createClient(
  supabaseUrl || 'https://mfgwydvonmrkjmvqykrq.supabase.co',
  supabaseKey || ''
);
