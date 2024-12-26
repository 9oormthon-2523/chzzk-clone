import StudioWrapper from '../../_components/common/StudioWrapper.server';
import DashBoardSection from './_components/DashBoardSection.server';
import Widget1 from './_components/widget/Widget1.server';
import Widget2 from './_components/widget/Widget2.server';
import Widget3 from './_components/widget/Widget3.server';
import Widget4 from './_components/widget/Widget4.server';
import Widget5 from './_components/widget/Widget5.server';

const DashBoardPage = () => {
  return (
    <StudioWrapper>
      <div className="flex w-full gap-[15px] flex-col lg:flex-row">
        <DashBoardSection>
          <Widget1 />
          <Widget2 />
        </DashBoardSection>
        <DashBoardSection>
          <Widget3 />
          <Widget4 />
          <Widget5 />
        </DashBoardSection>
      </div>
    </StudioWrapper>
  );
};

export default DashBoardPage;
