import { SerializedError } from "@reduxjs/toolkit";
import { IComment } from "./comment";
import { IUser } from "./user";

export interface CustomFile {
  file: File;
  imagePath: string;
  fileSize: number;
  origFileName: string;
}
export interface IPost {
  title?: string;
  content?: string;
  link?: string;
  category?: string;
  id?: string;
  tags?: string[];
  Images?: { src: string }[];
  User?: IUser;
  Comments: IComment[];
}

export interface AddPost extends Pick<IPost, "title" | "link" | "content"> {
  images?: Omit<CustomFile, "file">[];
  author?: string;
}

export interface IPostState {
  mainPosts: IPost[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: SerializedError | null;
  addImageLoading: boolean;
  addImageDone: boolean;
  addImageError: SerializedError | null;
  loadPostLoading: boolean;
  loadPostError: SerializedError | null;
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
}
