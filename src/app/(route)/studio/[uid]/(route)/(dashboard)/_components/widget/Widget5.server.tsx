import Link from 'next/link';
import DashBoardBox from '../DashBoardBox.server';
import DashBoardTitle from '../DashBoardTitle.server';
// import DashBoardButton from '../DashBoardButton.server';

const Widget5 = () => {
  const list = [
    {
      title: '원 클릭으로 편하게 방송을 시작해 보세요.',
      date: '2024.12.18',
      notice_id: 'd12jlf21-tj ',
    },
    {
      title:
        '방송관리 > "설정", "알림", "리허설 방송하기" 는 추후 구현 예정입니다.',
      date: '2024.12.31',
      notice_id: 'd12j2jc1-au',
    },
    {
      title: '시청자 관리 > "구독자", "활동 제한" 은 추후 구현 예정입니다.',
      date: '2025.01.09',
      notice_id: 'pgmjlf21-po',
    },
  ];

  return (
    <DashBoardBox>
      {/* 제목 */}
      <DashBoardTitle title="공지사항" />

      {/* 리스트 */}
      <ul className="mt-[10px] list-none m-0 p-0 text-[14px] leading-[1.2]">
        {list.map((item, idx) => (
          <ListItem key={idx} {...item} />
        ))}
      </ul>

      {/* <div className="mt-[20px] text-center">
        <DashBoardButton theme="white">전체 보기</DashBoardButton>
      </div> */}
    </DashBoardBox>
  );
};

export default Widget5;

interface ListItemProps {
  title: string;
  date: string;
  notice_id: string; //공지사항 글 id
}

const ListItem = (props: ListItemProps) => {
  const { date, title, notice_id } = props;

  const path = '';

  return (
    <li className="m-0 p-0 box-border w-auto text-[13px]">
      <Link
        href={`/${path}/${notice_id}`}
        className="grid grid-flow-col items-center p-[0px_8px_7px_10px] w-full leading-5 tracking-[-.5px] group"
      >
        <strong className="text-[#222] flex-grow min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-normal group-hover:underline  decoration-[0.5px]">
          {title}
        </strong>
        <div className="text-[#697183] flex-none leading-[18px] ml-auto pl-8">
          {date}
        </div>
      </Link>
    </li>
  );
};
