import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '@slices/counterSlice';

const loggerMiddleware = () => (next) => (action) => {
  console.log('로깅', action);
  next(action);
};

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(loggerMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
