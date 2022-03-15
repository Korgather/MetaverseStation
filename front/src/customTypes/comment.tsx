import { SerializedError } from '@reduxjs/toolkit';
import { IUser } from './user';

export interface IReply {
  content?: string;
  user_id?: string;
  created_at?: string;
  User?: IUser;
  postid?: string;
  commentid?: string;
  id: string;
}

export interface IComment {
  created_at?: string;
  content?: string;
  id?: string;
  replies?: IReply[];
  User?: IUser;
  postid?: string;
}

export interface ICommentState {
  comments: IComment[];
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: SerializedError | null;
}
