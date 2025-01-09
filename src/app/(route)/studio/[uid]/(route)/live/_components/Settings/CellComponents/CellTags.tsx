'use client';

import React, { useEffect, useState } from 'react';
import SeacrhIcon from '@public/studioPage/Search.svg';
import useStreamingSettings from '@/app/_store/stores/studio/useStreamingSettings';
import DeleteIcon from '@public/studioPage/Delete.svg';
import ErrorAlertIcon from '@public/studioPage/ErrorAlert.svg';

const CellTags = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [text, setText] = useState('');
  const [tagErrorType, setTagErrorType] = useState<{
    lengthError: boolean;
    duplicateError: boolean;
  }>({
    lengthError: false,
    duplicateError: false,
  });
  const { data, setPushTags, setDeleteTags } = useStreamingSettings();

  useEffect(() => {
    if (data.tags.length < 5) {
      setTagErrorType((prev) => ({ ...prev, lengthError: false }));
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full">
      <form
        className="flex gap-[10px] w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (data.tags.includes(text)) {
            setText('');
            return setTagErrorType({
              lengthError: false,
              duplicateError: true,
            });
          }
          if (data.tags.length === 5) {
            setText('');
            return setTagErrorType({
              lengthError: true,
              duplicateError: false,
            });
          }
          setTagErrorType({ lengthError: false, duplicateError: false });
          setPushTags(text);
          setText('');
        }}
      >
        <div
          className={`bg-white border p-[9px_14px] inline-flex rounded-[5px] items-center gap-1 w-full h-[40px] ${
            isFocus ? 'border-[#4e41db]' : 'border-[#ddd] hover:border-[#aaa]'
          }`}
        >
          <SeacrhIcon />
          <input
            placeholder="태그 입력 후 Enter 또는 추가 버튼을 클릭해주세요."
            type="text"
            autoComplete="off"
            color="#222"
            className="text-[14px] focus:outline-none w-full"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
        <button
          className="bg-[#4e41db1a] min-w-[64px] h-[40px] text-[13px] font-extrabold rounded-[7px]"
          style={{
            color: text ? '#4e41db' : '#4e41db4d',
          }}
        >
          추가
        </button>
      </form>

      {tagErrorType.lengthError && (
        <p
          role="alert"
          className="flex gap-1 text-[#ff393e] items-center text-[12px] mt-[10px] ml-[3px]"
        >
          <ErrorAlertIcon />
          태그는 5개까지 등록 가능합니다.
        </p>
      )}

      {tagErrorType.duplicateError && (
        <p
          role="alert"
          className="flex gap-1 text-[#ff393e] items-center text-[12px] mt-[10px] ml-[3px]"
        >
          <ErrorAlertIcon />
          이미 등록된 태그입니다.
        </p>
      )}

      <div className="flex gap-1 mt-[10px] flex-wrap">
        {data.tags.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-100 text-[#697183] font-semibold rounded-[14px] text-[12px] flex gap-1 p-[5px_9px] hover:bg-gray-200"
          >
            <span>{item}</span>
            <button
              onClick={() => {
                setDeleteTags(item);
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>

      <ul className="text-[#697183] text-[13px] list-disc	ml-[20px] mt-[10px]">
        <li>공백 및 특수 문자 없이 15자까지 입력할 수 있습니다.</li>
        <li>등록한 순서대로 방송 정보에 노출됩니다.</li>
      </ul>
    </div>
  );
};

export default CellTags;
