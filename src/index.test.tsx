import ReactDOM from 'react-dom';

jest.mock('react-dom', () => ({ render: jest.fn() }));

test('renders with App and root div', () => {
  require('./index.tsx');
  expect(ReactDOM.render).toHaveBeenCalled();
});
