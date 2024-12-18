
interface ChannelProfileProps {
  nickname: string; 
  follower: number;
  context: string;
}


const ChannelProfile: React.FC<ChannelProfileProps> = ({nickname, follower, context}) => {  
  return (
    <>
    <div className="flex items-start max-w-7xl p-4 rounded-lg m-2 mt-32">
        <div className="w-24 h-24 rounded-full bg-white shadow-md text-sm mr-4"/>
        <div className="flex flex-col mt-2">
          <p className="text-2xl font-black">{nickname}</p>
          <p className="text-lg font-semibold text-gray-500">팔로워 {follower}만 명</p>
          <p className="text-lg font-medium text-gray-400">{context}</p>
        </div>
    </div>
  </>
  )
}

export default ChannelProfile