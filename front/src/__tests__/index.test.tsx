import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@store/configureStore';
import Login from '@pages/login';

describe('Login', () => {
  it('renders a heading', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
    );
  });
});
