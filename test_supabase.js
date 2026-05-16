const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = "https://paazplnimwivriecqdob.supabase.co";
const supabaseKey = "sb_publishable_CVazmuPluenO-d5DhMKaYA_yb_Qcyre";
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const email = 'test_app_login@gmail.com';
  const password = 'Password123!';

  console.log('1. Signing up...');
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) {
    console.error('Sign Up Error:', signUpError);
  } else {
    console.log('Sign Up Success:', signUpData.user?.id);
  }

  console.log('2. Logging in...');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) {
    console.error('Sign In Error:', signInError);
  } else {
    console.log('Sign In Success:', signInData.user?.id);
  }
}
test();
