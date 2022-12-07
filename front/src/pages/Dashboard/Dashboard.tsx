import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import LogoImg from '../../assets/logo.png';
import { IndicatorProps } from '../../components/Indicator';
import { Indicator } from '../../components/Indicator';
import { FaTemperatureLow, FaStrikethrough } from 'react-icons/fa';
import { Select } from '../../components/Select';
import {
  HeaderSection,
  ImgMonitor,
  Container,
  CardsSection,
} from './Dashboard.styles';
import { Api } from 'infra/http/api';
import { Aquarium } from 'entity/Aquarium';

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

  const [aquariums, setAquariums] = useState<Aquarium[]>();
  const [tankSelected, setTankSelected] = useState<Aquarium>();

  const [temperature, setTemperature] = useState(indicators[0]);

  const reefApi = new Api();

  const loadAquariums = async () => {
    setAquariums(await reefApi.get<Aquarium[]>('/aquariums'));
  };

  const loadIndicators = async () => {
    const response = await reefApi.get<any[]>('/indicators');
    const { name, currentValue, minValue, maxValue, unit } = response[0];
    setTemperature({
      name,
      unit,
      value: currentValue,
      alarm: {
        condition: 'out_interval',
        values: [minValue, maxValue],
      },
      icon: <FaTemperatureLow />,
    });
  };

  useEffect(() => {
    loadIndicators();
    loadAquariums();
  }, []);

  return (
    <div>
      <div>
        <Header />
        <div style={{ background: '#edfbfe' }}>
          <HeaderSection>
            <div>
              {tankSelected?.name ? (
                <h1>
                  {`Bem vindo ao monitoramento do
                  ${tankSelected?.name}`}
                </h1>
              ) : (
                <h1>Selecione um reef</h1>
              )}
              {tankSelected?.name && (
                <h3>
                  está <span style={{ color: '#fe7061' }}>tudo bem</span> por
                  aqui.
                </h3>
              )}
            </div>
            <ImgMonitor src={LogoImg} alt="Shark Good" />
          </HeaderSection>
        </div>
      </div>

      <Container>
        <Select options={aquariums} setOptionSelected={setTankSelected} />
        <CardsSection>
          {/* {indicators.map((card) => (
            <Indicator key={card.name} config={card} />
          ))} */}

          <Indicator key={temperature.name} config={temperature} />
        </CardsSection>
      </Container>
    </div>
  );
};

export default Dashboard;
