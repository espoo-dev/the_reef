export interface IndicatorHistoricRepository {
  save: (indicatorId: number, newValue: number) => Promise<number>
  list: (indicatorId: number) => Promise<{created_at: string, value: number}[]>
  clean: () => Promise<void>
}
