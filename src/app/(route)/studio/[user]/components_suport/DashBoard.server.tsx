import DashBoardSection from "./component/DashBoardSection.server";
import Widget1 from "./DashBoardWidget/Widget1.server";
import Widget2 from "./DashBoardWidget/Widget2.server";
import Widget3 from "./DashBoardWidget/Widget3.server";
import Widget4 from "./DashBoardWidget/Widget4.server";
import Widget5 from "./DashBoardWidget/Widget5.server";

const DashBoard = () => {
    return (
        <div className="flex w-full gap-[15px] flex-col lg:flex-row">
            <DashBoardSection>
                <Widget1/>
                <Widget2/>
            </DashBoardSection>
            <DashBoardSection>
                <Widget3/>
                <Widget4/>
                <Widget5/>
            </DashBoardSection>
        </div>
    )
}

export default DashBoard;



