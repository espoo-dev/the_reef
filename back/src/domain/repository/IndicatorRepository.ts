import { Indicator } from '@/domain/entity'

export interface IndicatorRepository {
  save: (indicator: Indicator) => Promise<void>
  list: () => Promise<Indicator[]>
  get: (idIndicator: number) => Promise<Indicator>
  remove: (idIndicator: number) => Promise<void>
  clean: () => Promise<void>
  updateValue: (idIndicator: number, value: number) => Promise<Indicator>
}
