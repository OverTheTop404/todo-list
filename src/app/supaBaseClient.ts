import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storage: localStorage,
  },
  global: {
    // Отключаем кэширование на уровне fetch
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
})
