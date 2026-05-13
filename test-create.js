const url = 'https://us.phantomlink.cc:8000';
const username = 'admin';
const password = 'OypimOY2WJaTAdIfl9';

async function test() {
  const tokenRes = await fetch(`${url}/api/admin/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'password', username, password })
  });
  const { access_token } = await tokenRes.json();
  
  const createRes = await fetch(`${url}/api/user`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: "free_12345678901234567890123456789012",
      proxies: { "vless": {} },
      inbounds: { "vless": ["VLESS TCP REALITY"] }
    })
  });
  console.log("Status:", createRes.status);
  console.log("Response:", await createRes.text());
}
test();
