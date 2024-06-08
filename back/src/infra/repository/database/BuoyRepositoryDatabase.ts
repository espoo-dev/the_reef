import { BuoyRepository } from 'domain/repository'
import { Buoy } from '../../../domain/entity'
import { Connection } from 'infra/database'

export class BuoyRepositoryDatabase implements BuoyRepository {
  constructor (readonly connection: Connection) {
  }

  async remove (idBuoy: number): Promise<void> {
    await this.connection.query('DELETE FROM buoys WHERE id = $1', [idBuoy])
  }

  async save (buoy: Buoy): Promise<Buoy> {
    const data = await this.connection.query(`INSERT INTO buoys
    (
      name,
      aquarium_id,
      description,
      current_value,
      last_update
    ) VALUES ($1, $2, $3, $4, NOW()) RETURNING *`, [
      buoy.name,
      buoy.aquariumId,
      buoy.description,
      buoy.currentValue,
    ])
    return new Buoy(
      data[0].id,
      data[0].aquariumId,
      data[0].name,
      data[0].description,
      data[0].currentValue)
  }

  async list (): Promise<Buoy[]> {
    const BuoysData = await this.connection.query('select * from buoys', [])
    const Buoys: Buoy[] = []
    for (const BuoyData of BuoysData) {
      const buoy = new Buoy(
        BuoyData.id,
        BuoyData.aquarium_id,
        BuoyData.name,
        BuoyData.description,
        Boolean(BuoyData.current_value)
      )

      buoy.last_update = BuoyData.last_update
      Buoys.push(buoy)
    }
    return Buoys
  }

  async get (idBuoy: number): Promise<Buoy> {
    const [BuoyData] = await this.connection.query('SELECT * FROM buoys WHERE id = $1', [idBuoy])
    const buoy = new Buoy(BuoyData.id, BuoyData.aquarium_id, BuoyData.name, BuoyData.description, Boolean(BuoyData.current_value))
    return buoy
  }

  async clean (): Promise<void> {
    await this.connection.query('DELETE FROM buoys', [])
  }

  async updateValue (idBuoy: number, value: boolean): Promise<Buoy> {
    const [BuoyUpdated] = await this.connection.query('UPDATE buoys SET current_value = $1, last_update = NOW() WHERE id = $2 returning *', [value, idBuoy])
    const buoy = new Buoy(BuoyUpdated.id, BuoyUpdated.aquarium_id, BuoyUpdated.name, BuoyUpdated.description, Boolean(BuoyUpdated.current_value))
    return buoy
  }
}
