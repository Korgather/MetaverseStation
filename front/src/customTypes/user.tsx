import { SerializedError } from '@reduxjs/toolkit';

export interface IUser {
  nickname: string;
  profile_image?: string;
  email?: string;
  platform_type?: string;
  id?: string;
}

export interface IUserState {
  me: IUser | null;
  logInLoading: boolean;
  logInError: SerializedError | null;
  logOutLoading: boolean;
  logOutError: SerializedError | null;
}
