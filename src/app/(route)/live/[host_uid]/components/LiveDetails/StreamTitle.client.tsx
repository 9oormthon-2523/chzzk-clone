import useLiveControl from "@/app/_store/stores/live/useLiveControl";

/**
 * 스트리밍 제목 컴포넌트
 */

const StreamTitle = () => {
    const title = useLiveControl(state => state.streamRoom.state.title);

    return (
        <h2 
            id="stream-room-info-title"
            className="text-[#2e3033] mb-1 text-[22px] font-bold tracking-[-0.3px] leading-[28px]"
        >
            {title}
        </h2>
    );
};

export default StreamTitle;