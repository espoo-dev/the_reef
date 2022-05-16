import AddFish from "../../../src/application/AddFish";
import Aquarium from "../../../src/domain/entity/Aquarium";
import Dimensions from "../../../src/domain/entity/Dimensions";
import AquariumRepositoryMemory from "../../../src/infra/repository/memory/AquariumRepositoryMemory";

describe('Add fish in aquarium', () => {
  it('should add a fish to a aquarium', async () => {
    const aquariumRepository = new AquariumRepositoryMemory();
    const aquarium = new Aquarium(1, 'My Reef', new Dimensions(50, 50, 50));
    aquariumRepository.save(aquarium);
    const addFish = new AddFish(aquariumRepository);

    const input = {
      aquariumId: aquarium.id,
      name: 'Nemo',
      species: 'clownfish',
      litersRequired: 10
    };
    const output = await addFish.execute(input);
    expect(output.fishs).toHaveLength(1);
  });
});
