import styled from 'styled-components';

export const HeaderSection = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.pallete.secondary.main};
  padding: 30px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ImgMonitor = styled.img`
  width: 300px;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 100%;
  }
`;

export const CardsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

export const CardMonitor = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.pallete.secondary.main};
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 1px solid ${(props) => props.theme.borderColor};
`;

export const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: auto;
  padding: 30px;
`;
