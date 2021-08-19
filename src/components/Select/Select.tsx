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

export interface OptionDefault {
  [x: string]: string | number | undefined;
  name?: string;
}
interface SelectProps {
  options: OptionDefault[];
  labelValue?: string;
  keyValue?: string;
  setOptionSelected: React.Dispatch<React.SetStateAction<OptionDefault>>;
  option: OptionDefault;
}

export const Select = ({
  options,
  labelValue = 'name',
  keyValue = 'id',
  setOptionSelected,
  option,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const node = useRef(null);

  const setOption = (option: OptionDefault) => {
    setOptionSelected(option);
    setOpen(false);
  };

  return (
    <SelectContainer ref={node}>
      <SelectMain onClick={() => setOpen(!open)}>
        <ContainerSelected>
          <span>{option[labelValue] ? option[labelValue] : 'Selecione'}</span>
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </ContainerSelected>
      </SelectMain>
      {open && (
        <ListOptions>
          {options.map((option: OptionDefault) => (
            <Option key={option[keyValue]} onClick={() => setOption(option)}>
              {option[labelValue]}
            </Option>
          ))}
        </ListOptions>
      )}
    </SelectContainer>
  );
};

export default Select;
