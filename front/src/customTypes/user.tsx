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
}

export interface IPostUser extends Pick<IUser, 'profileImageUrl' | 'email' | 'roleType'> {
  username: string;
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
  loadLikedPostsLoading: boolean;
  loadLikedPostsDone: boolean;
  loadLikedPostsError: SerializedError | null;
  loadMyPostsLoading: boolean;
  loadMyPostsDone: boolean;
  loadMyPostsError: SerializedError | null;
  AccessToken: string | null;
  myLikedPosts: IPost[] | null;
  myPosts: IPost[] | null;
  likedPostPageNum: number;
  likedPostTotalPages: number;
  myPostPageNum: number;
  myPostTotalPages: number;
}
