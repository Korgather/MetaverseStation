import { SerializedError } from '@reduxjs/toolkit';

export interface IGameState {
  getMapiaUserCountLoading: boolean;
  getMapiaUserCountDone: boolean;
  getMapiaUserCountError: SerializedError | null;
}
