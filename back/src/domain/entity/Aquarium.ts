import { Coral } from './Coral'
import { Dimensions } from './Dimensions'
import { Fish } from './Fish'
import { Indicator } from './Indicator'

export class Aquarium {
  fishs: Fish[] = [];
  indicators: Indicator[] = [];
  corals: Coral[] = [];

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
    const fishToRemove = this.fishs.find(fish => fish.name === name)
    if (!fishToRemove) {
      throw new Error('Fish not found')
    }
    this.fishs = this.fishs.filter(fish => fish.name !== name)
  }

  addIndicator (indicator: Indicator): void {
    this.indicators.push(indicator)
  }

  getIndicators (): Indicator[] {
    return this.indicators
  }

  addCoral (newCoral: Coral): void {
    this.corals.push(newCoral)
  }

  removeCoral (name: string): void {
    const coralToRemove = this.corals.find(coral => coral.name === name)
    if (!coralToRemove){
      throw new Error('Coral not found')
    }
    this.corals = this.corals.filter(coral => coral.name !== name)
  }
}
