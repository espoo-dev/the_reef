import { Fan } from 'domain/entity'

export interface FanRepository {
  save: (fan: Fan) => Promise<Fan>
  list: () => Promise<Fan[]>
  get: (idFan: number) => Promise<Fan>
  remove: (idFan: number) => Promise<void>
  clean: () => Promise<void>
  updateOn: (fanId: number, on: boolean) => Promise<Fan>
}
