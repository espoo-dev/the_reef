import { render } from '@testing-library/react';
import { checkDanger, Indicator, IndicatorProps } from './Indicator';

describe('Indicator', () => {

  // const checkDanger = (model: IndicatorProps) => {
  //   if (model.alarm && model.alarm.values) {
  //     return model.value > model.alarm.values[0];
  //   }
  // }

  const modelIndicator: IndicatorProps = {
    value: 30,
    unit: 'graus',
    name: 'temperatura',
    alarm: {
      condition: '>',
      values: [29]
    }
  };

  it('should create the indicator on screen', () => {
    render(<Indicator config={modelIndicator} />);
  })

  it('idicator without alarm >', () => {
    const withoutAlarm: IndicatorProps = {
      value: 27,
      unit: 'graus',
      name: 'temperatura'
    };
    expect(checkDanger(withoutAlarm)).toBeFalsy();
  })

  it('check operator >', () => {
    expect(checkDanger(modelIndicator)).toBeTruthy();
  })

  it('check operator > with value smaller', () => {
    const modelIndicatorSmaller: IndicatorProps = {
      ...modelIndicator,
      value: 27,
      alarm: {
        condition: '>',
        values: [29]
      }
    };
    expect(checkDanger(modelIndicatorSmaller)).toBeFalsy();
  })

  it('check operator > with value equals', () => {
    const modelIndicatorEquals: IndicatorProps = {
      ...modelIndicator,
      value: 29,
      alarm: {
        condition: '>',
        values: [29]
      }
    };
    expect(checkDanger(modelIndicatorEquals)).toBeFalsy();
  })

  it('check operator <', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 27,
      alarm: {
        condition: '<',
        values: [29]
      }
    };
    expect(checkDanger(model)).toBeTruthy();
  })

  it('check operator < with value bigger', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 30,
      alarm: {
        condition: '<',
        values: [29]
      }
    };
    expect(checkDanger(model)).toBeFalsy();
  })

  it('check operator < with value equals', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 30,
      alarm: {
        condition: '<',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('check operator >= with value equals', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 30,
      alarm: {
        condition: '>=',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeTruthy();
  })

  it('check operator >= with value smaller', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 10,
      alarm: {
        condition: '>=',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('check operator >= with value bigger', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 40,
      alarm: {
        condition: '>=',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeTruthy();
  })

  it('check operator <= with value equals', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 30,
      alarm: {
        condition: '<=',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeTruthy();
  })

  it('check operator <= with value smaller', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 10,
      alarm: {
        condition: '<=',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeTruthy();
  })

  it('check operator <= with value bigger', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 31,
      alarm: {
        condition: '<=',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('check operator == values', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 30,
      alarm: {
        condition: '==',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeTruthy();
  })

  it('check operator == with value bigger', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 31,
      alarm: {
        condition: '==',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('check operator == with value smaller', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 29,
      alarm: {
        condition: '==',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('check operator == with values differents', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 26,
      alarm: {
        condition: '==',
        values: [30]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('should includes value in values array', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 27,
      alarm: {
        condition: 'includes',
        values: [26, 27, 28, 29]
      }
    }
    expect(checkDanger(model)).toBeTruthy();
  })

  it('dont should includes value in values array', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 11,
      alarm: {
        condition: 'includes',
        values: [26, 27, 28, 29]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('the value should to between two numbers', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 27,
      alarm: {
        condition: 'out_interval',
        values: [26, 29]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('the value should to between two numbers with values without order', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 27,
      alarm: {
        condition: 'out_interval',
        values: [30, 26]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('the value not should to between two numbers', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 22,
      alarm: {
        condition: 'out_interval',
        values: [26, 29]
      }
    }
    expect(checkDanger(model)).toBeTruthy();
  })

  it('the value should to between two numbers and to be the minimal', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 26,
      alarm: {
        condition: 'out_interval',
        values: [26, 29]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('the value should to between two numbers and to be the maximum', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 26,
      alarm: {
        condition: 'out_interval',
        values: [26, 29]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

  it('the value should to between four numbers without order', () => {
    const model: IndicatorProps = {
      ...modelIndicator,
      value: 28,
      alarm: {
        condition: 'out_interval',
        values: [26, 29, 5, 12]
      }
    }
    expect(checkDanger(model)).toBeFalsy();
  })

})