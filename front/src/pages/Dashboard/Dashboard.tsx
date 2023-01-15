import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import LogoImg from '../../assets/logo.png';
import { IndicatorProps } from '../../components/Indicator';
import { Indicator } from '../../components/Indicator';
import { FaTemperatureLow, FaStrikethrough } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import {
  HeaderSection,
  ImgMonitor,
  Container,
  CardsSection,
  Actions,
} from './Dashboard.styles';
import { Api } from 'infra/http/api';
import { Aquarium } from 'entity/Aquarium';
import { ReefChart } from 'components/ReefChart';

const Dashboard = () => {
  const indicators: IndicatorProps[] = [
    {
      value: 27,
      unit: 'celsius',
      name: 'Temparature',
      alarm: {
        condition: 'out_interval',
        values: [26, 29],
      },
      icon: <FaTemperatureLow />,
      loading: true,
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
  const [historic, setHistoric] = useState<
    { created_at: string; value: number }[]
  >([]);

  const [temperature, setTemperature] = useState(indicators[0]);

  const reefApi = new Api();

  const reloadIndicators = () => {
    setTemperature({ ...temperature, loading: true });
    loadIndicators();
  };

  const loadAquariums = async () => {
    setAquariums(await reefApi.get<Aquarium[]>('/aquariums'));
    if (aquariums?.length) {
      setTankSelected(aquariums[0]);
    }
  };

  const loadIndicators = async () => {
    const response = await reefApi.get<any[]>('/indicators');
    const { name, currentValue, minValue, maxValue, unit, id } = response[0];
    setTemperature({
      name,
      unit,
      value: currentValue,
      alarm: {
        condition: 'out_interval',
        values: [minValue, maxValue],
      },
      icon: <FaTemperatureLow />,
      loading: false,
    });

    loadHistoric(id);
  };

  const loadHistoric = async (indicatorId: number) => {
    const response = await reefApi.get<{ created_at: string; value: number }[]>(
      `/indicator/${indicatorId}/historic`
    );

    setHistoric(response);
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
              <h2>Iury Reef</h2>
              <h3>
                {temperature.danger
                  ? 'A temperatura não está boa!'
                  : 'Está tudo bem por aqui.'}{' '}
              </h3>
            </div>
            <ImgMonitor src={LogoImg} alt="Shark Good" />
          </HeaderSection>
        </div>
      </div>

      <Container>
        {/* <Select options={aquariums} setOptionSelected={setTankSelected} /> */}

        <Actions>
          <AiOutlineReload
            size={30}
            onClick={reloadIndicators}
            cursor="pointer"
          />
        </Actions>

        <CardsSection>
          <Indicator key={temperature.name} config={temperature} />
        </CardsSection>
        <div style={{ marginTop: '50px' }}>
          <ReefChart values={historic} />
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
