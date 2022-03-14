import { SerializedError } from '@reduxjs/toolkit';
import { IComment } from './comment';
import { IUser } from './user';
export interface IPost {
  title?: string;
  content?: string;
  link?: string;
  category?: string;
  id?: string;
  tags?: string[];
  Images?: { src: string }[];
  User?: IUser;
  Comments?: IComment[];
}

export interface IPostState {
  mainPosts: IPost[];
  comments?: IComment[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError?: SerializedError | null;
  loadPostLoading: boolean;
  loadPostError?: SerializedError | null;
  dataForModal?: IPost | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: SerializedError | null;
}
