import LivePlayer from "./VideoPlayer/VideoPlayer.client";
import LiveDetails from "./LiveDetails/LiveDetails.client";


/**
 * 라이브 스트리밍 컨테이너 컴포넌트
 */

export default function LiveStreamingLayout(){
    
    return (
        <main style={{scrollbarWidth:'none'}} id="view-steaming" className="flex flex-1 flex-col min-w-[0] overflow-y-auto">
            <div id="live-information-container" className="flex flex-col max-h-[100%]">

                {/* 라이브 플레이어 */}
                <LivePlayer/>
                
                {/* 라이브 정보란 */}
                <LiveDetails/>
            </div>

            {/* 광고란 */}    
            <div id="live-banner-container" className=""></div>

            {/* footer 정보란... */}
            <footer className="border-t-[1px] border-solid border-[#0000001f] flex flex-wrap justify-center m-[0_30px] p-[25px_0_85px] items-center">

            </footer>

        </main>
)}

