import { getMapiaUserCount } from '@actions/game';
import { IGameState } from '@customTypes/game';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IGameState = {
  getMapiaUserCountLoading: false,
  getMapiaUserCountDone: false,
  getMapiaUserCountError: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getMapiaUserCount.pending, (state) => {
        state.getMapiaUserCountLoading = true;
      })
      .addCase(getMapiaUserCount.fulfilled, (state) => {
        state.getMapiaUserCountDone = true;
        state.getMapiaUserCountLoading = false;
      })
      .addCase(
        getMapiaUserCount.rejected,
        (state, action: ReturnType<typeof getMapiaUserCount.rejected>) => {
          state.getMapiaUserCountLoading = false;
          state.getMapiaUserCountError = action.error;
        },
      ),
});

export default gameSlice.reducer;
