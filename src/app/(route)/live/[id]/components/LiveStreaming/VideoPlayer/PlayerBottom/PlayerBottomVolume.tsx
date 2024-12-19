import useVideoControl from "@/app/_store/live/useVideoControl";

//볼륨 조절 버튼
const PlayerBottomBolumeControl = () => {
    const { audioTrack, volumeControl } = useVideoControl();

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        volumeControl(newVolume); 
        e.target.style.background = `linear-gradient(to right, #527cdc ${newVolume}%, #e5e5e5 ${newVolume}%)`;
    };

    let volume = audioTrack.volumeLevel;

    return (
        <div className="flex items-center justify-center w-[84px]">
            <input
                type="range" 
                aria-label="볼륨 조절"
                id="volume-range"
                min={0} 
                max={100}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange} //볼륨 조절
                onMouseMove={e => {e.stopPropagation();}} // 이벤트 버블링을 막음 (부모 요소의 move이벤트에 덧 씌워져 슬라이딩이 막힘)
                className="w-full h-[2.3px] mt-[1px] bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-500 "
                style={{ background: `linear-gradient(to right, #527cdc ${Number(volume)}%, #e5e5e5 ${Number(volume)}%)`}}
            />
        </div>
    )
}

export default PlayerBottomBolumeControl;