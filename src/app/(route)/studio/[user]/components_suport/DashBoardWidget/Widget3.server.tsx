import DashBoardBox from "../component/DashBoardBox.server";
import DashBoardTitle from "../component/DashBoardTitle.server";
import DashBoardBoxInfo from "../component/DashBoardInfo.server"; 
import { DashBoardBoxInfoProps } from "../component/DashBoardInfo.server";
import PencilSvg from "@public/studioPage/Pencill.svg";
import CanvasSvg from "@public/studioPage/Canvas.svg";
import DocumentSvg from "@public/studioPage/Document.svg";


const svgList = [PencilSvg, CanvasSvg, DocumentSvg]

const Widget3 = () => {
  const list = [
    { title: "방송 제목", info: "매력적인 제목으로 시청자의 관심을 유도 해보세요. 시청자가 방송을 찾을 때 사용할 만한 키워드를 넣는 것이 좋습니다." },
    { title: "카테고리", info: "시청자가 쉽게 찾을 수 있도록 진행 중인 방송 카테고리를 추가하세요." },
    { title: "미리보기 이미지", info: "진행 중인 방송을 설명할 수 있는 사진을 업로드 하세요. 시청자의 관심을 끄는 이미지가 좋습니다." },
  ];

  return (
    <DashBoardBox theme="blue">
      {/* 제목 */}
      <DashBoardTitle title="방송 정보 설정 가이드" />

      {/* 리스트 */}
      <ol className="mt-[14px] list-none m-0 p-0 font-[14px] leading-[1.2]">
        {list.map((item, idx) => (
          <ListItem key={idx} idx={idx} {...item} />
        ))}
      </ol>

    </DashBoardBox>
  );
};

export default Widget3;

interface NumberedListItemProps extends DashBoardBoxInfoProps {
  idx:number
}
  
const ListItem = (props: NumberedListItemProps) => {
  const {idx, ...item} = props;

  const SvgIcon = svgList[idx];

  return (
    <li className={`flex ${idx !== 0 ? "mt-[24px]" : ""} gap-[18px]`}>
      {/* 이미지 */}
      <SvgIcon className="w-[74px] h-[62px] p-0 box-border"/>
      {/* <div /> */}

      {/* 정보 */}
      <DashBoardBoxInfo {...item}/>
    </li>
  ) 
};
