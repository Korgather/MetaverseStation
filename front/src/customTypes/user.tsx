import { SerializedError } from '@reduxjs/toolkit';
import { string } from 'yup';
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
}

export interface IPostUser extends Pick<IUser, 'profileImageUrl' | 'email' | 'roleType'> {
  username: string;
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
  likedPostPageNum: number;
  likedPostTotalPages: number;
  myPostPageNum: number;
  myPostTotalPages: number;
}
