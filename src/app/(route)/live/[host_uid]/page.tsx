import { getLiveInitDto } from "./utils/db/getLiveInitDto.server";
import StreamingPage from "./widget/_StreamingPage.client";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ host_uid: string }> }) { 
  const { host_uid } = await params;
  
  const dtos = await getLiveInitDto(host_uid);
  
  if (!dtos) redirect("/");
  
  return (
    <>
      <StreamingPage {...dtos} />
    </>
  );
}
