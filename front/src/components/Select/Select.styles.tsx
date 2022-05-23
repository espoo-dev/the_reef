import styled from 'styled-components';

import { defaultTheme as theme } from '../../main/theme';

export const SelectContainer = styled.div`
  color: ${theme.pallete.primary.main};
  width: 40%;
  position: relative;
  user-select: none;
  margin-bottom: 20px;
`;

export const SelectMain = styled.div`
  padding: 4px;
  background: ${theme.pallete.common.white};
  border: 1px solid ${theme.borderColor};
  border-radius: ${theme.borderRadius};
`;

export const ContainerSelected = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const ListOptions = styled.ul`
  margin: 0px;
  position: absolute;
  list-style-type: none;
  background: ${theme.pallete.common.white};
  color: ${theme.pallete.primary.main};
  padding-left: 0px;
  border-radius: ${theme.borderRadius};
  width: 100%;
  border-bottom: 1px solid ${theme.borderColor};
  border-left: 1px solid ${theme.borderColor};
  border-right: 1px solid ${theme.borderColor};
`;

export const Option = styled.li`
  padding: 10px;
  cursor: pointer;
`;
