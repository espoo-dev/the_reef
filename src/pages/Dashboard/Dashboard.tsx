import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import LogoImg from '../../assets/logo.png';
import { IndicatorProps } from '../../components/Indicator';
import { Indicator } from '../../components/Indicator';
import { FaTemperatureLow, FaStrikethrough } from 'react-icons/fa';
import { OptionDefault, Select } from '../../components/Select';
import { HeaderSection, ImgMonitor, CardsSection } from './Dashboard.styles';

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
  const [tankSelected, setTankSelected] = useState<OptionDefault>({});

  const tanks = [
    {
      id: 1,
      name: 'tank1',
      cor: 'aaa',
    },
    {
      id: 2,
      name: 'tank2',
      cor: 'bbb',
    },
  ];

  return (
    <div>
      <div>
        <Header />
        <HeaderSection>
          <div>
            {tankSelected.name ? (
              <h1>
                {`Bem vindo ao monitoramento do
                ${tankSelected.name}`}
              </h1>
            ) : (
              <h1>Selecione um tank</h1>
            )}
            {tankSelected.name && (
              <h3>
                está <span style={{ color: '#fe7061' }}>tudo bem</span> por
                aqui.
              </h3>
            )}
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
        <Select
          options={tanks}
          option={tankSelected}
          setOptionSelected={setTankSelected}
          // labelValue={'cor'}
        />
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
