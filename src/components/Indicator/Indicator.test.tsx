/* eslint-disable testing-library/no-dom-import */
import { render, screen } from '@testing-library/react';
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
  it('should create and render indicator on screen', () => {
    render(<Indicator config={modelIndicator} />);
  })

  it('should render idicator without alarm', () => {
    const withoutAlarm: IndicatorProps = {
      value: 27,
      unit: 'graus',
      name: 'temperatura'
    };
    expect(checkDanger(withoutAlarm)).toBeFalsy();
  })

  it('should render card with danger alert', () => {
    const modelDangerAlert: IndicatorProps = {
      value: 24,
      unit: 'graus',
      name: 'temperatura',
      alarm: {
        condition: 'out_interval',
        values: [26, 29]
      }
    };
    const rendered = render(<Indicator config={modelDangerAlert} />);
    expect(rendered.queryAllByTestId('alert-' + modelDangerAlert.name)).toHaveLength(1);
  })

  it('not should render card with danger alert', () => {
    const withoutDanger: IndicatorProps = {
      value: 26,
      unit: 'graus',
      name: 'temperatura',
      alarm: {
        condition: 'out_interval',
        values: [26, 29]
      }
    };
    const rendered = render(<Indicator config={withoutDanger} />);
    expect(rendered.queryAllByTestId('alert-' + withoutDanger.name)).toHaveLength(0);
  })

  it('should render card without alert config', () => {
    const withoutAlert: IndicatorProps = {
      value: 27,
      unit: 'graus',
      name: 'temperatura',
    };
    const rendered = render(<Indicator config={withoutAlert} />);
    expect(rendered.queryAllByTestId('alert-' + withoutAlert.name)).toHaveLength(0);
  })
})

describe('should check all cases with operator bigger then (>)', () => {
  it('should alarm with value bigger', () => {
    expect(checkDanger(mountModel(30, '>', [29]))).toBeTruthy();
  })

  it('not should alarm with value smaller', () => {
    expect(checkDanger(mountModel(27, '>', [29]))).toBeFalsy();
  })

  it('not should alarm with value equals', () => {
    expect(checkDanger(mountModel(29, '>', [29]))).toBeFalsy();
  })
})

describe('should check all cases with operator less then (<)', () => {
  it('should alarm with value smaller', () => {
    expect(checkDanger(mountModel(27, '<', [29]))).toBeTruthy();
  })

  it('not should alarm with value bigger', () => {
    expect(checkDanger(mountModel(30, '<', [29]))).toBeFalsy();
  })

  it('not should alarm with value equals', () => {
    expect(checkDanger(mountModel(30, '<', [30]))).toBeFalsy();
  })
})

describe('should check all cases with operator check operator greater than (>=)', () => {
  it('should alarm with value equals', () => {
    expect(checkDanger(mountModel(30, '>=', [30]))).toBeTruthy();
  })

  it('not should alarm with value smaller', () => {
    expect(checkDanger(mountModel(10, '>=', [30]))).toBeFalsy();
  })

  it('not should alarm with value bigger', () => {
    expect(checkDanger(mountModel(40, '>=', [30]))).toBeTruthy();
  })
})

describe('should check all cases with lesser than operator (<=)', () => {
  it('should alarm with value equals', () => {
    expect(checkDanger(mountModel(30, '<=', [30]))).toBeTruthy();
  })

  it('should alarm with value smaller', () => {
    expect(checkDanger(mountModel(10, '<=', [30]))).toBeTruthy();
  })

  it('not should alarm with value bigger', () => {
    expect(checkDanger(mountModel(31, '<=', [30]))).toBeFalsy();
  })
})

describe('should check all cases with operator equals (==)', () => {
  it('should alarm with value equals', () => {
    expect(checkDanger(mountModel(30, '==', [30]))).toBeTruthy();
  })

  it('not should alarm when the value is bigger', () => {
    expect(checkDanger(mountModel(31, '==', [30]))).toBeFalsy();
  })

  it('not should alarm when the value is smaller', () => {
    expect(checkDanger(mountModel(29, '==', [30]))).toBeFalsy();
  })

  it('not should alarm when the values differents', () => {
    expect(checkDanger(mountModel(26, '==', [30]))).toBeFalsy();
  })
})

describe('should check all cases with numbers includes in array', () => {
  it('should includes value in values array', () => {
    expect(checkDanger(mountModel(27, 'includes', [26, 27, 28, 29]))).toBeTruthy();
  })

  it('not should includes value in values array', () => {
    expect(checkDanger(mountModel(11, 'includes', [26, 27, 28, 29]))).toBeFalsy();
  })
})

describe('should check all cases with values out interval', () => {
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

  it('the value indicator should show 30', () => {
    expect(render(<Indicator config={modelIndicator} />).queryAllByText('30')).toHaveLength(1);
  })

  it('the name indicator should be temperatura', () => {
    expect(render(<Indicator config={modelIndicator} />).queryAllByText('temperatura')).toHaveLength(1);
  })

  it('the unit indicator should be graus', () => {
    expect(render(<Indicator config={modelIndicator} />).queryAllByText('graus')).toHaveLength(1);
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