import StudioWrapper from "./Wrapper.server";
import FstWidget from "./DashBoardWidget/fstWidget.server";
import SecWidget from "./DashBoardWidget/secWidget.server";
import TrdWidget from "./DashBoardWidget/trdWidget.server";
import FrtWidget from "./DashBoardWidget/frtWidget.server";
import DashBoardSection from "./component/DashBoardSection.server";
import TestWireFrame from "./TestWireFrame";

const DashBoard = () => {
    return (
        <TestWireFrame> 
            {/* 이게 대시보드 TestWireFrame은 와이어 프레임이 없어서 임시로 넣은거에요 */}
            <StudioWrapper>
                <div className="flex w-full gap-[15px] flex-col lg:flex-row">
                    <DashBoardSection>
                            <FstWidget/>
                            <SecWidget/>
                    </DashBoardSection>
                    <DashBoardSection>
                            <TrdWidget/>
                            <FrtWidget/>
                    </DashBoardSection>
                </div>
            </StudioWrapper>
        </TestWireFrame>
    )
}

export default DashBoard;



