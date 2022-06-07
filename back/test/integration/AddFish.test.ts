import { AddFishController } from '@/application'
import { Aquarium, Dimensions } from '@/domain/entity'
import { setupAddFish } from '@/domain/usecases'
import { AquariumRepositoryMemory } from '@/infra/repository/memory'

describe('Add fish in aquarium', () => {
  it('should add a fish to a aquarium', async () => {
    const aquariumRepository = new AquariumRepositoryMemory()
    const aquarium = new Aquarium(1, 'My Reef', new Dimensions(50, 50, 50))
    await aquariumRepository.save(aquarium)

    const addFish = new AddFishController(setupAddFish(aquariumRepository))

    const input = {
      aquariumId: aquarium.id,
      name: 'Nemo',
      species: 'clownfish',
      litersRequired: 10
    }

    const output = await addFish.execute(input)
    expect(output).toBeUndefined()
  })
})
