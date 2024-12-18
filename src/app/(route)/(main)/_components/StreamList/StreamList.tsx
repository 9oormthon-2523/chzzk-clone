import React from "react";
import { DummyData, StreamCardData } from "./dummy";
import StreamCard from "../StreamCard/StreamCard";

const StreamList: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center items-center">
      {DummyData.map((data: StreamCardData, index: number) => (
        <StreamCard
          key={index}
          title={data.title}
          nickName={data.nickName}
          viewers={data.viewers}
          tags={data.tags}
        />
      ))}
    </div>
  );
};

export default StreamList;
