import { AddFish } from '@/application'
import { Aquarium, Dimensions } from '@/domain/entity'
import { AquariumRepositoryMemory } from '@/infra/repository/memory'
import { mockNemo } from '../mock/Fish'

describe('Add fish in aquarium', () => {
  it('should add a fish to a aquarium', async () => {
    const aquariumRepository = new AquariumRepositoryMemory()
    const aquarium = new Aquarium(1, 'My Reef', new Dimensions(50, 50, 50))
    await aquariumRepository.save(aquarium)
    const addFish = new AddFish(aquariumRepository)

    const input = {
      aquariumId: aquarium.id,
      ...mockNemo,
      litersRequired: 10
    }
    const output = await addFish.execute(input)
    expect(output.fishs).toHaveLength(1)
  })
})
