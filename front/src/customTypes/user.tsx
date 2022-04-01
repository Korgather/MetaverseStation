import { SerializedError } from '@reduxjs/toolkit';
import { IPost } from './post';

export interface IUser {
  userName?: string;
  profileImageUrl?: string;
  email?: string;
  providerType?: string;
  userId?: string;
  introduce?: string;
  postList?: IPost[];
  createdAt?: string;
  modifiedAt?: string;
  roleType?: string;
  emailVerifiedYn?: string;
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
  AccessToken: string | null;
}
