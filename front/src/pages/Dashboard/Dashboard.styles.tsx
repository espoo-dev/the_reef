import styled from 'styled-components';

import { defaultTheme as theme } from '../../main/theme';

export const HeaderSection = styled.div`
  max-width: ${theme.maxWidth};
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.pallete.secondary.main};
  padding: 30px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ImgMonitor = styled.img`
  width: 300px;

  @media (min-width: ${theme.breakpoints.tablet}) {
    height: 100%;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 0px;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 3fr));
  grid-gap: 20px;
  margin-bottom: 20px;
`;

export const CardsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
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
