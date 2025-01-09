'use client';

import React, { useEffect, useState } from 'react';
import PlusIcon from '@public/studioPage/Plus.svg';
import Image from 'next/image';
import useStreamingSettings from '@/app/_store/stores/studio/useStreamingSettings';

const CellPreviewSelector = ({ thumbnail }: { thumbnail: string | null }) => {
  const { data, setThumbnail } = useStreamingSettings();
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (thumbnail) {
      setPreviewUrl(thumbnail);
      setThumbnail(thumbnail);
    }
  }, [thumbnail]);

  console.log(data);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  return (
    <div className="">
      <label className="inline-flex items-center bg-gray-100 font-bold rounded-[5px] cursor-pointer hover:bg-gray-200 border border-dashed border-[#ddd]">
        <div className="flex flex-col w-[247px] h-[140px] items-center justify-center relative">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="미리 보기"
              fill
              unoptimized
              className="object-cover rounded-[5px]"
            />
          ) : (
            <>
              <PlusIcon />
              <span className="text-[14px] mt-1">업로드</span>
              <span className="text-[11px] text-[#9DA5B6]">{`(1280x720)`}</span>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {previewUrl && (
        <div className="mt-[5px]">
          <button
            className="text-[#697183] bg-white border border-[#ddd] text-[14px] font-extrabold h-[32px] px-[15px] rounded-[5px] hover:bg-gray-200"
            onClick={() => {
              setPreviewUrl('');
              setThumbnail(null);
            }}
          >
            삭제
          </button>
        </div>
      )}

      <ul className="text-[#697183] text-[13px] list-disc	ml-[20px] mt-[10px]">
        <li>등록하지 않으면 기본 이미지로 썸네일이 노출됩니다.</li>
      </ul>
    </div>
  );
};

export default CellPreviewSelector;
