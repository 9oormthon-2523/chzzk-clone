
interface ChannelProfileProps {
  nickname: string;
  follower: number;
  context: string;
}

const ChannelProfile: React.FC<ChannelProfileProps> = ({ nickname, follower, context }) => {
  return (
    <div className="flex items-start justify-between max-w-7xl p-4 rounded-lg m-2 mt-32">
      <div className="flex items-center"> 
        <div className="w-24 h-24 rounded-full bg-white shadow-md mr-4"/> 
        <div className="flex-grow flex flex-col justify-center"> 
          <p className="text-2xl font-black">{nickname}</p>
          <p className="text-lg font-semibold text-gray-500">팔로워 {follower}만 명</p>
          <p className="text-lg font-medium text-gray-400">{context}</p>
        </div>
      </div>
      <button className="w-20 h-8 bg-[#1bb373] rounded-full flex items-center justify-center text-white font-black">
        팔로우
      </button>
    </div>
  );
}

export default ChannelProfile;
