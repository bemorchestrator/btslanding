/* eslint-env jest */
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders app', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Update this test to match your actual app content
  expect(document.body).toBeTruthy();
});
