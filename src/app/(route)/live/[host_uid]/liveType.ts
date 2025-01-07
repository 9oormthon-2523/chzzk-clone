export type getRoomDtoType = {
    room_id: string
    uid:string
    title:string | null
    start_time: number | null
    is_active:boolean
    audience_cnt:number
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