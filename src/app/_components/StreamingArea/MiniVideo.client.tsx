'use client';

import useLive from '@/app/_hooks/live/useLive';
import { useUID } from '@/app/_store/context/useUid';
import { useState } from 'react';

interface Props {
  is_active: boolean;
}

const MiniVideo = ({ is_active }: Props) => {
  const [isHidden, setIsHidden] = useState(false);

  const uid = useUID();
  const { videoElRef } = useLive({
    host_uid: uid,
    streaming_is_active: is_active,
  });

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 w-[40%] aspect-video bg-slat flex justify-center items-center bg-green-100 
        transition-all duration-500 ease-in-out 
        ${isHidden ? 'translate-x-[150%] translate-y-[150%] scale-0 opacity-0' : 'translate-x-0 translate-y-0 scale-100 opacity-100'}`}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={() => setIsHidden(true)}
          className="absolute -top-3 -left-3 px-2.5 py-1 bg-blue-500 rounded-full text-white text-sm font-extrabold hadow-md "
        >
          X
        </button>
        <video muted ref={videoElRef} className="w-[90%] h-[90%] bg-black"></video>
      </div>

      {/* 다시 보기 버튼 */}
      {isHidden && (
        <button
          onClick={() => setIsHidden(false)}
          className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md font-extrabold"
        >
          비디오 다시 보기
        </button>
      )}
    </>
  );
};

export default MiniVideo;
