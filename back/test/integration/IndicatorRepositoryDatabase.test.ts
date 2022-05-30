import { Indicator } from '@/domain/entity'
import { IndicatorRepository } from '@/domain/repository'
import { Connection, PgPromiseConnectionAdapter } from '@/infra/database'
import { IndicatorRepositoryDatabase } from '@/infra/repository/database/IndicatorRepositoryDatabase'

let connection: Connection
let indicatorRepository: IndicatorRepository

const temperature = {
  id: 1,
  name: 'Temperature',
  unit: 'celsius',
  description: 'Temperature of the reef',
  currentValue: 27,
  acceptedValue: 26,
  minValue: 25,
  maxValue: 27
}

beforeEach(async () => {
  connection = new PgPromiseConnectionAdapter()
  indicatorRepository = new IndicatorRepositoryDatabase(connection)
  await indicatorRepository.clean()
})

const saveIndicator = async (): Promise<void> => {
  const indicator = new Indicator(
    temperature.id,
    temperature.name,
    temperature.unit,
    temperature.description,
    temperature.currentValue,
    temperature.acceptedValue,
    temperature.minValue,
    temperature.maxValue
  )
  await indicatorRepository.save(indicator)
}

describe('IndicatorRepositoryDatabase', () => {
  it('should add a new indicator in database', async () => {
    await saveIndicator()
    expect(await indicatorRepository.list()).toHaveLength(1)
  })

  it('should return all indicators from database', async () => {
    await saveIndicator()
    const indicators = await indicatorRepository.list()
    indicators.forEach(indicator => {
      expect(indicator.currentValue).toBe(temperature.currentValue)
      expect(indicator.acceptedValue).toBe(temperature.acceptedValue)
      expect(indicator.minValue).toBe(temperature.minValue)
      expect(indicator.maxValue).toBe(temperature.maxValue)
    })
    expect(indicators).toHaveLength(1)
  })

  it('should remove indicator by id from database', async () => {
    await saveIndicator()
    const indicators = await indicatorRepository.list()
    await indicatorRepository.remove(indicators[0].id)
    expect(await indicatorRepository.list()).toHaveLength(0)
  })

  it('should return a indicator by index', async () => {
    await saveIndicator()
    const indicators = await indicatorRepository.list()
    const indicatorFounded = await indicatorRepository.get(indicators[0].id)
    expect(indicatorFounded.name).toBe(temperature.name)
    expect(indicatorFounded.currentValue).toBe(temperature.currentValue)
    expect(indicatorFounded.minValue).toBe(temperature.minValue)
    expect(indicatorFounded.maxValue).toBe(temperature.maxValue)
  })
})

afterEach(async () => {
  await connection.close()
})
