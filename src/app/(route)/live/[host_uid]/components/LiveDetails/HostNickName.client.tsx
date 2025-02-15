import useLiveControl from "@/app/_store/stores/live/useLiveControl";

/**
 * 호스트 닉네임 컴포넌트트
 */

const HostNickName = () => {
    const nickname = useLiveControl(state => state.hostInfo.state.nickname);
    
    return (
        <div role="paragraph" className="flex m-0 p-0">
            <div className="text-[#2e3033] text-[18px] leading-[22px] m-0 -mx-[6px] min-w-0 p-[4px_6px] relative font-bold">
                <a className="b-0 l-0 relative r-0 t-0"/>
                <span className="inline-flex max-w-[100%] align-top">
                    <span style={{textOverflow:"ellipsis"}} className="pr-[1px] overflow-hidden whitespace-nowrap">
                        {nickname}
                    </span>
                </span>
                
            </div>
        </div>
    );
};

export default HostNickName;