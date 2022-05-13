import styled from 'styled-components';

const bRadiusDefault = '6px';
const borderColor = '#eaeaea';

export const SelectContainer = styled.div`
  color: #fe7061;
  width: 40%;
  position: relative;
  user-select: none;
  padding: 20px 0px;

  @media (max-width: 1200px) {
    padding: 20px 30px;
  }
`;

export const SelectMain = styled.div`
  padding: 4px;
  background: #fff;
  border: 1px solid ${borderColor};
  border-radius: ${bRadiusDefault};
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
  background: #fff;
  color: #fe7061;
  padding-left: 0px;
  border-radius: ${bRadiusDefault};
  width: 100%;
  border-bottom: 1px solid ${borderColor};
  border-left: 1px solid ${borderColor};
  border-right: 1px solid ${borderColor};
`;

export const Option = styled.li`
  padding: 10px;
  cursor: pointer;
`;
