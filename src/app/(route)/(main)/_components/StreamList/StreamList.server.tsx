import React, { useEffect, useState } from "react";
import StreamCard from "../StreamCard/StreamCard.server";
import { createClient } from "@supabase/supabase-js";

interface StreamCardData {
  room_id: string; // uuid
  uid: string; // uuid
  title: string;
  start_time: string; // timestamp
  is_active: boolean;
  audience_cnt: number;
  nickname: string;
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
        const { data, error } = await supabase
          .from("streaming_rooms")
          .select(
            "room_id, uid, title, start_time, is_active, audience_cnt, nickname"
          );

        if (error) {
          console.error("데이터를 가져오는 중 오류 발생:", error.message);
          return;
        }

        setStreamData(data || []);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchStreamData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center items-center">
      {streamData.map((data: StreamCardData) => (
        <StreamCard
          key={data.room_id}
          title={data.title}
          nickName={data.nickname}
          aduience_cnt={data.audience_cnt}
        />
      ))}
    </div>
  );
};

export default StreamList;
