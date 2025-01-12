import { createClient } from '@/app/_utils/supabase/server';
import { notFound } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!error) return NextResponse.json({ data }, { status: 200 });

  return notFound();
}
