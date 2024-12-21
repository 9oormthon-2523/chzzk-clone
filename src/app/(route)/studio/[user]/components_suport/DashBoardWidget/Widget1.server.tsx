import DashBoardBox from "../component/DashBoardBox.server";
import { DashBoardBoxInfoProps } from "../component/DashBoardInfo.server";
import DashBoardTitle from "../component/DashBoardTitle.server";
import DashBoardBoxInfo from "../component/DashBoardInfo.server"; 
import DashBoardButton from "../component/DashBoardButton.server";

const Widget1 = () => {
  const list = [
    { title: "스트리밍 소프트웨어를 다운로드 하세요", info: "설명 없어요" },
    { title: "스트림 키를 소프트웨어에 붙여 넣어주세요.", info: "스트림 키는 방송 관리 > 설정 에서 확인 가능합니다." },
    { title: "스트리밍 소프트웨어에서 방송을 시작하면 라이브 방송이 진행됩니다.", info: "방송 시작과 종료를 스트리밍 소프트웨어에서 진행해주세요." },
  ];

  return (
    <DashBoardBox>
      {/* 제목 */}
      <DashBoardTitle highlight="방송" title="시작하기" />

      {/* 리스트 */}
      <ol className="mt-[14px] list-none m-0 p-0 font-[14px] leading-[1.2]">
        {list.map((item, idx) => (
          <NumberedListItem key={idx} idx={idx + 1} {...item} />
        ))}
      </ol>

      {/* 버튼 */}
      <div className="mt-[16px] text-center">
        <DashBoardButton>
            방송하기
        </DashBoardButton>
      </div>
    </DashBoardBox>
  );
};

export default Widget1;

interface NumberedListItemProps extends DashBoardBoxInfoProps {
    idx: number;
}
  
const NumberedListItem = (props: NumberedListItemProps) => {
    const { idx, title, info } = props;

    return (
        <li className="mt-[25px] flex m-0 p-0 box-border">
            {/* 번호 */}
            <div className="font-sansSerif bg-[#222] font-black rounded-[50%] text-[#fff] flex-none text-[11px] text-center w-[18px] h-[18px] leading-[1.6]">
                {idx}
            </div>

            {/* 정보 */}
            <DashBoardBoxInfo title={title} info={info} />

        </li>
    )

};
  