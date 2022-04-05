import { changeNickName, loadLikedPosts, loadMyInfo, loadMyPosts, logOut } from '@actions/user';
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
  loadLikedPostsLoading: false,
  loadLikedPostsDone: false,
  loadLikedPostsError: null,
  loadMyPostsLoading: false,
  loadMyPostsDone: false,
  loadMyPostsError: null,
  AccessToken: '',
  myLikedPosts: null,
  myPosts: null,
  likedPostPageNum: 1,
  likedPostTotalPages: 1,
  myPostPageNum: 1,
  myPostTotalPages: 1,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      state.AccessToken = action.payload;
    },
    getlikedPostPageNum: (state, action) => {
      state.likedPostPageNum = action.payload;
    },
    getlikedPostTotalPages: (state, action) => {
      state.likedPostTotalPages = action.payload;
    },
    getmyPostPageNum: (state, action) => {
      state.myPostPageNum = action.payload;
    },
    getmyPostTotalPages: (state, action) => {
      state.myPostTotalPages = action.payload;
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
      )
      .addCase(loadLikedPosts.pending, (state) => {
        state.loadLikedPostsLoading = true;
      })
      .addCase(loadLikedPosts.fulfilled, (state, action) => {
        state.loadLikedPostsLoading = false;
        if (state.me !== null) {
          state.myLikedPosts = action.payload;
        }
      })
      .addCase(
        loadLikedPosts.rejected,
        (state, action: ReturnType<typeof loadLikedPosts.rejected>) => {
          state.loadLikedPostsLoading = false;
          state.loadLikedPostsError = action.error;
        },
      )
      .addCase(loadMyPosts.pending, (state) => {
        state.loadMyPostsLoading = true;
      })
      .addCase(loadMyPosts.fulfilled, (state, action) => {
        state.loadMyPostsLoading = false;
        if (state.me !== null) {
          state.myPosts = action.payload;
        }
      })
      .addCase(loadMyPosts.rejected, (state, action: ReturnType<typeof loadMyPosts.rejected>) => {
        state.loadMyPostsLoading = false;
        state.loadMyPostsError = action.error;
      }),
});
export const {
  saveAccessToken,
  getlikedPostPageNum,
  getlikedPostTotalPages,
  getmyPostPageNum,
  getmyPostTotalPages,
} = userSlice.actions;
export default userSlice.reducer;
