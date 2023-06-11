import styled from 'styled-components';

import { defaultTheme as theme } from '../../main/theme';

export const HeaderSection = styled.div`
  max-width: ${theme.maxWidth};
  margin: auto;
  display: flex;
  flex-direction: column;
  color: ${theme.pallete.secondary.main};
  padding: 30px;
  background: ${theme.pallete.common.background};
  border-radius: 0 0 15px 15px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;

  svg {
    fill: ${theme.pallete.primary.main};
  }

  span {
    color: ${theme.pallete.primary.main};
  }
`;

export const EquipmentSection = styled.div`
  border-top: 1px solid ${theme.pallete.common.gray};
  padding-top: 25px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 2fr));
  grid-gap: 10px;
`;

export const CardsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 0.3fr));
  grid-gap: 10px;
`;

export const CardMonitor = styled.div`
  padding: 10px;
  color: ${theme.pallete.secondary.main};
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  border: 1px solid ${theme.borderColor};
`;

export const Container = styled.div`
  max-width: ${theme.maxWidth};
  margin: auto;
  padding: 30px;
`;
