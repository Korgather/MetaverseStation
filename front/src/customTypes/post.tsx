import { SerializedError } from '@reduxjs/toolkit';
import { IComment } from './comment';
import { IPostUser } from './user';

export interface CustomFile {
  file?: File;
  imagePath: string;
  fileSize: number;
  origFileName: string;
  url?: string;
  preview?: string;
  thumbUrl?: string;
}

export interface IImageList {
  origFileName: string;
  imagePath: string;
  fileSize: number;
}
export interface IPost {
  title?: string;
  content?: string;
  link?: string;
  category?: string;
  id: number;
  tags?: string[];
  imageList: IImageList[];
  postUser: IPostUser;
  postCommentList: IComment[];
  likeUserList: object;
  view: number;
  createdDate: string;
}

export interface AddPost extends Pick<IPost, 'title' | 'link' | 'content'> {
  images?: Omit<CustomFile, 'file'>[];
  id?: string;
  category?: string;
}

export interface IPostDataForUpdate extends Pick<IPost, 'title' | 'link' | 'content'> {
  images: CustomFile[];
  id?: string;
  category: string;
}

export interface IPostState {
  mainPosts: IPost[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: SerializedError | null;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: SerializedError | null;
  updatePostLoading: boolean;
  updatePostDone: boolean;
  updatePostError: SerializedError | null;
  loadPostsLoading: boolean;
  loadPostsError: SerializedError | null;
  postDetail: IPost | null;
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
  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: SerializedError | null;
  searchPostsLoading: boolean;
  searchPostsDone: boolean;
  searchPostsError: SerializedError | null;
  heartPostLoading: boolean;
  heartPostDone: boolean;
  heartPostError: SerializedError | null;
  viewPostLoading: boolean;
  viewPostDone: boolean;
  viewPostError: SerializedError | null;
  deleteAlramLoading: boolean;
  deleteAlramDone: boolean;
  deleteAlramError: SerializedError | null;
  pageNum: number;
  totalPages: number;
  searchPageNum: number;
  searchTotalPages: number;
  prevPostData: IPostDataForUpdate | null;
  searchKeyword: string;
  updateModalState: boolean;
  detailModalState: boolean;
}
