import { Buoy } from 'domain/entity'

export interface BuoyRepository {
  save: (Buoy: Buoy) => Promise<Buoy>
  list: () => Promise<Buoy[]>
  get: (idBuoy: number) => Promise<Buoy>
  remove: (idBuoy: number) => Promise<void>
  updateValue: (idBuoy: number, value: boolean) => Promise<Buoy>
  clean: () => Promise<void>
}
