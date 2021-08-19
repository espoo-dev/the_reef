import React from 'react';
import Header from '../../components/Header/Header';
import LogoImg from '../../assets/logo.png';
import { IndicatorProps } from '../../components/Indicator';
import { Indicator } from '../../components/Indicator';
import { FaTemperatureLow, FaStrikethrough } from 'react-icons/fa';
import { Select } from '../../components/Select';

const Dashboard = () => {
  const indicators: IndicatorProps[] = [
    {
      value: 27,
      unit: 'graus',
      name: 'temperatura',
      alarm: {
        condition: 'out_interval',
        values: [26, 29],
      },
      icon: <FaTemperatureLow />,
    },
    {
      value: 1023,
      unit: 'graus',
      name: 'salinidade',
      alarm: {
        condition: 'out_interval',
        values: [1024, 1026],
      },
      icon: <FaStrikethrough />,
    },
    {
      value: 0.06,
      unit: 'ppm',
      name: 'fosfato',
      alarm: {
        condition: '>',
        values: [0.12],
      },
    },
  ];

  return (
    <div>
      <div>
        <Header />
        <HeaderSection>
          <div>
            <h1>Bem vindo ao monitoramento,</h1>
            <h3>
              está <span style={{ color: '#fe7061' }}>tudo bem</span> por aqui.
            </h3>
          </div>
          <div>
            <ImgMonitor src={LogoImg} alt="Shark Good" />
          </div>
        </HeaderSection>
      </div>
      {/* cards */}
      <div
        style={{
          padding: '30px',
        }}
      >
        <Select options={['tank1', 'tank2']} />
      </div>
      <CardsSection>
        {indicators.map((card) => (
          <Indicator key={card.name} config={card} />
        ))}
      </CardsSection>
    </div>
  );
};

export default Dashboard;
