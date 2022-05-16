import Fish from "../domain/entity/Fish";
import AquariumRepository from "../domain/repository/AquariumRepository";

export default class AddFish {
  constructor(private aquariumRepository: AquariumRepository) {}

  async execute(input: Input): Promise<Output> {
    const fish = new Fish(input.name, input.species, input.litersRequired);
    const aquarium = await this.aquariumRepository.get(input.aquariumId);
    aquarium.addFish(fish);

    return {
      fishs: aquarium.getFishs()
    }
  }
}

type Input = {
  aquariumId: number;
  name: string;
  species: string;
  litersRequired: number;
}

type Output = {
  fishs: Fish[];
}
