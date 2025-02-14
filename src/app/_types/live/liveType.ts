export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// PR 전이라 임시 type 가져옴옴
export type Database = {
  public: {
    Tables: {
      streaming_rooms: {
        Row: {
          audience_cnt: number
          category: string | null
          is_active: boolean
          nickname: string | null
          start_time: string | null
          tags: string[]
          thumbnail: string | null
          title: string | null
          uid: string
        }
        Insert: {
          audience_cnt?: number
          category?: string | null
          is_active?: boolean
          nickname?: string | null
          start_time?: string | null
          tags?: string[]
          thumbnail?: string | null
          title?: string | null
          uid: string
        }
        Update: {
          audience_cnt?: number
          category?: string | null
          is_active?: boolean
          nickname?: string | null
          start_time?: string | null
          tags?: string[]
          thumbnail?: string | null
          title?: string | null
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaming_rooms_uid_fkey1"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "follower_details"
            referencedColumns: ["follower_uid"]
          },
          {
            foreignKeyName: "streaming_rooms_uid_fkey1"
            columns: ["uid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          channel_intro: string | null
          created_at: string
          email: string | null
          id: string
          nickname: string | null
          profile_img: string | null
        }
        Insert: {
          channel_intro?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nickname?: string | null
          profile_img?: string | null
        }
        Update: {
          channel_intro?: string | null
          created_at?: string
          email?: string | null
          id?: string
          nickname?: string | null
          profile_img?: string | null
        }
        Relationships: []
      }
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// 스트리밍 룸 DTO_TYPE
export type StreamingRoomState = 
    Database["public"]["Tables"]["streaming_rooms"]["Row"];

// 호스트 DTO_TYPE
export type HostInfoState = 
    Pick<Database["public"]["Tables"]["users"]["Row"], "id" | "profile_img" | "nickname">;

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