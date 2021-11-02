import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Select from './Select';

const stateMock = jest.fn().mockReturnValue([{}, {}]);
const options = [
  { id: 1, name: 'Iury' },
  { id: 2, name: 'Nogueira' },
];

describe('Select defaults tests', () => {
  it('should create and render select on screen', () => {
    const rendered = render(
      <Select options={[]} option={{}} setOptionSelected={stateMock} />
    );
    expect(rendered).toBeTruthy();
  });

  it('should render select with options', () => {
    render(
      <Select options={options} option={{}} setOptionSelected={stateMock} />
    );
    const selectMain = screen.getByTestId('select-main');
    fireEvent.click(selectMain);
    expect(screen.getByText(options[0].name)).toBeTruthy();
  });

  it('should select a option', () => {
    render(
      <Select options={options} option={{}} setOptionSelected={stateMock} />
    );
    const selectMain = screen.getByTestId('select-main');
    fireEvent.click(selectMain);
    const option = screen.getByText(options[0].name);
    fireEvent.click(option);
    expect(stateMock).toHaveBeenCalledWith(options[0]);
  });
});
