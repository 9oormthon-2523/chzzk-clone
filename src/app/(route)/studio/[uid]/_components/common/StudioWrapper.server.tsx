import { ReactNode } from 'react';
import Footer from './Footer';

interface StudioContainer {
  children?: ReactNode;
}

const StudioWrapper = (props: StudioContainer) => {
  const { children } = props;

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex flex-1 w-full max-w-[1200px] min-w-[698px] p-[40px_50px_0] box-border m-[0_auto]">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default StudioWrapper;
