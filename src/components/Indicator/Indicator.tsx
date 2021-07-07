import './Indicator.css';

export interface IndicatorProps {
  value: number;
  name: string;
  unit: string;
  alarm?: {
    condition: '>' | '>=' | '<' | '<=' | '==' | 'includes' | 'out_interval';
    values: number[];
  };
}

interface config {
  config: IndicatorProps;
}

export const Indicator = (props: config) => {
  const { name, value, unit, alarm } = props.config;

  const checkAlarm = ():string => {
    if (alarm && alarm.values && alarm.values.length) {
      if (!checkDanger(props.config)) {
        return 'card';
      }
    }
    return 'card danger';
  }

  return (
    <div className={checkAlarm()}>
      <div style={{ width: '100%' }}>
        <div className="title">
          <span>{value}</span>
        </div>
        <div>
          <span>{unit}</span>
        </div>
        <div>
          <span>{name}</span>
        </div>
      </div>
    </div>
  )
}

export const checkDanger = (model: IndicatorProps) => {
  interface operatorParams {
    value: number;
    values: number[]
  };

  const operator = {
    '>': (params: operatorParams) => {
      return params.value > params.values[0];
    },
    '>=': (params: operatorParams) => {
      return params.value >= params.values[0];
    },
    '<': (params: operatorParams) => {
      return params.value < params.values[0];
    },
    '<=': (params: operatorParams) => {
      return params.value <= params.values[0];
    },
    '==': (params: operatorParams) => {
      return params.value === params.values[0];
    },
    'includes': (params: operatorParams) => {
      return params.values.includes(params.value);
    },
    'out_interval': (params: operatorParams) => {
      const numbersOrdered = params.values.sort((a, b) => {
        return a-b;
      });
      return !(
        params.value >= numbersOrdered[0] &&
        params.value <= numbersOrdered[numbersOrdered.length-1]
      );
    }
  };

  if (model.alarm && model.alarm.values.length) {
    const valuesToCompare: operatorParams = {
      value: model.value,
      values: model.alarm.values
    }

    if (model.alarm.values.length >= 1) {
      return operator[model.alarm.condition](valuesToCompare);
    }
  }
  return false;
}

export default Indicator;