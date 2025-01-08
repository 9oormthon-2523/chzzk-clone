import React from 'react';
import CellTextArea from './CellComponents/CellTextArea';
import CellArea from './CellArea';
import CellCategory from './CellComponents/CellCategory';
import CellTags from './CellComponents/CellTags';
import CellPreviewSelector from './CellComponents/CellPreviewSelector';
import SettingUpdateBtn from './SettingUpdateBtn';

const Setting = () => {
  return (
    <>
      <div className="flex flex-col gap-[30px] min-w-[580px]">
        <CellArea title="방송 제목" component={<CellTextArea />} />
        <CellArea title="카테고리" component={<CellCategory />} />
        <CellArea title="태그 (최대 5개)" component={<CellTags />} />
        <CellArea title="미리보기 이미지" component={<CellPreviewSelector />} />
      </div>
      <SettingUpdateBtn />
    </>
  );
};

export default Setting;
