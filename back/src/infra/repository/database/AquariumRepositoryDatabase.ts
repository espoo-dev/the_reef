import { Aquarium, Indicator } from '@/domain/entity'
import { AquariumRepository } from '@/domain/contracts/repository'
import { Connection } from '@/infra/database'

export class AquariumRepositoryDatabase implements AquariumRepository {
  constructor (readonly connection: Connection) {}

  async remove (idAquarium: number): Promise<void> {
    await this.connection.query('DELETE FROM aquariums WHERE id = $1', [idAquarium])
  }

  async save (aquarium: Aquarium): Promise<void> {
    await this.connection.query('INSERT INTO aquariums (name) VALUES ($1) RETURNING *', [aquarium.name])
  }

  async list (): Promise<Aquarium[]> {
    const aquariumsData = await this.connection.query('SELECT * FROM aquariums', [])
    const aquariums: Aquarium[] = []
    for (const aquariumData of aquariumsData) {
      aquariums.push(new Aquarium(aquariumData.id, aquariumData.name))
    }
    return aquariums
  }

  async get (idAquarium: number): Promise<Aquarium> {
    const [aquariumData] = await this.connection.query('SELECT * FROM aquariums WHERE id = $1', [idAquarium])
    const indicatorsWithAquarium = await this.connection.query('SELECT * FROM indicators WHERE aquarium_id = $1', [idAquarium])
    const aquarium = new Aquarium(aquariumData.id, aquariumData.name)
    indicatorsWithAquarium.forEach((indicator: Indicator) => {
      aquarium.indicators.push(indicator)
    })

    return aquarium
  }

  async clean (): Promise<void> {
    await this.connection.query('DELETE FROM aquariums', [])
  }
}
