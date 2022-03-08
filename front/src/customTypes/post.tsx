import { SerializedError } from '@reduxjs/toolkit';

export interface IPost {
  title: string;
  content: string;
  link: string;
  category: string;
  user_id?: string;
  tags?: string[];
  images?: File[];
}

export interface IPostState {
  mainPosts: IPost[];
  loading: boolean;
  done: boolean;
  error?: SerializedError | null;
}
