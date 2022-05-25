import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/configureStore';
import Login from '@pages/login';

describe('Login', () => {
  it('Login페이지 렌더링', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
    const loginButton = screen.getByRole('link', { name: '카카오 로그인하기' });
    expect(loginButton).toBeInTheDocument();
  });
});
