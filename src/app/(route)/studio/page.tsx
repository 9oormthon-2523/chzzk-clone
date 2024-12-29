import React from 'react';
import Popup from './[uid]/_components/Popup/Popup.server';
import { createClient } from '@/app/_utils/supabase/server';
import { redirect } from 'next/navigation';

const page = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect(`/studio/${user.id}`);

  return <Popup />;
};

export default page;
