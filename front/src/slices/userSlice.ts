import {
  changeNickName,
  loadAuthorLikedPosts,
  loadAuthorPosts,
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
  loadAuthorLikedPostsLoading: false,
  loadAuthorLikedPostsDone: false,
  loadAuthorLikedPostsError: null,
  loadAuthorPostsLoading: false,
  loadAuthorPostsDone: false,
  loadAuthorPostsError: null,
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
    getAuthorlikedPostPageNum: (state, action) => {
      state.likedPostPageNum = action.payload;
    },
    getAuthorlikedPostTotalPages: (state, action) => {
      state.likedPostTotalPages = action.payload;
    },
    getAuthorPostPageNum: (state, action) => {
      state.myPostPageNum = action.payload;
    },
    getAuthorPostTotalPages: (state, action) => {
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
      })
      .addCase(loadAuthorLikedPosts.pending, (state) => {
        state.loadAuthorLikedPostsLoading = true;
      })
      .addCase(loadAuthorLikedPosts.fulfilled, (state, action) => {
        state.loadAuthorLikedPostsLoading = false;
        if (state.me !== null) {
          state.authorLikedPosts = action.payload;
        }
      })
      .addCase(
        loadAuthorLikedPosts.rejected,
        (state, action: ReturnType<typeof loadAuthorLikedPosts.rejected>) => {
          state.loadAuthorLikedPostsLoading = false;
          state.loadAuthorLikedPostsError = action.error;
        },
      )
      .addCase(loadAuthorPosts.pending, (state) => {
        state.loadAuthorPostsLoading = true;
      })
      .addCase(loadAuthorPosts.fulfilled, (state, action) => {
        state.loadAuthorPostsLoading = false;
        if (state.me !== null) {
          state.authorPosts = action.payload;
        }
      })
      .addCase(
        loadAuthorPosts.rejected,
        (state, action: ReturnType<typeof loadAuthorPosts.rejected>) => {
          state.loadAuthorPostsLoading = false;
          state.loadAuthorPostsError = action.error;
        },
      ),
});
export const {
  saveAccessToken,
  getlikedPostPageNum,
  getlikedPostTotalPages,
  getmyPostPageNum,
  getmyPostTotalPages,
  getAuthorInfo,
  clearAuthorInfo,
  getAuthorPostTotalPages,
  getAuthorPostPageNum,
  getAuthorlikedPostTotalPages,
  getAuthorlikedPostPageNum,
  logOut,
  clearAccessToken,
} = userSlice.actions;
export default userSlice.reducer;
