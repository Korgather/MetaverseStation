import { IUser } from './user';

export interface IReply {
  content?: string;
  user_id?: string;
  created_at?: string;
  User: IUser | null;
  postid: string | undefined;
  commentid: string | undefined;
  id?: string;
}

export interface IComment {
  createdDate?: string | Date;
  content?: string;
  id?: string;
  replies: IReply[];
  userId: string;
  profileImageUrl: string;
  postid?: string;
  username: string;
}

export interface AddReply {
  content: string;
  postid: string | undefined;
  User: IUser | null;
  id: string;
  AccessToken: string | null;
}

export type IUpdateReply = Omit<IReply, 'User'>;
export type IUpdateComment = Omit<IComment, 'replies' | 'userId' | 'profileImageUrl' | 'username'>;
