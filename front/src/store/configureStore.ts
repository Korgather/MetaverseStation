import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '@slices/index';
import { createWrapper } from 'next-redux-wrapper';

const dev = process.env.NODE_ENV === 'development';

export const store = configureStore({
  reducer: rootReducer,
});

const wrapper = createWrapper(() => store, {
  debug: dev,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default wrapper;
