import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Select from './Select';

const stateMock = jest.fn().mockReturnValue([{}, {}]);

describe('Select defaults tests', () => {
  it('should create and render select on screen', () => {
    const rendered = render(
      <Select options={[]} option={{}} setOptionSelected={stateMock} />
    );
    expect(rendered).toBeTruthy();
  });

  it('should render select with options', () => {
    render(
      <Select
        options={[{ id: '1', name: 'iury' }]}
        option={{}}
        setOptionSelected={stateMock}
      />
    );
    const selectMain = screen.getByTestId('select-main');
    fireEvent.click(selectMain);
    expect(screen.getByText('iury')).toBeTruthy();
  });

  it('should select a option', () => {
    render(
      <Select
        options={[{ id: '1', name: 'iury' }]}
        option={{}}
        setOptionSelected={stateMock}
      />
    );
    const selectMain = screen.getByTestId('select-main');
    fireEvent.click(selectMain);
    const option = screen.getByText('iury');
    fireEvent.click(option);
    expect(stateMock).toHaveBeenCalledWith({ id: '1', name: 'iury' });
  });
});
