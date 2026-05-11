import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  // Очищаем сессию пользователя
  await supabase.auth.signOut()

  // Возвращаем пользователя на главную
  return NextResponse.redirect(new URL('/', request.url))
}
