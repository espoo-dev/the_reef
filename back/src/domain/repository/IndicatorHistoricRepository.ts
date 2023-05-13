import { IndicatorHistoricModel } from "domain/models"

export interface IndicatorHistoricRepository {
  save: (indicatorID: number, newValue: number) => Promise<number>
  list: (params: IndicatorListHistoric.Params) => Promise<IndicatorListHistoric.Model>
  clean: () => Promise<void>
}

export namespace IndicatorListHistoric {
  export type Params = {
    indicatorID: number
  }

  export type Model = IndicatorHistoricModel
}
