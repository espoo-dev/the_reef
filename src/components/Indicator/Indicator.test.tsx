import { render } from '@testing-library/react';
import { checkDanger, Indicator, IndicatorProps } from './Indicator';

const modelIndicator: IndicatorProps = {
  value: 30,
  unit: 'graus',
  name: 'temperatura',
  alarm: {
    condition: '>',
    values: [29]
  }
};

describe('Indicator defaults tests', () => {
  it('should create the indicator on screen', () => {
    render(<Indicator config={modelIndicator} />);
  })

  it('idicator without alarm', () => {
    const withoutAlarm: IndicatorProps = {
      value: 27,
      unit: 'graus',
      name: 'temperatura'
    };
    expect(checkDanger(withoutAlarm)).toBeFalsy();
  })
})

describe('check operator >', () => {
  it('with value bigger', () => {
    expect(checkDanger(mountModel(30, '>', [29]))).toBeTruthy();
  })

  it('with value smaller', () => {
    expect(checkDanger(mountModel(27, '>', [29]))).toBeFalsy();
  })

  it('with value equals', () => {
    expect(checkDanger(mountModel(29, '>', [29]))).toBeFalsy();
  })
})

describe('check operator <', () => {
  it('with value smaller', () => {
    expect(checkDanger(mountModel(27, '<', [29]))).toBeTruthy();
  })

  it('with value bigger', () => {
    expect(checkDanger(mountModel(30, '<', [29]))).toBeFalsy();
  })

  it('with value equals', () => {
    expect(checkDanger(mountModel(30, '<', [30]))).toBeFalsy();
  })
})

describe('check operator >=', () => {
  it('with value equals', () => {
    expect(checkDanger(mountModel(30, '>=', [30]))).toBeTruthy();
  })

  it('with value smaller', () => {
    expect(checkDanger(mountModel(10, '>=', [30]))).toBeFalsy();
  })

  it('with value bigger', () => {
    expect(checkDanger(mountModel(40, '>=', [30]))).toBeTruthy();
  })
})

describe('check operator <=', () => {
  it('with value equals', () => {
    expect(checkDanger(mountModel(30, '<=', [30]))).toBeTruthy();
  })

  it('with value smaller', () => {
    expect(checkDanger(mountModel(10, '<=', [30]))).toBeTruthy();
  })

  it('with value bigger', () => {
    expect(checkDanger(mountModel(31, '<=', [30]))).toBeFalsy();
  })
})

describe('check operator ==', () => {
  it('check operator == values', () => {
    expect(checkDanger(mountModel(30, '==', [30]))).toBeTruthy();
  })

  it('check operator == with value bigger', () => {
    expect(checkDanger(mountModel(31, '==', [30]))).toBeFalsy();
  })

  it('check operator == with value smaller', () => {
    expect(checkDanger(mountModel(29, '==', [30]))).toBeFalsy();
  })

  it('check operator == with values differents', () => {
    expect(checkDanger(mountModel(26, '==', [30]))).toBeFalsy();
  })
})

describe('check includes operator', () => {
  it('should includes value in values array', () => {
    expect(checkDanger(mountModel(27, 'includes', [26, 27, 28, 29]))).toBeTruthy();
  })

  it('dont should includes value in values array', () => {
    expect(checkDanger(mountModel(11, 'includes', [26, 27, 28, 29]))).toBeFalsy();
  })
})

describe('check out_interval operator', () => {
  it('the value should to between two numbers', () => {
    expect(checkDanger(mountModel(27, 'out_interval', [26, 29]))).toBeFalsy();
  })

  it('the value should to between two numbers with values without order', () => {
    expect(checkDanger(mountModel(27, 'out_interval', [30, 26]))).toBeFalsy();
  })

  it('the value not should to between two numbers', () => {
    expect(checkDanger(mountModel(22, 'out_interval', [26, 29]))).toBeTruthy();
  })

  it('the value should to between two numbers and to be the minimal', () => {
    expect(checkDanger(mountModel(26, 'out_interval', [26, 29]))).toBeFalsy();
  })

  it('the value should to between two numbers and to be the maximum', () => {
    expect(checkDanger(mountModel(29, 'out_interval', [26, 29]))).toBeFalsy();
  })

  it('the value should to between four numbers without order', () => {
    expect(checkDanger(mountModel(28, 'out_interval', [26, 29, 5, 12]))).toBeFalsy();
  })
})

function mountModel(
  value: number,
  condition: '>' | '>=' | '<' | '<=' | '==' | 'includes' | 'out_interval',
  values: number[]
) {
    const model: IndicatorProps = {
      unit: 'graus',
      name: 'temperatura',
      value,
      alarm: {
        condition,
        values
      }
    }
  return model;
}