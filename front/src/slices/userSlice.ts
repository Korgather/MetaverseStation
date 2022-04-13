import {
  changeNickName,
  loadLikedPosts,
  loadMyInfo,
  loadMyPosts,
  updateProfile,
} from '@actions/user';
import { IAuthorInfo, IUserState } from '@customTypes/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  updateProfileLoading: false,
  updateProfileDone: false,
  updateProfileError: null,
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
  authorInfo: null,
  authorLikedPosts: null,
  authorPosts: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      state.AccessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.AccessToken = '';
    },
    getlikedPostTotalPages: (state, action) => {
      state.likedPostTotalPages = action.payload;
    },
    getmyPostTotalPages: (state, action) => {
      state.myPostTotalPages = action.payload;
    },

    getAuthorInfo: (state, action: PayloadAction<IAuthorInfo>) => {
      state.authorInfo = action.payload;
    },
    clearAuthorInfo: (state) => {
      state.authorInfo = null;
    },
    logOut: (state) => {
      state.AccessToken = null;
      state.me = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loadMyInfo.pending, (state) => {
        state.loadMyInfoLoading = true;
      })
      .addCase(loadMyInfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false;
        state.me = action.payload;
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
      })
      .addCase(
        changeNickName.rejected,
        (state, action: ReturnType<typeof changeNickName.rejected>) => {
          state.changeNickNameLoading = false;
          state.changeNickNameError = action.error;
        },
      )
      .addCase(updateProfile.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateProfileLoading = false;
      })
      .addCase(
        updateProfile.rejected,
        (state, action: ReturnType<typeof updateProfile.rejected>) => {
          state.updateProfileLoading = false;
          state.updateProfileError = action.error;
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
          state.myPosts = action.payload.content;
          state.myPostTotalPages = action.payload.totalPages;
        }
      })
      .addCase(loadMyPosts.rejected, (state, action: ReturnType<typeof loadMyPosts.rejected>) => {
        state.loadMyPostsLoading = false;
        state.loadMyPostsError = action.error;
      }),
});
export const {
  saveAccessToken,
  getlikedPostTotalPages,
  getmyPostTotalPages,
  getAuthorInfo,
  clearAuthorInfo,
  logOut,
  clearAccessToken,
} = userSlice.actions;
export default userSlice.reducer;
