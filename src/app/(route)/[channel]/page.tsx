import ChannelProfile from "./components/ChannelProfile"
import Post from "./components/Post"
import BoardInput from "./components/BoardInput"

const Channel = () => {
  return (
    <>
      <div className="ml-12 mr-12">
        <ChannelProfile nickname="엄청난 물고기" follower={2.4} context="매일 물고기 썰 풀어드립니다."/>
          <p className="text-xl font-black ml-4 mt-6">커뮤니티</p>
          <BoardInput/>
          <div className="flex items-start flex-col max-w-7xl bg-white rounded-lg m-2 mt-6 gap-6">
            <Post nickname="엄청난 물고기" content="배부른 물고기가 느리다."/>
            <Post nickname="엄청난 물고기" content="물고기 또는 어류는 척추동물아문에 속하는 동물의 하나다. 또한 척추동물 중에서 네발동물은 제외된다. 대체적으로 물 속에 살며 아가미로 호흡하며 지느러미로 움직이고 몸 표면이 비늘로 덮여 있는 냉혈동물로 주위 온도에 영향을 받는다."/>
            <Post nickname="엄청난 물고기" content="아쿠아리움 물고기는 억지로 잡아왔나요? 잘 모르시나 보네요 물고기들이 모집 요강 보고 지원해서 이력서 쓰고 면접보고 뽑습니다."/>
          </div>
        <div className="h-32"/>
      </div>
    </>

  )
}

export default Channel