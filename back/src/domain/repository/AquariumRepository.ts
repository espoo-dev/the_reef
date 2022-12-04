import { Aquarium } from 'domain/entity'

export interface AquariumRepository {
  save: (aquarium: Aquarium) => Promise<Aquarium>
  list: () => Promise<Aquarium[]>
  get: (idAquarium: number) => Promise<Aquarium>
  remove: (idAquarium: number) => Promise<void>
  clean: () => Promise<void>
}
