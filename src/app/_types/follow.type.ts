import { ISODate } from './ISODate.type';

export interface FollowInfo {
  id: number;
  created_at: ISODate;
  status: 'active' | 'block';
  follower: Follower;
}

export interface Follower {
  uid: string;
  nickname: string;
  profile_img: string;
  is_following_user: boolean;
}
