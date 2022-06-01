import { Indicator } from '@/domain/entity'

interface IndicatorProps {
  id: number
  name: string
  unit: string
  description: string
  currentValue: number
  acceptedValue: number
  minValue?: number
  maxValue?: number
  aquariumId: number
}

const indicatorWithoutMinMax: IndicatorProps = {
  id: 1,
  name: 'Temperature',
  unit: 'celsius',
  description: 'Temperature of the reef',
  currentValue: 0,
  acceptedValue: 26,
  aquariumId: 1
}

const indicatorDefault: IndicatorProps = {
  id: 1,
  name: 'Temperature',
  unit: 'celsius',
  description: 'Temperature of the reef',
  currentValue: 27,
  acceptedValue: 26,
  minValue: 23,
  maxValue: 27,
  aquariumId: 1
}

describe('Indicator', () => {
  const sut = (indicatorProp?: IndicatorProps): Indicator => {
    let indicator = { ...indicatorDefault }

    if (indicatorProp) {
      indicator = { ...indicatorProp }
    }

    return new Indicator(
      indicator.id,
      indicator.aquariumId,
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

    it('should ok to float numbers in range', () => {
      const pH = {
        id: 1,
        name: 'pH',
        unit: '',
        description: 'pH of the reef',
        currentValue: 8.3,
        acceptedValue: 8.3,
        minValue: 8.2,
        maxValue: 8.4,
        aquariumId: 1
      }
      expect(sut(pH).isOk()).toBe(true)
    })

    it('should not ok when is outside of range using flaot numbers', () => {
      const pH = {
        id: 1,
        name: 'pH',
        unit: '',
        description: 'pH of the reef',
        currentValue: 8.1,
        acceptedValue: 8.3,
        minValue: 8.2,
        maxValue: 8.4,
        aquariumId: 1
      }
      expect(sut(pH).isOk()).toBe(false)
    })

    it('should update current value', () => {
      const temperature = sut()
      temperature.update(30)
      expect(temperature.currentValue).toBe(30)
      expect(temperature.isOk()).toBe(false)
    })

    it('should is in correct aquarium', () => {
      const indicatorTest = new Indicator(
        indicatorDefault.id,
        indicatorDefault.aquariumId,
        indicatorDefault.name,
        indicatorDefault.unit,
        indicatorDefault.description,
        indicatorDefault.currentValue,
        indicatorDefault.acceptedValue
      )
      expect(indicatorTest.aquariumId).toBe(1)
    })
  })
})
