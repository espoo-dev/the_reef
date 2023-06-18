import { Indicator } from '../../../domain/entity'
import { IndicatorRepository } from 'domain/repository'
import { Connection } from 'infra/database'

export class IndicatorRepositoryDatabase implements IndicatorRepository {
  constructor (readonly connection: Connection) {}

  async remove (idIndicator: number): Promise<void> {
    await this.connection.query('DELETE FROM indicators WHERE id = $1', [idIndicator])
  }

  async save (indicator: Indicator): Promise<Indicator> {
    const data = await this.connection.query(`INSERT INTO indicators
    (
      name,
      aquarium_id,
      unit,
      description,
      current_value,
      accepted_value,
      min_value,
      max_value
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [
      indicator.name,
      indicator.aquariumId,
      indicator.unit,
      indicator.description,
      indicator.currentValue,
      indicator.acceptedValue,
      indicator.minValue,
      indicator.maxValue
    ])
    return new Indicator(
      data[0].id,
      data[0].aquariumId,
      data[0].name,
      data[0].unit,
      data[0].description,
      data[0].currentValue,
      data[0].acceptedValue,
      data[0].minValue,
      data[0].maxValue)
  }

  async list (): Promise<Indicator[]> {
    const indicatorsData = await this.connection.query(`
      SELECT 
        id,
        aquarium_id,
        "name",
        unit, 
        description,
        current_value,
        accepted_value,
        min_value,
        max_value,
        TO_CHAR(created_at, 'DD/MM/YY HH24:MI:SS') AS created_at 
      FROM indicators`, [])

    const indicators: Indicator[] = []
    for (const indicatorData of indicatorsData) {
      indicators.push(new Indicator(
        indicatorData.id,
        indicatorData.aquarium_id,
        indicatorData.name,
        indicatorData.unit,
        indicatorData.description,
        Number(indicatorData.current_value),
        Number(indicatorData.accepted_value),
        Number(indicatorData.min_value),
        Number(indicatorData.max_value),
        indicatorData.created_at,
      ))
    }
    return indicators
  }

  async get (idIndicator: number): Promise<Indicator> {
    const [indicatorData] = await this.connection.query('SELECT * FROM indicators WHERE id = $1', [idIndicator])
    const indicator = new Indicator(indicatorData.id, indicatorData.aquarium_id, indicatorData.name, indicatorData.unit, indicatorData.description, Number(indicatorData.current_value), Number(indicatorData.accepted_value), Number(indicatorData.min_value), Number(indicatorData.max_value))
    return indicator
  }

  async clean (): Promise<void> {
    await this.connection.query('DELETE FROM indicators', [])
  }

  async updateValue (idIndicator: number, value: number): Promise<Indicator> {
    const [indicatorUpdated] = await this.connection.query('UPDATE indicators SET current_value = $1 WHERE id = $2 returning *', [value, idIndicator])
    const indicator = new Indicator(indicatorUpdated.id, indicatorUpdated.aquarium_id, indicatorUpdated.name, indicatorUpdated.unit, indicatorUpdated.description, Number(indicatorUpdated.current_value), Number(indicatorUpdated.accepted_value), Number(indicatorUpdated.min_value), Number(indicatorUpdated.max_value))
    return indicator
  }
}
