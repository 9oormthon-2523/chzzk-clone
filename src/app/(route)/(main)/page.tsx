'use client';
import Header from '../../_components/Header/Header.server';
import StreamList from '../../_components/StreamList/StreamList.server';
import NavBar from './_components/NavBar/NavBar.client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface StreamCardData {
  uid: string; // uuid
  title: string;
  start_time: string; // timestamp
  is_active: boolean;
  audience_cnt: number;
  nickname: string;
  thumbnail: string;
  profile_img: string;
  tags: string[];
}

export default function Home() {
  const [streamData, setStreamData] = useState<StreamCardData[]>([]);
  useEffect(() => {
    const fetchStreamData = async () => {
      try {
        // 1. streaming_rooms 테이블에서 데이터 가져오기
        const { data: streamData, error: streamError } = await supabase
          .from('streaming_rooms')
          .select('uid, title, start_time, is_active, audience_cnt, nickname, thumbnail,tags');

        if (streamError) {
          console.error('데이터를 가져오는 중 오류 발생:', streamError.message);
          return;
        }

        // 2. 각 uid에 대해 profile_img 가져오기
        const enrichedData = await Promise.all(
          streamData.map(async (stream) => {
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('profile_img')
              .eq('id', stream.uid)
              .single();

            if (userError) {
              console.error(`사용자 정보 불러오기 오류 (uid: ${stream.uid})`, userError);
              return { ...stream, profile_img: '' };
            }

            return { ...stream, profile_img: userData.profile_img || '' };
          }),
        );

        setStreamData(enrichedData || []);
      } catch (error) {
        console.error('오류 발생:', error);
      }
    };

    fetchStreamData();
  }, []);

  return (
    <div>
      <Header />
      <NavBar />
      <div className="text-[22px] py-[60px] pl-[60px] pr-[20px] max-w-[2060px]">
        <div className="px-4 pt-4 flex justify-between">
          <strong className="font-blackHanSans font-thin ">추천 Live</strong>
          <button className="font-blackHanSans text-lg text-gray-500 font-thin">전체 보기</button>
        </div>
        <div>
          <StreamList streamData={streamData} />
        </div>
      </div>
    </div>
  );
}
