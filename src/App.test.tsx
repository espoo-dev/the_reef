import { render } from '@testing-library/react';
import App from './App';

describe('app defaults tests', () => {
  it('should create and render app screen', () => {
    render(<App />);
  })
})
