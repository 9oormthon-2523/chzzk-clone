import LivePlayer from "./LivePlayer/_LivePlayer.client";
import LiveDetails from "./LiveDetails/_LiveDetails.client";
import LiveStreamFooter from "./Footer.client";


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
            <LiveStreamFooter/>
        </main>
)}