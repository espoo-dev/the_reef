import { Dimensions, Fish } from '@/domain/entity'

export class Aquarium {
  fishs: Fish[] = [];

  constructor (readonly id: number, readonly name: string, readonly dimensions?: Dimensions) {
  }

  getLiters (): number {
    if (!this.dimensions) {
      throw new Error('Aquarium dont have dimensions')
    }
    return this.dimensions.getLiters()
  }

  addFish (newFish: Fish): void {
    if (this.getLitersRemaining() < newFish.litersRequired) {
      throw new Error('Aquarium crowded')
    }
    this.fishs.push(newFish)
  }

  getFishs (): Fish[] {
    return this.fishs
  }

  getLitersRemaining (): number {
    const usedLiters = this.fishs.reduce((total, fish) => {
      return total + fish.litersRequired
    }, 0)
    return this.getLiters() - usedLiters
  }

  removeFish (name: string): void {
    const fishToRemove = this.fishs.find(fish => fish.commonName === name)
    if (!fishToRemove) {
      throw new Error('Fish not found')
    }
    this.fishs = this.fishs.filter(fish => fish.commonName !== name)
  }
}
