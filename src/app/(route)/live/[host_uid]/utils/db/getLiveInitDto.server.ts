import { createClient } from "@/app/_utils/supabase/client";
import { getHostInfoPayload } from "../../liveType";

export const getLiveInitDto = async (id: string): Promise<null | getHostInfoPayload> => {
    const supabase = createClient(); 
    try {
        const { data: roomData, error: roomError } = await supabase
            .from('streaming_rooms')
            .select('*')
            .eq('uid', id);

        if (roomError) {
            console.error("해당 유저의 streaming_rooms이 존재하지 않아요");
            return null; 
        }

        const { data: hostData, error: hostError } = await supabase
            .from('users')
            .select('nickname, profile_img')
            .eq('id', id);

        if (hostError) {
            console.error("호스트의 정보를 찾을 수 없습니다.");
            return null;
        }

        if (roomData && roomData.length > 0 && hostData && hostData.length > 0) {
            return {
                roomInit: roomData[0],
                hostInfo: hostData[0],
            };
        } else {
            console.error(`${id}와 매칭되는 데이터가 없습니다.`);
            return null;
        }
    } catch (error) {
        console.error("알 수 없는 오류", error);
        return null;
    }
};
