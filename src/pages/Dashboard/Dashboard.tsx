import React from 'react';
import Header from '../../components/Header/Header';
import LogoImg from '../../assets/logo.png';
import { IndicatorProps } from '../../components/Indicator';
import {
  HeaderSection,
  ImgMonitor,
  CardsSection,
  CardMonitor
} from './Dashboard.styles';

const Dashboard = () => {

  let indicators: IndicatorProps[] = [
    {
      id: 1,
      value: 27,
      unit: 'graus',
      name: 'temperatura',
      alarm: {
        condition: 'out_interval',
        values: [26, 29]
      }
    },
    {
      id: 2,
      value: 1023,
      unit: 'graus',
      name: 'salinidade',
      alarm: {
        condition: 'out_interval',
        values: [1024, 1026]
      }
    },
    {
      id: 3,
      value: 0.06,
      unit: 'ppm',
      name: 'fosfato',
      alarm: {
        condition: '>',
        values: [0.12]
      }
    },
    {
      id: 4,
      value: 0.06,
      unit: 'ppm',
      name: 'fosfato',
      alarm: {
        condition: '>',
        values: [0.12]
      }
    },
    {
      id: 5,
      value: 0.06,
      unit: 'ppm',
      name: 'fosfato',
      alarm: {
        condition: '>',
        values: [0.12]
      }
    }
  ];

  return (
    <div>
      <div>
        <Header />
        <HeaderSection>
          <div>
            <h1>Bem vindo ao monitoramento,</h1>
            <h3>está <span style={{color: '#fe7061'}}>tudo bem</span> por aqui.</h3>
          </div>
          <div>
            <ImgMonitor src={LogoImg} alt="Shark Good" />
          </div>
        </HeaderSection>
      </div>
      {/* cards */}
      <CardsSection>
        {indicators.map((card) => {
          return (
            <CardMonitor key={card.id}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <div style={{
                  fontSize: '22px',
                  fontWeight: 500
                }}>
                  <span>23°</span>
                </div>
                <div>
                  <div style={{
                    background: 'red',
                    borderRadius: '50%',
                    height: '12px',
                    width: '12px'
                  }}></div>
                </div>
              </div>
              <div style={{
                fontSize: '14px',
                marginTop: '10px'
              }}>
                <span>Temperatura</span>
              </div>
              <div style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                color: '#acaaab',
                fontSize: '12px',
                marginTop: '12px'
              }}>
                <span title="Ideal de 26 graus á 29 graus">Ideal de 26 graus á 29 graus á 29 grausá 29 grausá 29 grausá 29 graus</span>
              </div>
            </CardMonitor>
          )
        })}
      </CardsSection>

      </div>
  );
}

export default Dashboard;
