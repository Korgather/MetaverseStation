import { SerializedError } from '@reduxjs/toolkit';
import { IPost } from './post';

export interface IUser {
  nickname?: string;
  profile_image?: string;
  email?: string;
  platform_type?: string;
  id?: string;
  myPosts?: IPost[];
}

export interface IUserState {
  me: IUser | null;
  logInLoading: boolean;
  logInError: SerializedError | null;
  logOutLoading: boolean;
  logOutError: SerializedError | null;
}
