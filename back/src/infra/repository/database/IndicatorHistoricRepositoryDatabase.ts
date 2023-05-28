import { IndicatorHistoric, IndicatorHistoricRepository } from 'domain/repository'
import { Connection } from 'infra/database'

export class IndicatorHistoricRepositoryDatabase implements IndicatorHistoricRepository {
  private readonly databaseName = 'public.indicator_historics'
  constructor (readonly connection: Connection) {}

  async save (idIndicator: number, value: number): Promise<number> {
    const historicId = await this.connection.query(`INSERT INTO ${this.databaseName}
    (
      indicator_id,
      value
    ) VALUES ($1, $2) RETURNING id`, [idIndicator, value])
    return historicId[0].id
  }

  async list (indicatorID: number): Promise<IndicatorHistoric.ListModel> {
    const list = await this.connection.query(`
      SELECT * FROM ${this.databaseName}
      WHERE indicator_id=$1 
        AND created_at::DATE >= (current_date - '2 DAY' ::INTERVAL)::DATE 
      ORDER BY created_at ASC`, [indicatorID])

    const formated: IndicatorHistoric.ListModel = []
    list.forEach((element: any) => {
      formated.push({ value: Number(element.value), created_at: element.created_at })
    })
    return formated
  }

  async historic (indicatorID: number): Promise<IndicatorHistoric.HistoricModel> {
    const historic = await this.connection.query(`
      WITH datas AS (
        SELECT EXTRACT('hour' FROM hh) AS h
        FROM GENERATE_SERIES(NOW(), NOW() + '23 hours'::INTERVAL, '1 hour'::INTERVAL) hh
      ) SELECT
        CONCAT(h, 'h') AS hour,
        COALESCE(ROUND(AVG(IH.value) FILTER (WHERE EXTRACT('hour' FROM IH.created_at) = datas.h AND IH.created_at::DATE = (NOW()-'1 DAY'::INTERVAL)::DATE), 2), 0) AS yesterday,
        COALESCE(ROUND(AVG(IH.value) FILTER (WHERE EXTRACT('hour' FROM IH.created_at) = datas.h AND IH.created_at::DATE = NOW()::DATE), 2), 0) AS today
      FROM datas, ${this.databaseName} IH
      WHERE IH.created_at::DATE BETWEEN (NOW() - '2 DAYS'::INTERVAL)::DATE AND NOW()::DATE AND indicator_id = $1
      GROUP BY h
      ORDER BY h ASC`, [indicatorID])

    const formated: IndicatorHistoric.HistoricModel = []
    historic.forEach((element: any) => {
      formated.push({ hour: element.hour, today: Number(element.today), yesterday: Number(element.yesterday) })
    })
    return formated
  }
  
  async clean (): Promise<void> {
    await this.connection.query(`DELETE FROM ${this.databaseName}`, [])
  }
}
