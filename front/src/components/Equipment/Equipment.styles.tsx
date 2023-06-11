import styled, { css } from 'styled-components';

import { defaultTheme as theme } from '../../main/theme';

export const EquipmentContainer = styled.div`
  border: 1px solid ${theme.pallete.common.gray};
  color: ${theme.pallete.secondary.main};
  background: ${theme.pallete.common.white};
  border-radius: ${theme.borderRadius};
  padding: 14px;

  display: flex;
  justify-content: space-between;
`;

export const StatusText = styled.span<{ status: boolean }>`
  color: ${theme.pallete.secondary.main};
  color: green;

  ${(props) =>
    !props.status &&
    css`
      color: red;
    `};
`;
