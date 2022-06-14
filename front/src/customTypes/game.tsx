import { SerializedError } from '@reduxjs/toolkit';

export interface IMeInOmok {
  nickname: string;
  win: number;
  lose: number;
  id: number;
}
export interface IGameState {
  getMapiaUserCountLoading: boolean;
  getMapiaUserCountDone: boolean;
  getMapiaUserCountError: SerializedError | null;
  signInOmokLoading: boolean;
  signInOmokDone: boolean;
  signInOmokError: SerializedError | null;
  meInOmok: IMeInOmok | null;
}
