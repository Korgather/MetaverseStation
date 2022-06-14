import { getMapiaUserCount, signInOmok } from '@actions/game';
import { IGameState, IMeInOmok } from '@customTypes/game';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IGameState = {
  getMapiaUserCountLoading: false,
  getMapiaUserCountDone: false,
  getMapiaUserCountError: null,
  signInOmokLoading: false,
  signInOmokDone: false,
  signInOmokError: null,
  meInOmok: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changeOmokNickname: (state, action) => {
      if (state.meInOmok !== null) {
        state.meInOmok = { ...state.meInOmok, nickname: action.payload };
      }
    },
  },
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
      )
      .addCase(signInOmok.pending, (state) => {
        state.signInOmokLoading = true;
      })
      .addCase(signInOmok.fulfilled, (state, action: PayloadAction<IMeInOmok>) => {
        state.signInOmokDone = true;
        state.signInOmokLoading = false;
        state.meInOmok = action.payload;
      })
      .addCase(signInOmok.rejected, (state, action: ReturnType<typeof signInOmok.rejected>) => {
        state.signInOmokLoading = false;
        state.signInOmokError = action.error;
      }),
});
export const { changeOmokNickname } = gameSlice.actions;
export default gameSlice.reducer;
