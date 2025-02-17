import React, { useEffect, useState } from 'react';
import StreamCard from './StreamCard/StreamCard.server';
import { createClient } from '@supabase/supabase-js';

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
    <div className="grid grid-cols-[repeat(4,minmax(330px,1fr))]  px-4 justify-items-center">
      {streamData.map((data: StreamCardData) => (
        <StreamCard key={data.uid} {...data} />
      ))}
    </div>
  );
};

export default StreamList;
