import {
  addComment,
  addPost,
  addReply,
  loadPost,
  removeComment,
  removeReply,
  updateComment,
  updateReply,
} from '@actions/post';
import { IComment } from '@customTypes/comment';
import { IPost, IPostState } from '@customTypes/post';
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IPostState = {
  mainPosts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addImageLoading: false,
  addImageDone: false,
  addImageError: null,
  loadPostLoading: false,
  loadPostError: null,
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
  addNestedReplyLoading: false,
  addNestedReplyDone: false,
  addNestedReplyError: null,
  dataForModal: null,
  pageNum: 0,
  totalPages: 1,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getDataForModal: (state, action) => {
      state.dataForModal = action.payload;
    },
    getPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    getTotalPage: (state, action) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addPost.pending, (state) => {
        state.addPostLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addPostDone = true;
        state.addPostLoading = false;
        state.mainPosts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action: ReturnType<typeof addPost.rejected>) => {
        state.addPostLoading = false;
        state.addPostError = action.error;
      })
      .addCase(loadPost.pending, (state) => {
        state.loadPostLoading = true;
      })
      .addCase(loadPost.fulfilled, (state, action: AnyAction) => {
        state.loadPostLoading = false;
        // state.mainPosts.push(action.payload);
        state.mainPosts = action.payload.content;
      })
      .addCase(loadPost.rejected, (state, action: ReturnType<typeof loadPost.rejected>) => {
        state.loadPostLoading = false;
        state.loadPostError = action.error;
      })
      .addCase(addComment.pending, (state) => {
        state.addCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action: AnyAction) => {
        state.addCommentDone = true;
        state.addCommentLoading = false;
        const post = state.mainPosts.find((post) => post.id === action.payload.postid);
        post?.postCommentList?.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action: ReturnType<typeof addComment.rejected>) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error;
      })
      .addCase(removeComment.pending, (state) => {
        state.removeCommentLoading = true;
      })
      .addCase(removeComment.fulfilled, (state, action: PayloadAction<IComment | undefined>) => {
        state.removeCommentDone = true;
        state.removeCommentLoading = false;
        const postIdx = state.mainPosts.findIndex(
          (post) => action.payload && post.id === action.payload.postid,
        );
        state.mainPosts[postIdx].postCommentList = state.mainPosts[postIdx].postCommentList?.filter(
          (comment) => comment.id !== action.payload?.id,
        );
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
        const postIdx = state.mainPosts.findIndex(
          (post) => action.payload && post.id === action.payload.postid,
        );
        const commentIdx = state.mainPosts[postIdx].postCommentList.findIndex(
          (comment) => comment.id === action.payload?.id,
        );
        if (state.mainPosts[postIdx])
          state.mainPosts[postIdx].postCommentList[commentIdx].content = action.payload?.content;
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
        const postIdx = state.mainPosts.findIndex((post) => post.id === action.payload.postid);
        const commentIdx = state.mainPosts[postIdx].postCommentList.findIndex(
          (comment) => comment.id === action.payload?.commentid,
        );
        if (state.mainPosts[postIdx])
          state.mainPosts[postIdx].postCommentList[commentIdx].replies?.push(action.payload);
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
        const postIdx = state.mainPosts.findIndex((post) => post.id === action.payload.postid);
        const commentIdx = state.mainPosts[postIdx].postCommentList.findIndex(
          (comment) => comment.id === action.payload?.commentid,
        );
        const ReplyIdx = state.mainPosts[postIdx].postCommentList[commentIdx].replies?.findIndex(
          (reply) => reply.id === action.payload.id,
        );
        if (state.mainPosts[postIdx])
          state.mainPosts[postIdx].postCommentList[commentIdx].replies = state.mainPosts[
            postIdx
          ].postCommentList[commentIdx].replies?.filter((reply, idx) => idx !== ReplyIdx);
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
        const postIdx = state.mainPosts.findIndex((post) => post.id === action.payload.postid);
        const commentIdx = state.mainPosts[postIdx].postCommentList.findIndex(
          (comment) => comment.id === action.payload?.commentid,
        );
        const ReplyIdx = state.mainPosts[postIdx].postCommentList[commentIdx].replies?.findIndex(
          (reply) => reply.id === action.payload.id,
        );
        if (ReplyIdx !== undefined)
          state.mainPosts[postIdx].postCommentList[commentIdx].replies[ReplyIdx].content =
            action.payload.content;
      })
      .addCase(updateReply.rejected, (state, action: ReturnType<typeof updateReply.rejected>) => {
        state.updateReplyLoading = false;
        state.updateReplyError = action.error;
      }),
});

export const { getDataForModal, getPageNum, getTotalPage } = postSlice.actions;
export default postSlice.reducer;
