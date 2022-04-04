import { SerializedError } from '@reduxjs/toolkit';
import { IComment } from './comment';
import { IPostUser, IUser } from './user';

export interface CustomFile {
  file?: File;
  imagePath: string;
  fileSize: number;
  origFileName: string;
}
export interface IPost {
  title?: string;
  content?: string;
  link?: string;
  category?: string;
  id: string;
  tags?: string[];
  imageList: string[];
  postUser?: IPostUser;
  postCommentList: IComment[];
  likeUserList: object;
  view: number;
}

export interface AddPost extends Pick<IPost, 'title' | 'link' | 'content'> {
  images?: Omit<CustomFile, 'file'>[];
}

export interface IPostDataForUpdate extends AddPost {
  state: boolean;
}

export interface IPostState {
  mainPosts: IPost[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: SerializedError | null;
  loadPostsLoading: boolean;
  loadPostsError: SerializedError | null;
  dataForModal: IPost | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: SerializedError | null;
  removeCommentLoading: boolean;
  removeCommentDone: boolean;
  removeCommentError: SerializedError | null;
  updateCommentLoading: boolean;
  updateCommentDone: boolean;
  updateCommentError: SerializedError | null;
  addReplyLoading: boolean;
  addReplyDone: boolean;
  addReplyError: SerializedError | null;
  removeReplyLoading: boolean;
  removeReplyDone: boolean;
  removeReplyError: SerializedError | null;
  updateReplyLoading: boolean;
  updateReplyDone: boolean;
  updateReplyError: SerializedError | null;
  addNestedReplyLoading: boolean;
  addNestedReplyDone: boolean;
  addNestedReplyError: SerializedError | null;
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: SerializedError | null;
  heartPostLoading: boolean;
  heartPostDone: boolean;
  heartPostError: SerializedError | null;
  viewPostLoading: boolean;
  viewPostDone: boolean;
  viewPostError: SerializedError | null;
  pageNum: number;
  totalPages: number;
  prevPostData: IPostDataForUpdate | null;
  updateModalState: boolean;
}
