import Header from "@/app/_components/Header/Header.server";
import StreamingPage from "./widget/_StreamingPage.client";

export default async function Page({ params }: { params: Promise<{ host_uid: string }> }) {
  const { host_uid } = await params;
  console.log(host_uid)
  return (
    <>
      <Header />
      <StreamingPage params={host_uid} />
    </>
  );
}
