import postSlice from './postSlice';
import counterSlice from './counterSlice';
import { CombinedState, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import { ICounterState } from '@customTypes/counter';
import { IPostState } from '@customTypes/post';
import { HYDRATE } from 'next-redux-wrapper';

export interface IRootState {
  postSlice: IPostState;
  counterSlice: ICounterState;
}

type TCombinedState = CombinedState<{ postSlice: IPostState; counterSlice: ICounterState }> | undefined;

const rootReducer = (state: TCombinedState, action: PayloadAction<IRootState>): IRootState => {
  switch (action.type) {
    case HYDRATE: {
      return action.payload;
    }
    default: {
      return combineReducers({
        postSlice,
        counterSlice,
      })(state, action);
    }
  }
};

export default rootReducer;
