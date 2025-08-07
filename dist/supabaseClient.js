// File path: src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
// Get these from your Supabase project settings
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
