import { SerializedError } from "@reduxjs/toolkit";
import { IPost } from "./post";

export interface IUser {
  username?: string;
  profileImageUrl?: string;
  email?: string;
  providerType?: string;
  userId?: string;
  introduce?: string;
  myPosts?: IPost[];
  createdAt?: string;
  modifiedAt?: string;
  roleType?: string;
}

export interface IUserState {
  me: IUser | null;
  logInLoading: boolean;
  logInError: SerializedError | null;
  logOutLoading: boolean;
  logOutError: SerializedError | null;
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: SerializedError | null;
}
