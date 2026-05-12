import { createClient } from '@/utils/supabase/server'
import { createVpnUser } from '@/utils/marzban/client'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()

  // 1. Проверяем авторизацию
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Проверяем, есть ли уже сгенерированный ключ в профиле
  const existingKey = user.user_metadata?.vpn_link
  if (existingKey) {
    return NextResponse.json({ message: 'Key already exists' }, { status: 400 })
  }

  try {
    // 3. Обращаемся к API Marzban
    const email = user.email || 'unknown_user'
    const vpnData = await createVpnUser(email)

    if (!vpnData || !vpnData.link) {
      throw new Error('Failed to generate VPN key from Marzban')
    }

    // 4. Сохраняем ключ навсегда за этим пользователем в Supabase
    const { error: updateError } = await supabase.auth.updateUser({
      data: { 
        vpn_username: vpnData.username,
        vpn_link: vpnData.link 
      }
    })

    if (updateError) {
      throw updateError
    }

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('API Error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
