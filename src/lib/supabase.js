import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hpmuqtttuvrneehhaevi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbXVxdHR0dXZybmVlaGhhZXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDcyNTIsImV4cCI6MjA2MDM4MzI1Mn0.TK-Ncy9u3aOC9-sJ_yirhu9n5I6UuJ_py6OBs-yXb8Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
