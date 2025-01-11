import React, { useEffect, useState } from "react";
import StreamCard from "../StreamCard/StreamCard.server";
import { createClient } from "@supabase/supabase-js";

interface StreamCardData {
  uid: string; // uuid
  title: string;
  start_time: string; // timestamp
  is_active: boolean;
  audience_cnt: number;
  nickname: string;
  thumbnail: string;
  profile_img: string;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const StreamList: React.FC = () => {
  const [streamData, setStreamData] = useState<StreamCardData[]>([]);

  useEffect(() => {
    const fetchStreamData = async () => {
      try {
        // 1. streaming_rooms 테이블에서 데이터 가져오기
        const { data: streamData, error: streamError } = await supabase
          .from("streaming_rooms")
          .select(
            "uid, title, start_time, is_active, audience_cnt, nickname, thumbnail"
          );

        if (streamError) {
          console.error("데이터를 가져오는 중 오류 발생:", streamError.message);
          return;
        }

        // 2. 각 uid에 대해 profile_img 가져오기
        const enrichedData = await Promise.all(
          streamData.map(async (stream) => {
            const { data: userData, error: userError } = await supabase
              .from("users")
              .select("profile_img")
              .eq("id", stream.uid)
              .single();

            if (userError) {
              console.error(
                `사용자 정보 불러오기 오류 (uid: ${stream.uid})`,
                userError
              );
              return { ...stream, profile_img: "" }; // 기본 값
            }

            return { ...stream, profile_img: userData.profile_img || "" };
          })
        );

        setStreamData(enrichedData || []);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchStreamData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 px-4 justify-center items-center">
      {streamData.map((data: StreamCardData) => (
        <StreamCard key={data.uid} {...data} />
      ))}
    </div>
  );
};

export default StreamList;
