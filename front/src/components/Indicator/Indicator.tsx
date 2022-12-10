import './Indicator.css';
import {
  CardMonitor,
  ContainerCard,
  Description,
  ValueTitle,
  NameIndicator,
  IconContainer,
  Loader,
} from './Indicator.styles';
import { IconType } from 'react-icons/lib';
import { ReactElement, useEffect, useState } from 'react';
export interface IndicatorProps {
  value: number;
  name: string;
  unit: string;
  alarm?: {
    condition: '>' | '>=' | '<' | '<=' | '==' | 'includes' | 'out_interval';
    values: number[];
  };
  danger?: boolean;
  icon?: ReactElement<IconType>;
  loading?: boolean;
}

interface config {
  config: IndicatorProps;
}

export const Indicator = (props: config) => {
  const { name, value, unit, alarm, icon, loading } = props.config;
  const [loadingState, setLoadingState] = useState<boolean>(false);

  useEffect(() => {
    setLoadingState(loading || false);
  }, [loading]);

  const checkAlarm = (): boolean => {
    if (alarm && alarm.values && alarm.values.length) {
      return checkDanger(props.config);
    }
    return false;
  };

  const mountDescription = () => {
    if (alarm?.condition === 'out_interval') {
      return (
        'ideal seria ' +
        alarm?.values[0] +
        ' a ' +
        alarm?.values[alarm?.values.length - 1]
      );
    }
    if (alarm?.condition === 'includes' || alarm?.condition === '==') {
      return 'não pode ser ' + value;
    }
    if (alarm?.condition === '>=') {
      return 'ideal seria menor que ' + alarm?.values[0];
    }
    if (alarm?.condition === '<=') {
      return 'ideal seria maior que ' + alarm?.values[0];
    }
    if (alarm?.condition === '>') {
      return 'ideal seria menor ou igual a ' + alarm?.values[0];
    }
    if (alarm?.condition === '<') {
      return 'ideal seria maior ou igual a ' + alarm?.values[0];
    }
  };

  return (
    <CardMonitor danger={checkAlarm()} key={name}>
      <ContainerCard>
        <ValueTitle>
          {loadingState ? <Loader /> : <span>{value}</span>}
        </ValueTitle>
        {icon && (
          <IconContainer data-testid="icon" danger={checkAlarm()}>
            {icon}
          </IconContainer>
        )}
      </ContainerCard>
      <NameIndicator>
        <span>{unit}</span>
      </NameIndicator>
      <Description>
        <span>{name}</span> {checkAlarm() && <span>{mountDescription()}</span>}
      </Description>
    </CardMonitor>
  );
};

export const checkDanger = (model: IndicatorProps): boolean => {
  interface operatorParams {
    value: number;
    values: number[];
  }

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
    includes: (params: operatorParams) => {
      return params.values.includes(params.value);
    },
    out_interval: (params: operatorParams) => {
      const numbersOrdered = params.values.sort((a, b) => {
        return a - b;
      });
      return !(
        params.value >= numbersOrdered[0] &&
        params.value <= numbersOrdered[numbersOrdered.length - 1]
      );
    },
  };

  if (model.alarm && model.alarm.values.length) {
    const valuesToCompare: operatorParams = {
      value: model.value,
      values: model.alarm.values,
    };

    if (model.alarm.values.length >= 1) {
      return operator[model.alarm.condition](valuesToCompare);
    }
  }
  return false;
};

export default Indicator;
