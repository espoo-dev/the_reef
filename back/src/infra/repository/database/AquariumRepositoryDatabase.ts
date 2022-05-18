import Aquarium from "../../../domain/entity/Aquarium";
import AquariumRepository from "../../../domain/repository/AquariumRepository";
import Connection from "../../database/Connection";

export default class AquariumRepositoryDatabase implements AquariumRepository {

  constructor(readonly connection: Connection) {}

  async remove(idAquarium: number): Promise<void> {
    await this.connection.query("delete from aquariums where id = $1", [idAquarium]);
  }

  async save(aquarium: Aquarium): Promise<void> {
    await this.connection.query(`insert into aquariums (name) 
      values ($1) returning *`, [aquarium.name]);
  }

  async list(): Promise<Aquarium[]> {
    const aquariumsData = await this.connection.query("select * from aquariums", []);
    const aquariums: Aquarium[] = [];
    for (const aquariumData of aquariumsData) {
      aquariums.push(new Aquarium(aquariumData.id, aquariumData.name));
    }
    return aquariums;
  }

  async get(idAquarium: number): Promise<Aquarium> {
    const [aquariumData] = await this.connection.query("select * from aquariums where id = $1", [idAquarium]);
    return new Aquarium(aquariumData.id, aquariumData.name);
  }

  async clean(): Promise<void> {
    await this.connection.query("delete from aquariums", []);
  }
}
