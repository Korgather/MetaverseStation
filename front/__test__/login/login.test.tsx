import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/configureStore';
import Login from '@pages/login';

describe('Login', () => {
  it('login with kakao', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
    const kakaoButton = screen.getByRole('link', { name: '카카오 로그인하기' });
    expect(kakaoButton).toHaveAttribute(
      'href',
      'https://api.metabusstation.shop/oauth2/authorization/kakao?redirect_uri=https://www.modumeta.com/oauth/redirect',
    );
  });
  it('login with google', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
    const googleButton = screen.getByRole('link', { name: '구글로 로그인하기' });
    expect(googleButton).toHaveAttribute(
      'href',
      'https://api.metabusstation.shop/oauth2/authorization/google?redirect_uri=https://www.modumeta.com/oauth/redirect',
    );
  });
  it('login with naver', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
    const naverButton = screen.getByRole('link', { name: '네이버 로그인하기' });
    expect(naverButton).toHaveAttribute(
      'href',
      'https://api.metabusstation.shop/oauth2/authorization/naver?redirect_uri=https://www.modumeta.com/oauth/redirect',
    );
  });
});
