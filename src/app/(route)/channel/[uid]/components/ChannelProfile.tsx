import { useState, useEffect } from 'react';
import { createClient } from '@/app/_utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

interface ChannelProfileProps {
  nickname: string;
  follower: number;
  context: string;
  img_url: string | null;
}

const ChannelProfile = ({ nickname, follower, context, img_url }: ChannelProfileProps) => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const supabase = createClient();
  const params = useParams();
  const router = useRouter();
  const defaultImage = "/channelPage/blank_profile.svg";

  const fetchLoggedInUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('로그인된 사용자 정보 가져오기 오류', error);
    } else {
      setLoggedInUserId(user?.id || null); 
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const pageId = params.uid; 

  const isLoggedInUser = loggedInUserId === pageId; 

  const handleChannelManagementClick = () => {
    router.push(`/channel/${pageId}/settings`);
  };

  return (
    <div className="flex items-start justify-between max-w-7xl p-4 rounded-lg">
      <div className="flex items-center">
        <div className="w-24 h-24 rounded-full flex-shrink-0 shadow-md mr-4 relative">
          <Image 
            src={img_url || defaultImage} 
            alt={`${nickname} profile`} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-full" 
          />
        </div>
        <div className="flex-grow flex flex-col justify-center">
          <p className="text-2xl font-black">{nickname}</p>
          <p className="text-lg font-semibold text-gray-500">팔로워 {follower}만 명</p>
          <p className="text-lg font-medium text-gray-400">{context}</p>
        </div>
      </div>

      {isLoggedInUser ? (
        <button 
          onClick={handleChannelManagementClick}
          className="w-20 h-8 bg-[#1bb373] rounded-full flex items-center justify-center text-white font-black"
        >
          채널 관리
        </button>
      ) : (
        <button className="w-20 h-8 bg-[#1bb373] rounded-full flex items-center justify-center text-white font-black">
          팔로우
        </button>
      )}
    </div>
  );
}

export default ChannelProfile;
