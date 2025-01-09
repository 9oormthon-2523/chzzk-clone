'use client';

import { useStreamingUpdate } from '@/app/_store/queries/streamingSettings/mutation';
import useStreamingSettings from '@/app/_store/stores/studio/useStreamingSettings';
import { StreamingQueryType } from '@/app/_types/streaming.type';
import React, { useEffect, useState } from 'react';

const SettingUpdateBtn = ({ ...props }: StreamingQueryType) => {
  const { data } = useStreamingSettings();
  const { streamingInfoMutate } = useStreamingUpdate();

  const [hasDiff, setHasDiff] = useState(false);
  useEffect(() => {
    if (
      data.title === props.title &&
      data.category === props.category &&
      data.thumbnail === props.thumbnail &&
      JSON.stringify(data.tags) === JSON.stringify(props.tags)
    ) {
      setHasDiff(false);
    } else setHasDiff(true);
  }, [data, props]);

  return (
    <button
      className="my-[20px] w-[560px] h-[46px] text-[14px] font-extrabold rounded-[7px]"
      style={{
        backgroundColor: hasDiff ? '#4e41db' : '#4e41db1a',
        color: hasDiff ? '#fff' : '#4e41db4d',
      }}
      onClick={() => {
        streamingInfoMutate({
          title: data.title,
          category: data.category,
          tags: data.tags,
          thumbnail: data.thumbnail || null,
        });
      }}
      disabled={!hasDiff}
    >
      업데이트
    </button>
  );
};

export default SettingUpdateBtn;
