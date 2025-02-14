interface ListItemProps {
  title: string;
  date: string;
}

const NoticeItem = (props: ListItemProps) => {
  const { date, title } = props;

  return (
    <li className="m-0 p-0 box-border w-auto text-[13px]" itemType="">
      <div className="grid grid-flow-col items-center p-[0px_8px_7px_10px] w-full leading-5 tracking-[-.5px] group">
        <strong className="text-[#222] flex-grow min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-normal decoration-[0.5px]">
          {title}
        </strong>
        <div className="text-[#697183] flex-none leading-[18px] ml-auto pl-8">{date}</div>
      </div>
    </li>
  );
};

export default NoticeItem;
