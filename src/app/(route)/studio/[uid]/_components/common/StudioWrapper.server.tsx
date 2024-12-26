import { ReactNode } from 'react';

interface StudioContainer {
  children?: ReactNode;
}

const StudioWrapper = (props: StudioContainer) => {
  const { children } = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 max-w-[1200px] min-w-[698px] p-[40px_50px_0] box-border m-[0_auto]">
        {children}
      </div>
      <footer className="flex justify-center py-[35px] px-[30px] text-[12px]">
        <strong className="border-l border-r border-[#00000026] px-[10px]">
          ⓒ EZZ Corp.
        </strong>
      </footer>
    </div>
  );
};

export default StudioWrapper;
