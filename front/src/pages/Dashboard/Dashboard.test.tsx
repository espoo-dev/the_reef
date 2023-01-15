import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;
export default ResizeObserver;

describe('Dashboard defaults tests', () => {
  it('should create and render dashboad page on screen', () => {
    render(<Dashboard />);
  });
});
