import { SerializedError } from '@reduxjs/toolkit';
import { IUser } from './user';

export interface reply {
  content?: string;
  user_id?: string;
  created_at?: string;
  User?: IUser;
}

export interface IComment {
  created_at?: string;
  content?: string;
  id?: string;
  replies?: reply[];
  User?: IUser;
  postid?: string;
}

export interface ICommentState {
  comments: IComment[];
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: SerializedError | null;
}
