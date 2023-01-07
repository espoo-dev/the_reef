export interface IndicatorHistoricRepository {
  save: (indicatorId: number, newValue: number) => Promise<number>
  clean: () => Promise<void>
}
