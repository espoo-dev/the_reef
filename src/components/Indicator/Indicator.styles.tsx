import styled, { css } from 'styled-components';

export const ContainerCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface Props {
  danger: boolean;
}

// Card
export const CardMonitor = styled.div<Props>`
  padding: 14px;
  color: #464646;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: -1px 12px 23px -10px rgb(0 0 0 / 15%);
  border: 1px solid #eaeaea;

  ${props =>
    props.danger &&
    css`
      border: 1px solid #fe7061;
    `};
`;

export const Description = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #acaaab;
  font-size: 12px;
  margin-top: 12px;
  text-align: left;
`;

export const ValueTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
`;

export const AlertCircle = styled.div`
  background: #fe7061;
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

  ${props =>
    props.danger &&
    css`
      color: #fe7061;
    `};
`;