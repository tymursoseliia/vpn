const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Service key has admin access
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data: users, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error(error);
    return;
  }
  
  // Sort by created_at descending
  users.users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  
  console.log("Latest 5 users:");
  users.users.slice(0, 5).forEach(u => {
    console.log(`- Email: ${u.email}`);
    console.log(`  Confirmed At: ${u.email_confirmed_at || 'NOT CONFIRMED'}`);
    console.log(`  Created At: ${u.created_at}`);
  });
}

check();
