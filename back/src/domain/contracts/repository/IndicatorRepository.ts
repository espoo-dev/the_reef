import { Indicator } from '@/domain/entity'

export interface IndicatorRepository {
  save: (input: Indicator) => Promise<void>
  list: () => Promise<Indicator[]>
  get: (idIndicator: number) => Promise<Indicator>
  remove: (idIndicator: number) => Promise<void>
  clean: () => Promise<void>
}

export namespace IndicatorRepository {
  export type Input = {
    aquariumId: number
    indicatorId: number
  }

  export type Output = {
    indicators: Indicator[]
  }
}
