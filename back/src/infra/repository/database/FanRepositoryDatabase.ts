import { Fan } from '../../../domain/entity'
import { Connection } from 'infra/database'
import { FanRepository } from 'domain/repository'

export class FanRepositoryDatabase implements FanRepository {
  constructor (readonly connection: Connection) {}

  private tableName = 'fans'

  async remove (idIndicator: number): Promise<void> {
    await this.connection.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [idIndicator])
  }

  async save (fan: Fan): Promise<Fan> {
    const data = await this.connection.query(`INSERT INTO ${this.tableName}
    (
      name,
      aquarium_id
    ) VALUES ($1, $2) RETURNING *`, [
      fan.name,
      fan.aquariumId,
    ])
    return new Fan(
      data[0].id,
      data[0].name,
      data[0].aquariumId
    )
  }

  async list (): Promise<Fan[]> {
    const fansData = await this.connection.query(`select * from ${this.tableName}`, [])
    const fans: Fan[] = []
    for (const fanData of fansData) {
      fans.push(new Fan(
        fanData.id,
        fanData.name,
        fanData.aquarium_id,
        fanData.on
      ))
    }
    return fans
  }

  async get (idFan: number): Promise<Fan> {
    const [fanData] = await this.connection.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [idFan])
    const fan = new Fan(fanData.id, fanData.name, fanData.aquarium_id, fanData.on)
    return fan
  }

  async clean (): Promise<void> {
    await this.connection.query(`DELETE FROM ${this.tableName}`, [])
  }
}
