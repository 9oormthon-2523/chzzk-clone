import { ISODate } from './ISODate.type';

export interface FollowInfo {
  id: number;
  created_at: ISODate;
  status: 'active' | 'block';
  follower: {
    uid: string;
    nickname: string;
    profile_img: string;
  };
}