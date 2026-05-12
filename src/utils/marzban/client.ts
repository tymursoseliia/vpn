export async function getMarzbanToken() {
  const url = `${process.env.MARZBAN_API_URL}/api/admin/token`;
  const body = new URLSearchParams({
    grant_type: 'password',
    username: process.env.MARZBAN_USERNAME!,
    password: process.env.MARZBAN_PASSWORD!
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: body.toString(),
      // Disable cache so it always fetches a fresh token
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Marzban token error:', await response.text());
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Marzban connection error:', error);
    return null;
  }
}

export async function createVpnUser(email: string) {
  const token = await getMarzbanToken();
  if (!token) return null;

  // Безопасное имя пользователя (только буквы и цифры)
  const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') + '_' + Math.floor(Math.random() * 1000);

  const url = `${process.env.MARZBAN_API_URL}/api/user`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        proxies: {
          "vless": {}
        },
        inbounds: {
          "vless": ["VLESS TCP REALITY"]
        }
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      console.error('Marzban create user error:', await response.text());
      return null;
    }

    const userData = await response.json();
    
    const subUrl = userData.subscription_url 
      ? `${process.env.MARZBAN_API_URL}${userData.subscription_url}`
      : null;

    return {
      username: userData.username,
      link: subUrl
    };
  } catch (error) {
    console.error('Marzban create user error:', error);
    return null;
  }
}
