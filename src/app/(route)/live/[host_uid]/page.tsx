import { getLiveInitDto } from "./utils/db/getLiveInitDto.server";
import StreamingPage from "./widget/_StreamingPage.client";
import { redirect } from "next/navigation";
import { createClient } from '@/app/_utils/supabase/server';

export default async function Page({ params }: { params: Promise<{ host_uid: string }> }) { 
  const { host_uid } = await params;
  const supabase = await createClient();  
  const dtos = await getLiveInitDto(host_uid);
  
  if (!dtos) redirect("/");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const client_uid = user ? user.id:undefined;

  return (
    <>
      <StreamingPage {...dtos} client_uid={client_uid}/>
    </>
  );
}
