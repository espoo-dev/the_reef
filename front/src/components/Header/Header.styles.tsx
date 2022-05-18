import styled from 'styled-components';

import { defaultTheme as theme } from '../../main/theme';

export const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: ${theme.pallete.common.background};
  color: ${theme.pallete.primary.main};
`;
