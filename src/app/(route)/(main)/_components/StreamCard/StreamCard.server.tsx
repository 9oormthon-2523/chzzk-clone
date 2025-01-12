import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface StreamCardProps {
  uid: string;
  title: string;
  start_time: string;
  is_active: boolean;
  audience_cnt: number;
  nickname: string;
  thumbnail: string;
  profile_img: string;
  tags: string[];
}

const StreamCard = (card: StreamCardProps) => {
  const {
    title,
    nickname,
    audience_cnt,
    uid,
    thumbnail,
    is_active,
    profile_img,
    tags,
  } = card;
  const router = useRouter();
  const defaultImage = "/channelPage/blank_profile.svg";

  const handleCardClick = () => {
    router.push(`/live/${uid}`);
  };

  return (
    <div
      className="hover:cursor-pointer bg-white rounded-lg shadow-md p-2 w-80"
      onClick={handleCardClick}
    >
      {/* 이미지 */}
      <div
        className="relative h-44 rounded-lg border border-gray-200"
        style={{
          backgroundImage: `url(${thumbnail || "/mainPage/thumbnailImg.png"})`,
          backgroundPosition: "center center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        {is_active && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            LIVE
          </div>
        )}

        <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
          {audience_cnt.toLocaleString()}명
        </div>
      </div>

      <div className="p-2">
        <h2 className="text-sm font-semibold line-clamp-1">{title}</h2>

        <div className="flex items-center gap-1 mt-1">
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gray-300">
            <Image
              src={profile_img || defaultImage}
              alt={`${nickname} profile`}
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <p className="text-xs text-gray-700 font-medium">{nickname}</p>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-xs text-gray-600 px-2 py-1 rounded-md "
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StreamCard;
