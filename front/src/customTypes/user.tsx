import { SerializedError } from "@reduxjs/toolkit";
import { IPost } from "./post";

export interface IUser {
  username?: string;
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

export interface IUserState {
  me: IUser | null;
  logOutLoading: boolean;
  logOutError: SerializedError | null;
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: SerializedError | null;
}
