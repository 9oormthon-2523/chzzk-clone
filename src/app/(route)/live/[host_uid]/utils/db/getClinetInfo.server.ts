import { createClient } from "@/app/_utils/supabase/client"; 

/** 
 * 라이브 페이지 초기 데이터 가져오기 (시청자)
 * */ 


const getClientInfo = async () => {
    const supabase = await createClient();

    try {
        const { data, error } = await supabase.auth.getUser();
        console.log(data)

        if (error) {
            console.log("아이디가 존재하지 않습니다."); 
            return undefined;
        }

        if (!data?.user?.id) {
            console.log('아이디가 존재하지 않습니다');
            return undefined;
        }

        return data.user.id;

    } catch (err) {
        console.log('비 로그인'); 
        return undefined;
    }
};

export default getClientInfo;