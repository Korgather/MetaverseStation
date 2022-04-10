import { SerializedError } from '@reduxjs/toolkit';
import { IComment } from './comment';
import { IPost } from './post';
import { IPostUser } from './user';

export interface ICommunityPost {
  title: string;
  content: string;
  category?: string;
  id: number;
  tags?: string[];
  postUser: IPostUser;
  likeUserList: object;
  createdDate: string;
  view: number;
  postCommentList: IComment[];
}

export interface ICommunityState {
  mainCommunityPosts: ICommunityPost[] | null;
  communityWriteModalState: boolean;
  loadComPostsLoading: boolean;
  loadComPostsDone: boolean;
  loadComPostsError: SerializedError | null;
  addComPostLoading: boolean;
  addComPostDone: boolean;
  addComPostError: SerializedError | null;
  loadComPostLoading: boolean;
  loadComPostDone: boolean;
  loadComPostError: SerializedError | null;
  searchComPostsLoading: boolean;
  searchComPostsDone: boolean;
  searchComPostsError: SerializedError | null;
  comTotalPages: number;
  getSearchInput: string;
  comPostDetail: IPost | null;
}
