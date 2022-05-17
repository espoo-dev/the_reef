import Aquarium from "../../../domain/entity/Aquarium";
import AquariumRepository from "../../../domain/repository/AquariumRepository";

export default class AquariumRepositoryMemory implements AquariumRepository {
  aquariums: Aquarium[];

  constructor() {
    this.aquariums = [];
  }
  async remove(idAquarium: number): Promise<void> {
    this.aquariums.forEach((aquarium, index) => {
      if (aquarium.id === idAquarium) {
        this.aquariums.splice(index, 1);
      }
    });
  }

  async save(aquarium: Aquarium): Promise<void> {
    this.aquariums.push(aquarium);
  }

  async list(): Promise<Aquarium[]> {
    return this.aquariums;
  }

  async get(idAquarium: number): Promise<Aquarium> {
    const aquarium = this.aquariums.find(aquarium => aquarium.id === idAquarium);
    if (!aquarium) {
      throw new Error("Aquarium not found");
    }
    return aquarium;
  }
}