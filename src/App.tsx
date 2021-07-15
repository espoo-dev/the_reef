import React from 'react';
import Header from './components/Header/Header';
import { Indicator, IndicatorProps } from './components/Indicator';

const App = () => {

  let indicators: IndicatorProps[] = [
    {
      value: 27,
      unit: 'graus',
      name: 'temperatura',
      alarm: {
        condition: 'out_interval',
        values: [26, 29]
      }
    },
    {
      value: 1023,
      unit: 'graus',
      name: 'salinidade',
      alarm: {
        condition: 'out_interval',
        values: [1024, 1026]
      }
    },
    {
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
      <Header />
        <div style={{
          display: 'flex',
          margin: '10px',
        }}>
          {indicators.map((indicador) => <Indicator key={indicador.name} config={indicador} />)}
        </div>
    </div>
  );
}

export default App;
