import DashBoardBox from '../DashBoardBox.server';
import DashBoardTitle from '../DashBoardTitle.server';
import DashBoardBoxInfo from '../DashBoardInfo.server';
import DashBoardButton from '../DashBoardButton.server';
import Link from 'next/link';

const Widget2 = ({ uid }: { uid: string }) => {
  return (
    <DashBoardBox>
      {/* 제목 */}
      <DashBoardTitle highlight="방송국" title="관리 하기" />

      {/* 리스트 */}
      <div className="mt-[14px] list-none m-0 p-0 font-[14px] leading-[1.2]">
        <DashBoardBoxInfo
          title="나만의 방송국을 통해 팔로워들과 소통하세요."
          info="나의 프로필을 관리하고, 게시글을 통해 나의 팔로워들과 소통할 수 있습니다."
        />
      </div>

      {/* 버튼 */}
      <div className="mt-[16px] text-center">
        <Link href={`/channel/${uid}`}>
          <DashBoardButton>방송국 바로가기</DashBoardButton>
        </Link>
      </div>
    </DashBoardBox>
  );
};

export default Widget2;
