import styled, { css } from 'styled-components';

export const ContainerCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  danger: boolean;
}

export const CardMonitor = styled.div<Props>`
  padding: 14px;
  color: ${(props) => props.theme.pallete.secondary.main};
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 1px solid ${(props) => props.theme.borderColor};

  ${(props) =>
    props.danger &&
    css`
      border: 1px solid ${(props) => props.theme.pallete.primary.main};
    `};
`;

export const Description = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${(props) => props.theme.pallete.secondary.contrastText};
  font-size: 12px;
  margin-top: 12px;
  text-align: left;
`;

export const ValueTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
`;

export const AlertCircle = styled.div`
  background: ${(props) => props.theme.pallete.primary.main};
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
      color: ${(props) => props.theme.pallete.primary.main};
    `};
`;
