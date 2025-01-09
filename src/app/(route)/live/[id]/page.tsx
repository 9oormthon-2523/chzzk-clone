import Header from "@/app/_components/Header/Header.server";
import StreamingPage from "./widget/_StreamingPage.client";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <Header />
      <StreamingPage params={id} />
    </>
  );
}
