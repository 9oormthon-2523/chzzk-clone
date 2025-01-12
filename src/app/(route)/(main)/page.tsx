"use client";
import Header from "../../_components/Header/Header.server";
import StreamList from "./_components/StreamList/StreamList.server";
import NavBar from "./_components/NavBar/NavBar.client";
export default function Home() {
  return (
    <div>
      <Header />
      <div className="text-[22px] py-[60px] pl-[60px] pr-[20px]">
        <div className="px-4 pt-4 flex justify-between">
          <strong className="font-blackHanSans font-thin ">인기 Live</strong>
          <button className="font-blackHanSans text-lg text-gray-500 font-thin">
            전체 보기
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <StreamList />
          <StreamList />
          <StreamList />
        </div>
      </div>
    </div>
  );
}
