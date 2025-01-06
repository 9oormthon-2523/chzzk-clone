import Header from "@/app/_components/Header/Header.server";
import StreamingPage from "./widget/_StreamingPage.client";

export default async function Page({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;

  return (
    <>
      <Header />
      <StreamingPage params={uid} />
    </>
  );
}
