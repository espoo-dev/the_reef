import { useRef } from 'react';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  SelectMain,
  ContainerSelected,
  SelectContainer,
  ListOptions,
  Option,
} from './Select.styles';

interface SelectProps {
  options: string[];
  defaultOption?: string;
}

export const Select = ({ options, defaultOption }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [optionSelected, setOptionSelected] = useState(defaultOption || '');
  const node = useRef(null);

  const setOption = (option: string) => {
    setOptionSelected(option);
    setOpen(false);
  };

  return (
    <SelectContainer ref={node}>
      <SelectMain onClick={() => setOpen(!open)}>
        <ContainerSelected>
          <span>{optionSelected || 'Selecione'}</span>
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </ContainerSelected>
      </SelectMain>
      {open && (
        <ListOptions>
          {options.map((option) => (
            <Option key={option} onClick={() => setOption(option)}>
              {option}
            </Option>
          ))}
        </ListOptions>
      )}
    </SelectContainer>
  );
};

export default Select;
