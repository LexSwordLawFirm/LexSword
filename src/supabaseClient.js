import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uvtodzovoreqcqgxxdgr.supabase.co' // এখানে URL দিন
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dG9kem92b3JlcWNxZ3h4ZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MzM0MzYsImV4cCI6MjA4NDIwOTQzNn0.xLkfoO6iMGS-00wgoVaxlkbG1fmmytZ_OXd7Ja3ifqM' // এখানে Key দিন

export const supabase = createClient(supabaseUrl, supabaseKey)
