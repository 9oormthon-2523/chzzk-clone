'use client';
import useStudioManager from '@/app/_hooks/studio/useStudioManager';
import { useState } from 'react';

interface StreamingCoreBtnProps {
  uid:string
}

const StreamingCoreBtn = (props: StreamingCoreBtnProps) => {
  const { uid } = props;
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const { streamOn, streamOff, addTrackShare, stopTrackShare} = useStudioManager(uid);

  const handleStreamToggle = async () => {
      setLoading(true);

      if (isStreaming) {
          // 스트리밍 종료
          const success = await streamOff();
          if (success) setIsStreaming(false);
      } else {
          // 스트리밍 시작
          const success = await streamOn();
          if (success) setIsStreaming(true);
      }

      setLoading(false);
  };

  //스크린 정지 후 마이크 연결
  const screenSTOP = async() => {
    setLoading(true);
    await stopTrackShare();
    await addTrackShare("mic");
    setLoading(false);
  }

  //공유 선택
  const screenChange = async() => {
    setLoading(true);
    await addTrackShare();
    setLoading(false);
  }

  return (
    <>
    <button
      className="rounded-2xl bg-white text-[#697183] text-[15px] font-blackHanSans py-[5px] px-[15px]"
      onClick={handleStreamToggle}
    >
      {loading ? "처리 중..." : isStreaming ? "스트리밍 종료" : "스트리밍 시작하기"}
    </button>

    { (!loading && isStreaming) && <button
      className="rounded-2xl bg-white text-[#697183] text-[15px] font-blackHanSans py-[5px] px-[15px]"
      onClick={screenSTOP}
    >
      화면 공유 정지
    </button>}

    
    { (!loading && isStreaming) && <button
      className="rounded-2xl bg-white text-[#697183] text-[15px] font-blackHanSans py-[5px] px-[15px]"
      onClick={screenChange}
    >
      화면 공유 변경
    </button>}
    </>
  );
};

export default StreamingCoreBtn;
