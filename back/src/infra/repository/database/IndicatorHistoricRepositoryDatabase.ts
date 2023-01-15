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

  async list (idIndicator: number): Promise<Array<{created_at: string, value: number}>> {
    const historic = await this.connection.query(`SELECT * FROM ${this.databaseName}
    WHERE indicator_id=$1 and created_at::date >= (current_date - '2 day' ::interval)::date order by created_at asc`, [idIndicator])

    const formated: Array<{created_at: string, value: number}> = []
    historic.forEach((element: any) => {
      formated.push({
        value: element.value,
        created_at: element.created_at
      })
    })
    return formated
  }

  async clean (): Promise<void> {
    await this.connection.query(`DELETE FROM ${this.databaseName}`, [])
  }
}
