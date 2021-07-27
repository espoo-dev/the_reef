import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard defaults tests', () => {
  it('should create and render dashboad page on screen', () => {
    render(<Dashboard  />);
  })
})
