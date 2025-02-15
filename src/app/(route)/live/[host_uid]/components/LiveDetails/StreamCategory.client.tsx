import useLiveControl from "@/app/_store/stores/live/useLiveControl";

/**
 * 스트리밍 카테고리 컴포넌트
 */

export const StreamCategory = () => {
    const category = useLiveControl(state => state.streamRoom.state.category);

    return (
        <div id="카테고리" className="p-0 inline-block">
            <span className="text-[#32bb81] font-blackHanSans text-[14px] gap-[2px_7px] tracking-[-0.3px] leading-[18px] min-w-0">          
                <span>{category}</span>
            </span>
        </div>
    )
}

export default StreamCategory;