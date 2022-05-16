import Aquarium from "../entity/Aquarium";

export default interface AquariumRepository {
  save(aquarium: Aquarium): Promise<void>;
  list(): Promise<Aquarium[]>
}
