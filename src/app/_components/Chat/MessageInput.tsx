type MessageInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
};

export default function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  return (
    <div>
      <input type="text" value={value} onChange={onChange} placeholder="채팅을 입력해주세요1" />

      <button onClick={onSend}>전송</button>
    </div>
  );
}
