'use client';

import React from 'react';
import CellTextArea from './CellComponents/CellTextArea';
import CellArea from './CellArea';
import CellCategory from './CellComponents/CellCategory';
import CellTags from './CellComponents/CellTags';
import CellPreviewSelector from './CellComponents/CellPreviewSelector';
import SettingUpdateBtn from './SettingUpdateBtn';
import { useUserStreaming } from '@/app/_store/queries/streamingSettings/query';
import { useUID } from '@/app/_store/context/useUid';

const Setting = () => {
  const uid = useUID();
  const { data } = useUserStreaming(uid);

  return (
    <>
      <div className="flex flex-col gap-[30px] min-w-[580px]">
        {data && (
          <>
            <CellArea
              title="방송 제목"
              component={<CellTextArea title={data.title} />}
            />
            <CellArea
              title="카테고리"
              component={<CellCategory category={data.category} />}
            />
            <CellArea
              title="태그 (최대 5개)"
              component={<CellTags tags={data.tags} />}
            />
            <CellArea
              title="미리보기 이미지"
              component={<CellPreviewSelector thumbnail={data.thumbnail} />}
            />
          </>
        )}
      </div>
      {data && <SettingUpdateBtn {...data} />}
    </>
  );
};

export default Setting;
