"use client";
import Header from "../../_components/Header/Header.server";
import StreamList from "./_components/StreamList/StreamList.server";
import useNavToggle from "@/app/_store/main/useNavToggle.client";
import NavBar from "./_components/NavBar/NavBar.client";
export default function Home() {
  const { isOpen } = useNavToggle();
  return (
    <div>
      <Header />
      {isOpen && <NavBar />}
      <div className="text-[22px] pt-[60px]">
        <h1>
          <strong>전체 방송</strong>
        </h1>
        <StreamList />
      </div>
    </div>
  );
}
