import styled, { css } from 'styled-components';

import { defaultTheme as theme } from '../../main/theme';

export const ContainerCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  danger: boolean;
}

export const CardMonitor = styled.div<Props>`
  padding: 14px;
  color: ${theme.pallete.secondary.main};
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  border: 1px solid ${theme.borderColor};

  ${(props) =>
    props.danger &&
    css`
      border: 1px solid ${theme.pallete.primary.main};
    `};
`;

export const Description = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${theme.pallete.secondary.contrastText};
  font-size: 12px;
  margin-top: 12px;
  text-align: left;
`;

export const ValueTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
`;

export const AlertCircle = styled.div`
  background: ${theme.pallete.primary.main};
  border-radius: 50%;
  height: 12px;
  width: 12px;
  margin-left: 10px;
`;

export const NameIndicator = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

export const IconContainer = styled.div<Props>`
  display: flex;
  font-size: 18px;

  ${(props) =>
    props.danger &&
    css`
      color: ${theme.pallete.primary.main};
    `};
`;
