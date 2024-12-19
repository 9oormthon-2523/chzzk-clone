//비디오 비율 구하는 함수
export const getVideoRatio = (w:number, h:number, type: "empty"|"total") => {
    if (type === "total") return w / h;

    return h / w;
}