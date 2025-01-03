import { createClient } from '@/app/_utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data } = await supabase
    .from('follows')
    .select('*')
    .eq('following_id', user.id);

  return NextResponse.json({ data }, { status: 200 });
}
