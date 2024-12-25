'use client';
import React, {useState} from 'react';
import { createClient } from "../../../_utils/supabase/client";
import ChannelProfile from '../[uid]/components/ChannelProfile';
import { useRouter } from 'next/navigation';


const supabase = createClient();

const Page = () => {
  const router = useRouter();
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = (e.target as HTMLFormElement).text.value;

    const { data, error } = await supabase
      .from('posts')
      .insert([{ content: text, nickname: '익명' }]);

    if (error) {
      console.error('글쓰기 오류', error);
    } else {
      console.log('작성 내용', data);
      router.push('/channel/{uid}');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }

  return (
    <div className="mx-12">
      <ChannelProfile nickname="엄청난 물고기" follower={2.4} context="매일 물고기 썰 풀어드립니다." />
      <form onSubmit={handleSubmit} className="m-auto mt-12 p-8 w-full bg-gray-50 rounded-lg">
        <p className='text-xl font-black mb-6'>글쓰기</p>
        <textarea
          name="text"
          className="form-textarea mt-1 pt-4 block w-full h-96 bg-gray-50 outline-none resize-none border-t border-b border-gray-300"
          placeholder='어떤 이야기를 남길건가요?'
          value={text}
          onChange={handleInputChange}
        ></textarea>
        <div className="flex justify-end">
      <button
        type="submit"
        className={`inline-flex justify-center py-2 px-4 w-24 border border-transparent shadow-sm text-sm rounded-md mt-4 font-black ${
          text ? "bg-[#1bb373] text-white" : "bg-gray-300 text-gray-500"
        }`}>
        등록
      </button>
    </div>
      </form>
    </div>
  );
}

export default Page;