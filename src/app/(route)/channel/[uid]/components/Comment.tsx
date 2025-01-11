'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import CommentInput from './CommentInput';

interface Props {
  nickname: string;
  content: string;
  profile_img: string | null;
  onEdit: () => void;
  onDelete: () => void;
  isEditing?: boolean;
  editContent?: string;
  onEditChange?: (value: string) => void; 
  onEditSave?: () => void; 
}

const Comment = (props: Props) => {
  const {
    nickname,
    content,
    profile_img,
    onEdit,
    onDelete,
    isEditing = false,
    editContent = '', 
    onEditChange,
    onEditSave,
  } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const defaultImage = '/channelPage/blank_profile.svg';

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleEditClick = () => {
    onEdit();
    setIsDropdownOpen(false);
  };

  const handleDelete = async () => {
    await onDelete();
    setIsDropdownOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onEditChange) {
      onEditChange(e.target.value);
    }
  };

  const handleSave = async () => {
    if (onEditSave) {
      await onEditSave();
    }
  };

  return (
    <div className="flex items-start w-full p-4 bg-gray-50 border-b border-gray-200 relative">
      {isEditing ? (
        <CommentInput
          value={editContent}
          onChange={handleChange}
          onClick={handleSave}
        />
      ) : (
        <>
          <div className="flex flex-col flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-md text-sm mr-2 relative">
              <Image
                src={profile_img||defaultImage}
                alt="프로필 이미지"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
          </div>

          <div className="flex flex-col flex-wrap w-full">
            <p className="text-m font-black">{nickname}</p>
            <div className="text-m w-full break-words">{content}</div>
          </div>
        </>
      )}

      <div className="ml-auto relative">
        <button
          onClick={toggleDropdown}
          className="w-4 h-4 flex items-center justify-center bg-gray-50 rounded-md hover:bg-gray-300 z-10"
        >
          <Image
            src="/channelPage/more_vert.svg"
            alt="아이콘"
            width={18}
            height={18}
          />
        </button>

        {isDropdownOpen && (
          <div 
            className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-20 z-[10]"
            style={{ overflow: 'visible' }}
          >
            <button
              onClick={handleEditClick}
              className="flex w-full p-2 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Image
                src="/channelPage/edit.svg"
                alt="수정"
                width={18}
                height={18}
                className="mr-2"
              />
              수정
            </button>
            <button
              onClick={handleDelete}
              className="flex w-full text-left font-bold p-2 text-sm text-red-500 hover:bg-gray-100 rounded-lg"
            >
              <Image
                src="/channelPage/delete.svg"
                alt="삭제"
                width={18}
                height={18}
                className="mr-2"
              />
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
