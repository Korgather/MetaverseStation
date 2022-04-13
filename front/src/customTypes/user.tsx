import { SerializedError } from '@reduxjs/toolkit';
import { IPost } from './post';

export interface IUser {
  userName?: string;
  profileImageUrl?: string;
  email?: string;
  providerType?: string;
  userId: number;
  introduce?: string;
  postList?: IPost[];
  createdAt?: string;
  modifiedAt?: string;
  roleType?: string;
  emailVerifiedYn?: string;
  userNameModifiedYn: string;
  bio?: string;
  notificationResponseDtoList: notification[];
}

export interface IAuthorInfo {
  bio: string;
  profileImageUrl: string;
  username: string;
  userId: number;
}

export interface IAuthor {
  info: IAuthorInfo;
  likedPosts: IPost[];
  myPosts: IPost[];
}

export interface notification {
  notificationId: number;
  pub_username: string;
  postId: number;
  postTitle: string;
}

export interface IPostUser extends Pick<IUser, 'email' | 'roleType'> {
  username: string;
  userId: number;
  bio: string;
  profileImageUrl: string;
}

export interface IupdateProfile {
  username: string | undefined;
  bio: string | undefined;
  profileImageUrl: string | undefined;
}

export interface IUserState {
  me: IUser | null;
  logOutLoading: boolean;
  logOutError: SerializedError | null;
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: SerializedError | null;
  changeNickNameLoading: boolean;
  changeNickNameDone: boolean;
  changeNickNameError: SerializedError | null;
  updateProfileLoading: boolean;
  updateProfileDone: boolean;
  updateProfileError: SerializedError | null;
  loadLikedPostsLoading: boolean;
  loadLikedPostsDone: boolean;
  loadLikedPostsError: SerializedError | null;
  loadMyPostsLoading: boolean;
  loadMyPostsDone: boolean;
  loadMyPostsError: SerializedError | null;

  AccessToken: string | null;
  myLikedPosts: IPost[] | null;
  myPosts: IPost[] | null;
  authorLikedPosts: IPost[] | null;
  authorPosts: IPost[] | null;
  likedPostPageNum: number;
  likedPostTotalPages: number;
  myPostPageNum: number;
  myPostTotalPages: number;
  authorInfo: IAuthorInfo | null;
}
