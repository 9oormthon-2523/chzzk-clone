"use client"
import useVideoControl from "@/app/_store/live/useVideoControl";

//볼륨 조절 버튼
const PlayerBottomBolumeControl = () => {
    const audioMute = useVideoControl((state) => state.audioMute);
    const volumeControl = useVideoControl((state) => state.volumeControl);
    const isMuted = useVideoControl((state) => state.audioTrack.isMuted);
    const volumeLevel = useVideoControl((state) => state.audioTrack.volumeLevel);
    
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isMuted) audioMute(false);
        volumeControl(Number(e.target.value)); 
    };

    return (
        <div className="flex i tems-center justify-center w-[84px]">
            <input
                type="range" 
                aria-label="볼륨 조절"
                id="volume-range"
                min={0} 
                max={100}
                step={0.1}
                value={isMuted ? 0 : volumeLevel}
                onChange={handleVolumeChange} //볼륨 조절
                onMouseMove={e => {e.stopPropagation();}} // 이벤트 버블링을 막음 (부모 요소의 move이벤트에 덧 씌워져 슬라이딩이 막힘)
                className="w-full h-[2.3px] mt-[1px] bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-500 "
                style={{ background: `linear-gradient(to right, #527cdc ${Number(isMuted ? 0 : volumeLevel)}%, #e5e5e5 ${Number(isMuted ? 0 : volumeLevel)}%)`}}
            />
        </div>
    )
}

export default PlayerBottomBolumeControl;