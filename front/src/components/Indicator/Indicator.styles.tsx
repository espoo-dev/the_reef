import styled, { css } from 'styled-components';

import { defaultTheme as theme } from '../../main/theme';

export const ContainerCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  danger: boolean;
}

export const Loader = styled.div`
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #fe7061;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const CardMonitor = styled.div<Props>`
  padding: 14px;
  color: ${theme.pallete.secondary.main};
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius};
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
  display: flex;
  justify-content: space-between;
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
