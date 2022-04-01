import { changeNickName, loadMyInfo, logOut } from '@actions/user';
import { IUserState } from '@customTypes/user';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: IUserState = {
  me: null,
  logOutLoading: false,
  logOutError: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  changeNickNameLoading: false,
  changeNickNameDone: false,
  changeNickNameError: null,
  AccessToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      state.AccessToken = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
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
        if (action.payload !== null) state.me = action.payload;
      })
      .addCase(loadMyInfo.rejected, (state, action: ReturnType<typeof loadMyInfo.rejected>) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.error;
      })
      .addCase(changeNickName.pending, (state) => {
        state.changeNickNameLoading = true;
      })
      .addCase(changeNickName.fulfilled, (state, action) => {
        state.changeNickNameLoading = false;
        if (state.me !== null) {
          state.me.userName = action.payload;
        }
      })
      .addCase(
        changeNickName.rejected,
        (state, action: ReturnType<typeof changeNickName.rejected>) => {
          state.changeNickNameLoading = false;
          state.changeNickNameError = action.error;
        },
      ),
});
export const { saveAccessToken } = userSlice.actions;
export default userSlice.reducer;
