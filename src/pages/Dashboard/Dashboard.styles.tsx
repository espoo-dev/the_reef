import styled from 'styled-components';

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  color: #464646;
  background: #edfbfe;
  align-items: center;
  
  @media(max-width: 550px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ImgMonitor = styled.img`
  height: 300px;
`;

export const CardsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 20px;
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
