import postSlice from './postSlice';
import counterSlice from './counterSlice';
import userSlice from './userSlice';
import { CombinedState, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { ICounterState } from '@customTypes/counter';
import { IPostState } from '@customTypes/post';
import { IUserState } from '@customTypes/user';
import { HYDRATE } from 'next-redux-wrapper';

export interface IRootState {
  postSlice: IPostState;
  counterSlice: ICounterState;
  userSlice: IUserState;
}

type TCombinedState = CombinedState<IRootState> | undefined;

const rootReducer = (state: TCombinedState, action: PayloadAction<IRootState>): IRootState => {
  switch (action.type) {
    // HYDRATE : SSR 때문에 설정.
    case HYDRATE: {
      return action.payload;
    }
    default: {
      const combineReducer = combineReducers({
        postSlice,
        counterSlice,
        userSlice,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
