import DashBoardBox from "../component/DashBoardBox.server";
import DashBoardTitle from "../component/DashBoardTitle.server";
import DashBoardBoxInfo from "../component/DashBoardInfo.server"; 
import DashBoardButton from "../component/DashBoardButton.server";
import RobotSvg from "@public/studioPage/Robot.svg"

const Widget4 = () => {
  const list = [
    { title: "스트리밍 소프트웨어를 다운로드 하세요", info: "설명 없어요" },
    { title: "스트림 키를 소프트웨어에 붙여 넣어주세요.", info: "스트림 키는 방송 관리 > 설정 에서 확인 가능합니다." },
    { title: "스트리밍 소프트웨어에서 방송을 시작하면 라이브 방송이 진행됩니다.", info: "방송 시작과 종료를 스트리밍 소프트웨어에서 진행해주세요." },
  ];

  const dot = "before:content-[''] before:bg-[#858894] before:rounded-full before:h-[3px] before:w-[3px] before:absolute before:top-[8px] before:left-0"

  return (
    <DashBoardBox>
      {/* 제목 */}
      <DashBoardTitle highlight="채팅" title="설정"/>

      {/* 리스트 */}
      <div className="mt-[20px] list-none m-0 p-0 font-[14px] leading-[1.2]">
        <DashBoardBoxInfo title="내 방송 스타일에 맞게 채팅 기능을 설정할 수 있습니다."/>
      </div>

      <div className="flex mt-[20px] font-gothic font-black text-[13px]">
        <RobotSvg/>
        <div className="text-[#222] ml-[22px] ">
          <p>설정 가능 항목</p>
          <ul className="mt-[6px] list-none font-light opacity-[80%]">
            <li className={`tracking-[-.5px] leading-[20px] pl-[9px] relative ${dot}`}>채팅 규칙</li>
            <li className={`tracking-[-.5px] leading-[20px] pl-[9px] relative ${dot}`}>금칙어 설정</li>
          </ul> 
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-[20px] text-center">
        <DashBoardButton theme="white">채팅 규칙</DashBoardButton>
        <DashBoardButton customStyle="ml-[10px]" theme="white">금칙어 설정</DashBoardButton>
      </div>
    </DashBoardBox>
  );
};

export default Widget4;
