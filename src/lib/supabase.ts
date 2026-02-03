import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xtzodrwoktumqjjkmntm.supabase.co'
const supabaseAnonKey = 'sb_publishable_140GG4HVO5ht8z791mK5Ng_i24EXk80'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
