const url = 'https://us.phantomlink.cc:8000/api/admin/token';
const body = new URLSearchParams({
  grant_type: 'password',
  username: 'admin',
  password: 'OypimOY2WJaTAdIfl9'
});

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  },
  body: body.toString()
}).then(res => res.json()).then(data => {
  const token = data.access_token;
  
  const createUrl = 'https://us.phantomlink.cc:8000/api/user';
  return fetch(createUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username: 'testuser_' + Date.now(),
      proxies: {
        "vless": {}
      },
      inbounds: {
        "vless": ["VLESS TCP REALITY"]
      }
    })
  });
}).then(res => res.text()).then(console.log).catch(console.error);
