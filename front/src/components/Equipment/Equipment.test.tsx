import { render, screen } from '@testing-library/react';
import Equipment from './Equipment';

const defaultProps = {
  name: 'Fan',
  status: false,
};

const sut = (props = defaultProps) => {
  render(<Equipment {...props} />);
};

describe('Equipment defaults tests', () => {
  it('should create and render equipment on screen', () => {
    sut();
    expect(screen.queryAllByText(defaultProps.name)).toHaveLength(1);
  });

  it('should render equipment card off by default', () => {
    sut();
    expect(screen.queryAllByText('OFF')).toHaveLength(1);
  });

  it('should render equipment card on', () => {
    sut({ ...defaultProps, status: true });
    expect(screen.queryAllByText('ON')).toHaveLength(1);
  });
});
