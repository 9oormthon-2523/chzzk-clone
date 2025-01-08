'use client';

import useStudioManager from '@/app/_hooks/studio/useStudioManager.client';
import { useUID } from '@/app/_store/context/useUid';
import React, { useState } from 'react';

const StreamingCoreBtn = () => {
  const uid = useUID();
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const { streamOn, streamOff, addTrackShare, stopTrackShare, volumeControl } =
    useStudioManager(uid);
  const { audioState, controlAudio, audioVolume } = volumeControl;

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

  //스크린 정지
  const screenSTOP = async () => {
    setLoading(true);
    await stopTrackShare();
    setLoading(false);
  };

  const micOn = async () => {
    setLoading(true);
    await addTrackShare('mic');
    setLoading(false);
  };

  //공유 선택
  const screenChange = async () => {
    setLoading(true);
    // await stopTrackShare();
    await addTrackShare();
    setLoading(false);
  };

  return (
    <>
      <button
        className="rounded-2xl bg-white text-[#697183] text-[15px] font-blackHanSans py-[5px] px-[15px]"
        onClick={handleStreamToggle}
      >
        {loading
          ? '처리 중...'
          : isStreaming
          ? '스트리밍 종료'
          : '스트리밍 시작하기'}
      </button>

      {!loading && isStreaming && (
        <button
          className="rounded-2xl bg-white text-[#697183] text-[15px] font-blackHanSans py-[5px] px-[15px]"
          onClick={screenSTOP}
        >
          화면 공유 정지
        </button>
      )}

      {!loading && isStreaming && (
        <button
          className="rounded-2xl bg-white text-[#697183] text-[15px] font-blackHanSans py-[5px] px-[15px]"
          onClick={micOn}
        >
          마이크만키기
        </button>
      )}

      {!loading && isStreaming && (
        <button
          className="rounded-2xl bg-white text-[#697183] text-[15px] font-blackHanSans py-[5px] px-[15px]"
          onClick={screenChange}
        >
          화면 공유 변경
        </button>
      )}

      {audioState('mic').isActive && (
        <input
          type="range"
          step={1}
          min={0}
          max={1000}
          value={audioVolume.mic}
          onChange={(e) => controlAudio('mic', Number(e.currentTarget.value))}
        />
      )}

      {audioState('screen').isActive && (
        <input
          type="range"
          step={1}
          min={0}
          max={1000}
          value={audioVolume.screen}
          onChange={(e) =>
            controlAudio('screen', Number(e.currentTarget.value))
          }
        />
      )}
    </>
  );
};

export default StreamingCoreBtn;
