import { SerializedError } from '@reduxjs/toolkit';
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
  created_at?: string;
  content?: string;
  id?: string;
  replies: IReply[];
  User?: IUser;
  postid?: string;
}

export type IUpdateReply = Omit<IReply, 'User'>;
export type IUpdateComment = Omit<IComment, 'replies'>;
