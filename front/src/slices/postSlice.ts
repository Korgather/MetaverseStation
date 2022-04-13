import {
  addComment,
  addPost,
  addReply,
  heartPost,
  loadPost,
  loadPosts,
  updatePost,
  removeComment,
  removeReply,
  updateComment,
  updateReply,
  removePost,
  searchPosts,
  deleteAlram,
  addFeedBack,
} from '@actions/post';
import { IPostState } from '@customTypes/post';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IPostState = {
  mainPosts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,

  loadPostsLoading: false,
  loadPostsError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  removeCommentLoading: false,
  removeCommentDone: false,
  removeCommentError: null,

  updateCommentLoading: false,
  updateCommentDone: false,
  updateCommentError: null,

  addReplyLoading: false,
  addReplyDone: false,
  addReplyError: null,

  removeReplyLoading: false,
  removeReplyDone: false,
  removeReplyError: null,

  updateReplyLoading: false,
  updateReplyDone: false,
  updateReplyError: null,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  searchPostsLoading: false,
  searchPostsDone: false,
  searchPostsError: null,

  heartPostLoading: false,
  heartPostDone: false,
  heartPostError: null,

  viewPostLoading: false,
  viewPostDone: false,
  viewPostError: null,

  deleteAlramLoading: false,
  deleteAlramDone: false,
  deleteAlramError: null,

  addFeedBackLoading: false,
  addFeedBackDone: false,
  addFeedBackError: null,

  postDetail: null,
  pageNum: 0,
  totalPages: 1,
  searchPageNum: 0,
  searchTotalPages: 1,
  prevPostData: null,
  updateModalState: false,
  detailModalState: false,
  searchKeyword: '',
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    getTotalPage: (state, action) => {
      state.totalPages = action.payload;
    },
    getSearchPageNum: (state, action) => {
      state.searchPageNum = action.payload;
    },
    getSearchTotalPage: (state, action) => {
      state.searchTotalPages = action.payload;
    },
    getPrevPostData: (state, action) => {
      state.prevPostData = action.payload;
    },
    getSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    ToggleWriteModalState: (state, action) => {
      state.updateModalState = action.payload;
      // action.payload === true
      //   ? (document.body.style.overflow = 'hidden')
      //   : (document.body.style.overflow = 'unset');
    },
    ToggleDetailState: (state, action) => {
      state.detailModalState = action.payload;
    },
    clearpostDetail: (state) => {
      state.postDetail = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.addPostDone = true;
        state.addPostLoading = false;
      })
      .addCase(addPost.rejected, (state, action: ReturnType<typeof addPost.rejected>) => {
        state.addPostLoading = false;
        state.addPostError = action.error;
      })
      .addCase(removePost.pending, (state) => {
        state.removePostLoading = true;
      })
      .addCase(removePost.fulfilled, (state) => {
        state.removePostDone = true;
        state.removePostLoading = false;
      })
      .addCase(removePost.rejected, (state, action: ReturnType<typeof removePost.rejected>) => {
        state.removePostLoading = false;
        state.removePostError = action.error;
      })

      .addCase(updatePost.pending, (state) => {
        state.updatePostLoading = true;
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.updatePostDone = true;
        state.updatePostLoading = false;
      })
      .addCase(updatePost.rejected, (state, action: ReturnType<typeof updatePost.rejected>) => {
        state.updatePostLoading = false;
        state.updatePostError = action.error;
      })

      .addCase(loadPosts.pending, (state) => {
        state.loadPostsLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadPostsLoading = false;
        state.mainPosts = action.payload.content;
      })
      .addCase(loadPosts.rejected, (state, action: ReturnType<typeof loadPosts.rejected>) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error;
      })
      .addCase(loadPost.pending, (state) => {
        state.loadPostLoading = true;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.loadPostLoading = false;
        state.postDetail = action.payload;
      })
      .addCase(loadPost.rejected, (state, action: ReturnType<typeof loadPost.rejected>) => {
        state.loadPostLoading = false;
        state.loadPostError = action.error;
      })
      .addCase(searchPosts.pending, (state) => {
        state.searchPostsLoading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.searchPostsLoading = false;
        state.mainPosts = action.payload.content;
      })
      .addCase(searchPosts.rejected, (state, action: ReturnType<typeof searchPosts.rejected>) => {
        state.searchPostsLoading = false;
        state.searchPostsError = action.error;
      })
      .addCase(heartPost.pending, (state) => {
        state.heartPostLoading = true;
      })
      .addCase(heartPost.fulfilled, (state) => {
        state.heartPostLoading = false;
      })
      .addCase(heartPost.rejected, (state, action: ReturnType<typeof heartPost.rejected>) => {
        state.heartPostLoading = false;
        state.heartPostError = action.error;
      })
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.addCommentDone = true;
        state.addCommentLoading = false;
      })
      .addCase(addComment.rejected, (state, action: ReturnType<typeof addComment.rejected>) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error;
      })
      .addCase(removeComment.pending, (state) => {
        state.removeCommentLoading = true;
      })
      .addCase(removeComment.fulfilled, (state) => {
        state.removeCommentDone = true;
        state.removeCommentLoading = false;
      })
      .addCase(
        removeComment.rejected,
        (state, action: ReturnType<typeof removeComment.rejected>) => {
          state.removeCommentLoading = false;
          state.removeCommentError = action.error;
        },
      )
      .addCase(updateComment.pending, (state) => {
        state.updateCommentLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.updateCommentDone = true;
        state.updateCommentLoading = false;
      })
      .addCase(
        updateComment.rejected,
        (state, action: ReturnType<typeof updateComment.rejected>) => {
          state.updateCommentLoading = false;
          state.updateCommentError = action.error;
        },
      )
      .addCase(addReply.pending, (state) => {
        state.addReplyLoading = true;
      })
      .addCase(addReply.fulfilled, (state, action) => {
        state.addReplyDone = true;
        state.addReplyLoading = false;
      })
      .addCase(addReply.rejected, (state, action: ReturnType<typeof addReply.rejected>) => {
        state.addReplyLoading = false;
        state.addReplyError = action.error;
      })
      .addCase(removeReply.pending, (state) => {
        state.removeReplyLoading = true;
      })
      .addCase(removeReply.fulfilled, (state, action) => {
        state.removeReplyDone = true;
        state.removeReplyLoading = false;
      })
      .addCase(removeReply.rejected, (state, action: ReturnType<typeof removeReply.rejected>) => {
        state.removeReplyLoading = false;
        state.removeReplyError = action.error;
      })
      .addCase(updateReply.pending, (state) => {
        state.updateReplyLoading = true;
      })
      .addCase(updateReply.fulfilled, (state, action) => {
        state.updateReplyDone = true;
        state.updateReplyLoading = false;
      })
      .addCase(updateReply.rejected, (state, action: ReturnType<typeof updateReply.rejected>) => {
        state.updateReplyLoading = false;
        state.updateReplyError = action.error;
      })
      .addCase(deleteAlram.pending, (state) => {
        state.deleteAlramLoading = true;
      })
      .addCase(deleteAlram.fulfilled, (state, action) => {
        state.deleteAlramDone = true;
        state.deleteAlramLoading = false;
      })
      .addCase(deleteAlram.rejected, (state, action: ReturnType<typeof deleteAlram.rejected>) => {
        state.deleteAlramLoading = false;
        state.deleteAlramError = action.error;
      })
      .addCase(addFeedBack.pending, (state) => {
        state.addFeedBackLoading = true;
      })
      .addCase(addFeedBack.fulfilled, (state, action) => {
        state.addFeedBackDone = true;
        state.addFeedBackLoading = false;
      })
      .addCase(addFeedBack.rejected, (state, action: ReturnType<typeof addFeedBack.rejected>) => {
        state.addFeedBackLoading = false;
        state.addFeedBackError = action.error;
      }),
});

export const {
  getPageNum,
  getTotalPage,
  getPrevPostData,
  ToggleWriteModalState,
  clearpostDetail,
  getSearchPageNum,
  getSearchTotalPage,
  getSearchKeyword,
  ToggleDetailState,
} = postSlice.actions;
export default postSlice.reducer;
