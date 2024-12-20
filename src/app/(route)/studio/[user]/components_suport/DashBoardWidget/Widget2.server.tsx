import DashBoardBox from "../component/DashBoardBox.server";
import DashBoardTitle from "../component/DashBoardTitle.server";
import DashBoardBoxInfo from "../component/DashBoardInfo.server"; 
import DashBoardButton from "../component/DashBoardButton.server";

const Widget2 = () => {
  const list = [
    { title: "스트리밍 소프트웨어를 다운로드 하세요", info: "설명 없어요" },
    { title: "스트림 키를 소프트웨어에 붙여 넣어주세요.", info: "스트림 키는 방송 관리 > 설정 에서 확인 가능합니다." },
    { title: "스트리밍 소프트웨어에서 방송을 시작하면 라이브 방송이 진행됩니다.", info: "방송 시작과 종료를 스트리밍 소프트웨어에서 진행해주세요." },
  ];

  return (
    <DashBoardBox>
      {/* 제목 */}
      <DashBoardTitle highlight="동영상" title="업로드 하기"/>

      {/* 리스트 */}
      <div className="mt-[14px] list-none m-0 p-0 font-[14px] leading-[1.2]">
        <DashBoardBoxInfo title="내 동영상을 간편하게 업로드해보세요." info="게시된 동영상이 얼마나 인기 있는지 분석해드립니다."/>
      </div>

      {/* 버튼 */}
      <div className="mt-[16px] text-center">
        <DashBoardButton>
            동영상 업로드
        </DashBoardButton>
      </div>
    </DashBoardBox>
  );
};

export default Widget2;
