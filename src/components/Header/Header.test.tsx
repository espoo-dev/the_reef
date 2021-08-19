import { render } from '@testing-library/react';
import Header from './Header';

describe('Header defaults tests', () => {
  it('should create and render header on screen', () => {
    render(<Header />);
  });
});
