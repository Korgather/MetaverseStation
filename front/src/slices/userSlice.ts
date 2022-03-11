import { logIn, logOut } from '@actions/user';
import { IUserState } from '@customTypes/user';
import { createSlice } from '@reduxjs/toolkit';

export const initialState: IUserState = {
  me: null,
  logInLoading: false,
  logInError: null,
  logOutLoading: false,
  logOutError: null,
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
      }),
});

export default userSlice.reducer;
