import ChannelProfile from "./components/ChannelProfile"
import Post from "./components/Post"

const Channel = () => {
  return (
    <>
      <div className="ml-12 mr-12">
        <ChannelProfile nickname="엄청난 물고기" follower={2.4} context="매일 물고기 썰 풀어드립니다."/>
          <p className="text-xl font-black ml-4 mt-6">커뮤니티</p>
          <div className="flex items-start flex-col max-w-7xl bg-white rounded-lg m-2 mt-6 gap-6">
            <Post nickname="엄청난 물고기" content="배부른 물고기가 느리다 배부른 물고기가 느리다 배부른 물고기가 느리다 배부른 물고기가 느리다 "/>
            <Post nickname="엄청난 물고기" content="배부른 물고기가 느리다 배부른 물고기가 느리다 배부른 물고기가 느리다 배부른 물고기가 느리다 "/>
            <Post nickname="엄청난 물고기" content="배부른 물고기가 느리다 배부른 물고기가 느리다 배부른 물고기가 느리다 배부른 물고기가 느리다 "/>

          </div>
        <div className="h-32"/>
      </div>
    </>

  )
}

export default Channel