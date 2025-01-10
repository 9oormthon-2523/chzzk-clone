import DashBoardBox from '../DashBoardBox.server';
import DashBoardTitle from '../DashBoardTitle.server';
import DashBoardBoxInfo from '../DashBoardInfo.server';
import DashBoardButton from '../DashBoardButton.server';
import RobotSvg from '@public/studioPage/Robot.svg';
import Link from 'next/link';

const Widget4 = ({ uid }: { uid: string }) => {
  const dot =
    "before:content-[''] before:bg-[#858894] before:rounded-full before:h-[3px] before:w-[3px] before:absolute before:top-[8px] before:left-0";

  return (
    <DashBoardBox>
      {/* 제목 */}
      <DashBoardTitle highlight="시청자" title="관리" />

      {/* 리스트 */}
      <div className="mt-[20px] list-none m-0 p-0 font-[14px] leading-[1.2]">
        <DashBoardBoxInfo title="나를 팔로우 하는 유저와 상호작용하여 나의 방송을 관리해보세요." />
      </div>

      <div className="flex mt-[20px] font-gothic font-black text-[13px]">
        <RobotSvg />
        <div className="text-[#222] ml-[22px] ">
          <p>지원 기능</p>
          <ul className="mt-[6px] list-none font-light opacity-[80%]">
            <li
              className={`tracking-[-.5px] leading-[20px] pl-[9px] relative ${dot}`}
            >
              팔로워 검색
            </li>
            <li
              className={`tracking-[-.5px] leading-[20px] pl-[9px] relative ${dot}`}
            >
              팔로우 & 언팔로우
            </li>
          </ul>
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-[20px] text-center">
        <Link href={`/studio/${uid}/follower`}>
          <DashBoardButton theme="white">바로가기</DashBoardButton>
        </Link>
      </div>
    </DashBoardBox>
  );
};

export default Widget4;
