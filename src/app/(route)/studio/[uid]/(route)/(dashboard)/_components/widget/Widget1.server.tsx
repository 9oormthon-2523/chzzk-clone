import DashBoardBox from '../DashBoardBox.server';
import { DashBoardBoxInfoProps } from '../DashBoardInfo.server';
import DashBoardTitle from '../DashBoardTitle.server';
import DashBoardBoxInfo from '../DashBoardInfo.server';
import DashBoardButton from '../DashBoardButton.server';
import Link from 'next/link';

const Widget1 = ({ uid }: { uid: string }) => {
  const list = [
    {
      title: '아래의 방송하기 버튼을 클릭하여 해당 페이지로 이동해주세요.',
      info: '좌측 방송관리 > 방송하기 페이지로도 이동 가능합니다.',
    },
    {
      title: '"스트리밍 시작하기" 버튼을 누르면 라이브 방송이 시작됩니다.',
      info: '공유할 화면을 선택하고 공유된 스크린과 마이크 볼륨을 조절해주세요.',
    },
    {
      title: '원 클릭 라이브 방송 성공!',
      info: '방송 시작과 종료는 방송하기 페이지내에서 해주세요.',
    },
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
        <Link href={`/studio/${uid}/live`}>
          <DashBoardButton>방송하기</DashBoardButton>
        </Link>
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
  );
};
