import React from 'react';
import Header from './components/Header/Header';
import { Indicator, IndicatorProps } from './components/Indicator';

const App = () => {

  let indicators: IndicatorProps[] = [];

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
