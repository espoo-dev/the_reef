import styled from 'styled-components';

const limitMaxLength = '1200px';

export const HeaderSection = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #464646;
  padding: 30px;

  @media (max-width: 550px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ImgMonitor = styled.img`
  width: 300px;

  @media (min-width: 550px) {
    height: 100%;
  }
`;

export const CardsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1250px) {
    padding: 0 30px 30px 30px;
  }
`;

// Card
export const CardMonitor = styled.div`
  padding: 10px;
  color: #464646;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: -1px 12px 23px -10px rgb(0 0 0 / 15%);
  border: 1px solid #eaeaea;
`;

export const Container = styled.div`
  max-width: ${limitMaxLength};
  margin: auto;
`;
