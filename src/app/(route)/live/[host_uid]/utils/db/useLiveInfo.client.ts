import { createClient } from "@/app/_utils/supabase/client"
import { useEffect, useRef, useState } from "react"

interface useLiveInfoPayload {
    host_uid:string
    title:string|null
    is_active:boolean
    audience_cnt:number
}

/**
 * streaming_rooms데이터를 구독하는 기능 최대
 * 최대 3회 재시도
 */

const useLiveInfo = (init:useLiveInfoPayload) => {
    const supabase = createClient();
    const [title, setTitle] = useState<string|null>(init.title ?? "방송 OFF");
    const [is_active, setIs_active] = useState<boolean>(init.is_active);
    const [audience_cnt, setAudience_cnt] = useState<number>(init.audience_cnt);

    const LIMITCNT = 3;
    const linkLimit = useRef<number>(0);

    useEffect(() => {
        const subscribeToRealtime = () => {
            const getRoomDto = supabase
                .channel("streaming-room-updates")
                .on(
                    "postgres_changes",
                    { event: "UPDATE", schema: "public", table: "streaming_rooms" },
                    (payload) => {
                        try {
                            if (payload.new.title !== payload.old.title) {
                                setTitle(payload.new.title);
                                // console.log("제목 변경", payload.new.title);
                            }
                            if (payload.new.is_active !== payload.old.is_active) {
                                setIs_active(payload.new.is_active);
                                // console.log("방송 상태 변경", payload.new.is_active);
                            }
                            if (payload.new.audience_cnt !== payload.old.audience_cnt) {
                                setAudience_cnt(payload.new.audience_cnt);
                                // console.log("시청자 수 변경:", payload.new.audience_cnt);
                            }
                        } catch (error) {
                            console.error("실시간 데이터 처리 중 오류 발생:", error);
                        }
                    }
                )
                .subscribe((status) => {
                    if (status === "SUBSCRIBED") {
                        console.log("실시간 데이터 연결 성공");
                    } else if (status === "TIMED_OUT" || status === "CLOSED") {
                        linkLimit.current++;
                        console.error("리얼타임 구독 실패 또는 연결 종료:", status);
                        if (linkLimit.current < LIMITCNT) {
                            setTimeout(() => {
                                console.log("실시간 연결 재시도...");
                                subscribeToRealtime();
                            }, 5000); 
                        }
                    }
                });
    
            return getRoomDto;
        };
    
        const getRoomDto = subscribeToRealtime();
    
        return () => {
            supabase.removeChannel(getRoomDto);
        };
    }, []);

    return {
        title,
        is_active,
        audience_cnt
    }
    
}

export default useLiveInfo;