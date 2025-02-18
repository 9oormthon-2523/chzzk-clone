'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Components
import Header from '@/app/_components/Header/Header.server';
import NavBar from '../../(main)/_components/NavBar/NavBar.client';
import StreamList from '@/app/_components/StreamList/StreamList.server';
// Types
import { StreamCardType } from '@/app/_types/streamcard/streamcard.type';
import { categories } from '../categoriesData';

export interface Category {
  id: number;
  name: string;
  slug: string;
  backgroundImage: string;
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const CategoryPage = () => {
  const { slug } = useParams();
  const [streamData, setStreamData] = useState<StreamCardType[]>([]);
  const [categoryData, setCategoryData] = useState<Category | null>(null);

  useEffect(() => {
    if (!slug) return;

    //slug 일치 데이터 찾기
    const foundCategoryData = categories.find((category) => category.slug === slug);
    if (foundCategoryData) {
      setCategoryData(foundCategoryData);
    }

    const fetchStreamData = async () => {
      try {
        const { data: streamData, error: streamError } = await supabase
          .from('streaming_rooms')
          .select('uid, title, start_time, is_active, audience_cnt, nickname, thumbnail, tags')
          .eq('category', slug);

        if (streamError) {
          console.error('데이터를 가져오는 중 오류 발생:', streamError.message);
          return;
        }

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
        console.log('data:', enrichedData);
      } catch (error) {
        console.error('오류 발생:', error);
      }
    };

    fetchStreamData();
  }, [slug]);

  return (
    <div>
      <Header />
      <NavBar />
      <div className="text-[22px] py-[90px] pl-[70px] pr-[20px] max-w-[2060px]">
        <div className="px-8 pt-4 flex justify-between bg-white  rounded-lg p-6">
          {categoryData ? (
            <div className="flex items-center gap-4">
              <img
                src={categoryData.backgroundImage}
                alt={categoryData.name}
                className="w-20 h-20 rounded-lg object-cover shadow-md"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{categoryData.name}</h2>
                <p className="text-sm text-gray-500">관련 스트림을 확인하세요!</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">카테고리를 찾을 수 없습니다.</p>
          )}
        </div>

        <div>
          <StreamList streamData={streamData} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
