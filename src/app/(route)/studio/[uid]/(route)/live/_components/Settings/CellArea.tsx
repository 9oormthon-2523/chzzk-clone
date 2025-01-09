import React from 'react';

interface Props {
  title: string;
  component: React.ReactNode;
}
const CellArea = (props: Props) => {
  const { title, component } = props;
  return (
    <div className="flex gap-[15px]">
      <div className="p-[10px] min-w-[175px] font-extrabold">
        <strong>{title}</strong>
      </div>
      {component}
    </div>
  );
};

export default CellArea;
