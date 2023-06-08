import { Aquarium, Dimensions, Indicator } from '../../src/domain/entity'
import { AquariumRepository, IndicatorHistoricRepository, IndicatorRepository } from '../../src/domain/repository'
import { Connection, PgPromiseConnectionAdapter } from '../../src/infra/database'
import { AquariumRepositoryDatabase, IndicatorHistoricRepositoryDatabase } from '../../src/infra/repository/database'
import { IndicatorRepositoryDatabase } from '../../src/infra/repository/database/IndicatorRepositoryDatabase'

let connection: Connection
let indicatorRepository: IndicatorRepository
let indicatorHistoricRepository: IndicatorHistoricRepository
let aquariumRepository: AquariumRepository

const temperature = {
  id: 1,
  aquariumId: 1,
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
  indicatorHistoricRepository = new IndicatorHistoricRepositoryDatabase(connection)
  aquariumRepository = new AquariumRepositoryDatabase(connection)
  await indicatorRepository.clean()
  await indicatorHistoricRepository.clean()
})

const saveIndicator = async (): Promise<void> => {
  const aquarium = new Aquarium(1, 'Reef Indicator', new Dimensions(50, 50, 50))
  await aquariumRepository.save(aquarium)
  const aquariums = await aquariumRepository.list()

  const indicator = new Indicator(
    temperature.id,
    aquariums[0].id,
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

describe('IndicatorHistoricRepository', () => {
  it('should return all historic by indicator index from database', async () => {
    await saveIndicator()
    const indicators = await indicatorRepository.list()
    const indicatorId = indicators[0].id;
    const newValue = 28.3;
    indicatorHistoricRepository.save(indicatorId, newValue)
    const historic = await indicatorHistoricRepository.list(indicators[0].id)
    expect(historic[0].value).toBe(newValue)
  })
})

describe('IndicatorHistoricRepository', () => {
  it('should return the hourly average of the indicator index', async () => {
    await saveIndicator()
    const indicators = await indicatorRepository.list()
    const indicatorID = indicators[0].id
    await indicatorHistoricRepository.save(indicatorID, 10)
    const historic = await indicatorHistoricRepository.historic(indicatorID)
    expect(historic[0].hour).toBe(String("0h"))
  })
})

afterEach(async () => {
  await connection.close()
})
