import styled from 'styled-components';

export const HeaderMain = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: ${(props) => props.theme.pallete.common.background};
  color: ${(props) => props.theme.pallete.primary.main};
`;
