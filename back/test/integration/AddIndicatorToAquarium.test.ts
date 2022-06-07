import { AddIndicatorToAquarium } from '@/application'
import { Aquarium, Dimensions, Indicator } from '@/domain/entity'
import { AquariumRepository, IndicatorRepository } from '@/domain/contracts/repository'
import { PgPromiseConnectionAdapter } from '@/infra/database'
import { AquariumRepositoryDatabase } from '@/infra/repository/database'
import { IndicatorRepositoryDatabase } from '@/infra/repository/database/IndicatorRepositoryDatabase'
import { setupAddIndicatorToAquarium } from '@/domain/usecases'

let connection = new PgPromiseConnectionAdapter()
let aquariumRepository: AquariumRepository
let indicatorRepository: IndicatorRepository

beforeEach(async () => {
  connection = new PgPromiseConnectionAdapter()
  aquariumRepository = new AquariumRepositoryDatabase(connection)
  indicatorRepository = new IndicatorRepositoryDatabase(connection)
  await aquariumRepository.clean()
  await indicatorRepository.clean()
})

describe('Add indicator in aquarium', () => {
  it('should add a new indicator to a aquarium', async () => {
    const addIndicatorToAquarium = new AddIndicatorToAquarium(
      setupAddIndicatorToAquarium(indicatorRepository)
    )
    
    const aquarium = new Aquarium(1, 'Reef Indicator', new Dimensions(50, 50, 50))
    await aquariumRepository.save(aquarium)
    const aquariums = await aquariumRepository.list()

    const temperatureIndicator = new Indicator(
      1,
      aquariums[0].id,
      'Temperature',
      'celsius',
      'Temperature indicator',
      0, 26, 23, 27
    )

    await indicatorRepository.save(temperatureIndicator)
    const indicators = await indicatorRepository.list()

    const input = {
      aquariumId: aquariums[0].id,
      indicatorId: indicators[0].id
    }

    const output = await addIndicatorToAquarium.execute(input)
    expect(output).toBeUndefined()
  })
})

afterEach(async () => {
  await connection.close()
})
