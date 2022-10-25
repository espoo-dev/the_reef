import { UpdateIndicatorValue } from '../../src/application/UpdateIndicatorValue'
import { Indicator } from '../../src/domain/entity'
import RepositoryFactory from '../../src/domain/factory/RepositoryFactory'
import { IndicatorRepository } from '../../src/domain/repository'
import { PgPromiseConnectionAdapter } from '../../src/infra/database'
import DatabaseRepositoryFactory from '../../src/infra/factory/DatabaseRepositoryFactory'

const temperatureIndicator = {
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

let connection = new PgPromiseConnectionAdapter()
let indicatorRepository: IndicatorRepository
let repositoryFactory: RepositoryFactory

beforeEach(async () => {
  connection = new PgPromiseConnectionAdapter()
  repositoryFactory = new DatabaseRepositoryFactory(connection)
  indicatorRepository = repositoryFactory.createIndicatorRepository()
  await indicatorRepository.clean()
})

describe('Update current value of Indicator', () => {
  it('should update indicator value', async () => {
    const indicator = new Indicator(
      temperatureIndicator.id,
      temperatureIndicator.aquariumId,
      temperatureIndicator.name,
      temperatureIndicator.unit,
      temperatureIndicator.description,
      temperatureIndicator.currentValue,
      temperatureIndicator.acceptedValue,
      temperatureIndicator.minValue,
      temperatureIndicator.maxValue
    )
    await indicatorRepository.save(indicator)
    const indicators = await indicatorRepository.list()

    const updateIndicatorValue = new UpdateIndicatorValue(repositoryFactory)

    const input = {
      indicatorId: indicators[0].id,
      newValue: 23
    }

    const output = await updateIndicatorValue.execute(input)
    expect(output.currentValue).toBe(input.newValue)
    expect(output.isOk).toBeFalsy()
  })
})

afterEach(async () => {
  await connection.close()
})
