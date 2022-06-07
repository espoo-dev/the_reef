import { Aquarium, Fish } from '@/domain/entity'

export interface AquariumRepository {
  save: (input: Aquarium) => Promise<void>
  list: () => Promise<Aquarium[]>
  get: (idAquarium: number) => Promise<Aquarium>
  remove: (idAquarium: number) => Promise<void>
  clean: () => Promise<void>
}

export namespace AquariumRepository {
  export type Input = {
    aquariumId: number
    name: string
    species: string
    litersRequired: number
  }

  export type Output = {
    fishs: Fish[]
  }
}
