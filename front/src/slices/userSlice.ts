import { loadMyInfo, logIn, logOut } from '@actions/user';
import { IUserState } from '@customTypes/user';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: IUserState = {
  me: null,
  logInLoading: false,
  logInError: null,
  logOutLoading: false,
  logOutError: null,
  loadMyInfoLoading: false, // 유저 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(logIn.pending, (state) => {
        state.logInLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.logInLoading = false;
        state.me = action.payload;
      })
      .addCase(logIn.rejected, (state, action: ReturnType<typeof logIn.rejected>) => {
        state.logInLoading = false;
        state.logInError = action.error;
      })
      .addCase(logOut.pending, (state) => {
        state.logOutLoading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.logOutLoading = false;
        state.me = null;
      })
      .addCase(logOut.rejected, (state, action: ReturnType<typeof logOut.rejected>) => {
        state.logOutLoading = false;
        state.logOutError = action.error;
      })
      .addCase(loadMyInfo.pending, (state) => {
        state.loadMyInfoLoading = true;
      })
      .addCase(loadMyInfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false;
        console.log(action.payload);
        if (action.payload !== null) state.me = action.payload;
      })
      .addCase(loadMyInfo.rejected, (state, action: ReturnType<typeof loadMyInfo.rejected>) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.error;
      }),
});

export default userSlice.reducer;
