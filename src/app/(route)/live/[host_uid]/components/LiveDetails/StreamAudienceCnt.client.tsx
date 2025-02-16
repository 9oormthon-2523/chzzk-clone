import useLiveControl from "@/app/_store/stores/live/useLiveControl";

/**
 * 스트리밍 시청자 수 컴포넌트 
 */

const StreamAudienceCnt = () => {
  const audience_cnt = useLiveControl(state => state.streamRoom.state.audience_cnt);

  return (
    <strong 
      id="stream-room-info-audience-cnt" 
      className="text-#2e3033 text-[12px] font-semibold relative leading-[25px]"
    >
      {audience_cnt}명 시청 중 •
    </strong>
  )
};

export default StreamAudienceCnt;