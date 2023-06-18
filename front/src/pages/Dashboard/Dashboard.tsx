import { useState, useEffect } from 'react';
import { IndicatorProps } from '../../components/Indicator';
import { Indicator } from '../../components/Indicator';
import { FaTemperatureLow, FaStrikethrough } from 'react-icons/fa';
import { AiOutlineReload } from 'react-icons/ai';
import {
  HeaderSection,
  Container,
  CardsSection,
  Actions,
  EquipmentSection,
} from './Dashboard.styles';
import { Api } from 'infra/http/api';
import { Aquarium } from 'entity/Aquarium';
import { ReefChartList, ReefChartHistoric } from 'components';
import Equipment from 'components/Equipment/Equipment';
import { Fan } from 'entity/Fan';

type PropsHistoricChart = Array<{
  hour: string;
  yesterday: number;
  today: number;
}>;

type PropsHistoricList = Array<{
  created_at: string;
  value: number;
}>;

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
  const [_, setTankSelected] = useState<Aquarium>();
  const [indicatorHist, setIndicatorHist] = useState<PropsHistoricChart>([]);
  const [indicatorList, setIndicatorList] = useState<PropsHistoricList>([]);

  const [temperature, setTemperature] = useState(indicators[0]);
  const [fans, setFans] = useState<Fan[]>();

  const reefApi = new Api();

  const reloadIndicators = () => {
    setTemperature({ ...temperature, loading: true });
    loadIndicators();
    loadFans();
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

    loadHistoricChart(id);
    loadListChart(id);
  };

  const loadListChart = async (indicatorID: number) => {
    const response = await reefApi.get<PropsHistoricList>(
      `/indicator/${indicatorID}/list`
    );
    setIndicatorList(response);
  };

  const loadHistoricChart = async (indicatorID: number) => {
    const response = await reefApi.get<PropsHistoricChart>(
      `/indicator/${indicatorID}/historic`
    );
    setIndicatorHist(response);
  };

  const loadFans = async () => {
    const response = await reefApi.get<Fan[]>('/fans');
    setFans(response);
  };

  useEffect(() => {
    loadIndicators();
    loadAquariums();
    loadFans();
  }, []);

  return (
    <div>
      <HeaderSection>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h1>MyReef</h1>
            <p>
              {temperature.danger
                ? 'A temperatura não está boa!'
                : 'Está tudo bem por aqui.'}{' '}
            </p>
          </div>

          <Actions>
            <AiOutlineReload
              size={30}
              onClick={reloadIndicators}
              cursor="pointer"
            />
          </Actions>
        </div>
        <div>
          <EquipmentSection>
            {fans &&
              fans.length &&
              fans.map((fan, index) => (
                <Equipment
                  name={fan.name}
                  key={`equipament-${index}`}
                  status={fan.on}
                />
              ))}
          </EquipmentSection>
        </div>
      </HeaderSection>

      <Container>
        {/* <Select options={aquariums} setOptionSelected={setTankSelected} /> */}

        <CardsSection>
          <Indicator key={temperature.name} config={temperature} />
        </CardsSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 10fr))',
            marginTop: '50px',
            gap: '10px',
          }}
        >
          <ReefChartList values={indicatorList} />
          <ReefChartHistoric data={indicatorHist} />
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;
