import React from 'react';
import StreamCard from './StreamCard/StreamCard.server';

interface StreamCardData {
  uid: string;
  title: string;
  start_time: string;
  is_active: boolean;
  audience_cnt: number;
  nickname: string;
  thumbnail: string;
  profile_img: string;
  tags: string[];
}

const StreamList: React.FC<{ streamData: StreamCardData[] }> = ({ streamData }) => {
  return (
    <div className="px-4">
      {streamData.length > 0 ? (
        <div className="grid grid-cols-[repeat(4,minmax(330px,1fr))] justify-items-center">
          {streamData.map((data: StreamCardData) => (
            <StreamCard key={data.uid} {...data} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">현재 진행 중인 방송이 없습니다.</p>
      )}
    </div>
  );
};

export default StreamList;
