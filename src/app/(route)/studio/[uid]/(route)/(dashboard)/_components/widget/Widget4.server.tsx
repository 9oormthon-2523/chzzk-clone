import DashBoardBox from '../DashBoardBox.server';
import DashBoardTitle from '../DashBoardTitle.server';
import DashBoardBoxInfo from '../DashBoardInfo.server';
import DashBoardButton from '../DashBoardButton.server';
import RobotSvg from '@public/studioPage/Robot.svg';

const Widget4 = () => {
  const dot =
    "before:content-[''] before:bg-[#858894] before:rounded-full before:h-[3px] before:w-[3px] before:absolute before:top-[8px] before:left-0";

  return (
    <DashBoardBox>
      {/* 제목 */}
      <DashBoardTitle highlight="채팅" title="설정" />

      {/* 리스트 */}
      <div className="mt-[20px] list-none m-0 p-0 font-[14px] leading-[1.2]">
        <DashBoardBoxInfo title="내 방송 스타일에 맞게 채팅 기능을 설정할 수 있습니다." />
      </div>

      <div className="flex mt-[20px] font-gothic font-black text-[13px]">
        <RobotSvg />
        <div className="text-[#222] ml-[22px] ">
          <p>설정 가능 항목</p>
          <ul className="mt-[6px] list-none font-light opacity-[80%]">
            <li
              className={`tracking-[-.5px] leading-[20px] pl-[9px] relative ${dot}`}
            >
              채팅 규칙
            </li>
            <li
              className={`tracking-[-.5px] leading-[20px] pl-[9px] relative ${dot}`}
            >
              금칙어 설정
            </li>
          </ul>
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-[20px] text-center">
        <DashBoardButton theme="white">채팅 규칙</DashBoardButton>
        <DashBoardButton customStyle="ml-[10px]" theme="white">
          금칙어 설정
        </DashBoardButton>
      </div>
    </DashBoardBox>
  );
};

export default Widget4;
