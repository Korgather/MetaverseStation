import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@store/hook';
import { decrement, increment } from '@slices/counterSlice';

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const incrementFunc = () => {
    dispatch(increment());
  };
  const decrementFunc = () => {
    dispatch(decrement());
  };
  return (
    <>
      <div>{count}</div>
      <button onClick={incrementFunc}>+</button>
      <button onClick={decrementFunc}>-</button>
    </>
  );
}

export default Counter;
