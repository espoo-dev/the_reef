import Aquarium from "../../../domain/entity/Aquarium";
import AquariumRepository from "../../../domain/repository/AquariumRepository";

export default class AquariumRepositoryMemory implements AquariumRepository {
  aquariums: Aquarium[];

  constructor() {
    this.aquariums = [];
  }

  async save(aquarium: Aquarium): Promise<void> {
    this.aquariums.push(aquarium);
  }

  async list(): Promise<Aquarium[]> {
    return this.aquariums;
  }
}