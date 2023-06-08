export interface IndicatorHistoricRepository {
  save: (indicatorId: number, newValue: number) => Promise<number>
  list: (indicatorId: number) => Promise<IndicatorHistoric.ListModel>
  historic: (indicatorId: number) => Promise<IndicatorHistoric.HistoricModel>
  clean: () => Promise<void>
}

export namespace IndicatorHistoric {
  export type HistoricModel = Array<{
    hour: string
    yesterday: number
    today: number
  }>

  export type ListModel = Array<{
    created_at: string
    value: number
  }>
}
