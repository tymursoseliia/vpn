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
}).then(res => res.text()).then(console.log).catch(console.error);
