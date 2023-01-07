import { IndicatorHistoricRepository } from 'domain/repository'
import { Connection } from 'infra/database'

export class IndicatorHistoricRepositoryDatabase implements IndicatorHistoricRepository {
  private readonly databaseName = 'indicator_historics'
  constructor (readonly connection: Connection) {}

  async save (idIndicator: number, value: number): Promise<number> {
    const historicId = await this.connection.query(`INSERT INTO ${this.databaseName}
    (
      indicator_id,
      value
    ) VALUES ($1, $2) RETURNING id`, [idIndicator, value])
    return historicId[0].id
  }

  async clean (): Promise<void> {
    await this.connection.query(`DELETE FROM ${this.databaseName}`, [])
  }
}
