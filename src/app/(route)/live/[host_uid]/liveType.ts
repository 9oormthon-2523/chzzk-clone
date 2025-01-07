export type getRoomDtoType = {
    uid:string
    title:string | null
    start_time: string | null
    is_active:boolean
    audience_cnt:number
    category:string
    tags:string[]
}

export type getHostInfoType = {
    nickname:string
    profile_img:string|null
}

export interface getHostInfoPayload {
    roomInit:getRoomDtoType
    hostInfo:getHostInfoType
}

export interface RoomHostProfile {
    
}