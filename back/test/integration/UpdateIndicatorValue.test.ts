import { UpdateIndicatorValue } from '@/application/UpdateIndicatorValue'
import { Indicator } from '@/domain/entity'
import RepositoryFactory from '@/domain/factory/RepositoryFactory'
import { IndicatorRepository } from '@/domain/repository'
import { PgPromiseConnectionAdapter } from '@/infra/database'
import DatabaseRepositoryFactory from '@/infra/factory/DatabaseRepositoryFactory'

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
      value: 23
    }

    const output = await updateIndicatorValue.execute(input)
    expect(output.currentValue).toBe(input.value)
    expect(output.isOk).toBeFalsy()
  })
})

afterEach(async () => {
  await connection.close()
})
