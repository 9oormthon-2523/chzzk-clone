import { getLiveInitDto } from "@/app/_utils/live/db/getLiveInitDto.server";
import StreamingPage from "./widget/_StreamingPage.client";
import { redirect } from "next/navigation";
import { createClient } from '@/app/_utils/supabase/server';
import StreamingTestPage from "./widget/_StreamingPage.client.test";
import { getLiveInit } from "@/app/_utils/live/db/getLiveInit.server.test";

export default async function Page({ params }: { params: Promise<{ host_uid: string }> }) { 
  const { host_uid } = await params;
  const supabase = await createClient();  
  // const dtos = await getLiveInitDto(host_uid);
  
  // if (!dtos) redirect("/");
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const client_uid = user ? user.id:undefined;

  const dto = await getLiveInit(host_uid);

  if (!dto) redirect("/");

  const initDto =  {
    ...dto,
    streamRoom:{
      host_uid,
      client_uid : user ? user.id: null,
      ...dto.streamRoom,
    } ,
  };


  return (
    <>
      {/* <StreamingPage {...dtos} client_uid={client_uid}/> */}
      <StreamingTestPage {...initDto}/>
    </>
  );
};
