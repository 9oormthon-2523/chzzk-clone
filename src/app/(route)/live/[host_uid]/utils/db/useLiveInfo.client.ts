import { createClient } from "@/app/_utils/supabase/client"
import { useEffect, useRef, useState } from "react"

/**
 * streaming_rooms데이터를 구독하는 기능 최대 최대 3회 재시도
 * 실패 해도 스트리밍 기능은 작동함
 */

interface useLiveInfoPayload {
    host_uid:string
    title:string|null
    is_active:boolean
    audience_cnt:number
    category:string|null
    tags:string[]|null
}

const useLiveInfo = (init:useLiveInfoPayload) => {
    const supabase = createClient();
    const { host_uid } = init;

    const [tags, setTags] = useState<string[]>([...init.tags || ""]);
    const [category, setCategory] = useState<string|null>(init.category ?? "");
    const [is_active, setIs_active] = useState<boolean>(init.is_active);
    const [title, setTitle] = useState<string|null>(init.title ?? "방송 OFF");
    
    const [audience_cnt, setAudience_cnt] = useState<number>(init.audience_cnt);

    const LIMITCNT = 3;
    const linkLimit = useRef<number>(0);
    
    useEffect(() => {

        const subscribeToRealtime = () => {
            const getRoomDto = supabase
                .channel("streaming-room-updates")
                .on(
                    "postgres_changes",
                    { event: "UPDATE", schema: "public", table: "streaming_rooms", filter: `uid=eq.${host_uid}`, },
                    (payload) => {
                        try {
                            if (payload.new.title !== payload.old.title) {
                                setTitle(payload.new.title||"");
                            }

                            if (payload.new.is_active !== payload.old.is_active) {
                                setIs_active(payload.new.is_active);
                            }

                            if (payload.new.audience_cnt !== payload.old.audience_cnt) {
                                setAudience_cnt(payload.new.audience_cnt);
                            }

                            if (payload.new.category !== payload.old.category) {
                                setCategory(payload.new.category || "");
                            }

                            if (payload.new.tags !== payload.old.tags) {
                                if(!Array.isArray(payload.new.tags)) return;
                                    setTags([...payload.new.tags]);     
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
        tags,
        title,
        category,
        is_active,
        audience_cnt
    }
    
}

export default useLiveInfo;