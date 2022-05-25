import Indicator from '@/domain/entity/Indicator'

interface IndicatorProps {
  id: number
  name: string
  unit: string
  description: string
  currentValue: number
  acceptedValue: number
  minValue?: number
  maxValue?: number
}

const indicatorWithoutMinMax: IndicatorProps = {
  id: 1,
  name: 'Temperature',
  unit: 'celsius',
  description: 'Temperature of the reef',
  currentValue: 0,
  acceptedValue: 26
}

const indicatorDefault: IndicatorProps = {
  id: 1,
  name: 'Temperature',
  unit: 'celsius',
  description: 'Temperature of the reef',
  currentValue: 27,
  acceptedValue: 26,
  minValue: 23,
  maxValue: 27
}

describe('Indicator', () => {
  const sut = (indicatorProp?: IndicatorProps): Indicator => {
    let indicator = { ...indicatorDefault }

    if (indicatorProp) {
      indicator = { ...indicatorProp }
    }

    return new Indicator(
      indicator.id,
      indicator.name,
      indicator.unit,
      indicator.description,
      indicator.currentValue,
      indicator.acceptedValue,
      indicator.minValue,
      indicator.maxValue
    )
  }

  it('should create a Indicator', () => {
    const indicator = sut()
    expect(indicator).toBeDefined()
    expect(indicator.currentValue).toBe(indicator.currentValue)
    expect(indicator.minValue).toBe(indicator.minValue)
    expect(indicator.maxValue).toBe(indicator.maxValue)
  })

  it('should have min a max values equals accepted value when new indicator not contains min and max', () => {
    const indicator = sut(indicatorWithoutMinMax)
    expect(indicator.minValue).toBe(indicator.acceptedValue)
    expect(indicator.maxValue).toBe(indicator.acceptedValue)
  })

  describe('Indicator results', () => {
    it('should return ok when the current value is between min and max values', () => {
      expect(sut().isOk()).toBe(true)
    })

    it('should return not ok when the current value is between min and max values', () => {
      const tempIrregular = 50
      const indicatorNotOk = sut({ ...indicatorDefault, currentValue: tempIrregular })
      expect(indicatorNotOk.isOk()).toBe(false)
    })

    it('should return ok when dont has min and max value and current is equals the value accepted', () => {
      const indicator = sut({ ...indicatorWithoutMinMax, currentValue: indicatorWithoutMinMax.acceptedValue })
      expect(indicator.isOk()).toBe(true)
    })

    it('should return not ok when dont has min and max value and current is less then value accepted', () => {
      const tempIrregular = indicatorWithoutMinMax.acceptedValue - 1
      const indicator = sut({ ...indicatorWithoutMinMax, currentValue: tempIrregular })
      expect(indicator.isOk()).toBe(false)
    })

    it('should return not ok when dont has min and max value and current is bigger then value accepted', () => {
      const tempIrregular = indicatorWithoutMinMax.acceptedValue + 1
      const indicator = sut({ ...indicatorWithoutMinMax, currentValue: tempIrregular })
      expect(indicator.isOk()).toBe(false)
    })
  })
})
