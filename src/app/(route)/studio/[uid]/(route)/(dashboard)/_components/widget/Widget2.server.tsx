import DashBoardBox from '../DashBoardBox.server';
import DashBoardTitle from '../DashBoardTitle.server';
import DashBoardBoxInfo from '../DashBoardInfo.server';
import DashBoardButton from '../DashBoardButton.server';

const Widget2 = () => {
  return (
    <DashBoardBox>
      {/* 제목 */}
      <DashBoardTitle highlight="동영상" title="업로드 하기" />

      {/* 리스트 */}
      <div className="mt-[14px] list-none m-0 p-0 font-[14px] leading-[1.2]">
        <DashBoardBoxInfo
          title="내 동영상을 간편하게 업로드해보세요."
          info="게시된 동영상이 얼마나 인기 있는지 분석해드립니다."
        />
      </div>

      {/* 버튼 */}
      <div className="mt-[16px] text-center">
        <DashBoardButton>동영상 업로드</DashBoardButton>
      </div>
    </DashBoardBox>
  );
};

export default Widget2;
