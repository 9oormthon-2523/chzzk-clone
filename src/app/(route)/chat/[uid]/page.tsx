import Chat from "../../../_components/Chat/Chat";

export default function ChatPage({ params }: { params: { uid: string } }) {
  console.log(params);
  return (
    <div>
      <h1>채팅 페이지</h1>
      <Chat roomId={params.uid} />
    </div>
  );
}
