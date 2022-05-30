export class Indicator {
  currentValue: number

  constructor (
    readonly id: number,
    // readonly aquariumId: number,
    readonly name: string,
    readonly unit: string,
    readonly description: string,
    currentValue: number,
    readonly acceptedValue: number,
    readonly minValue = acceptedValue,
    readonly maxValue = acceptedValue
  ) {
    this.currentValue = currentValue
  }

  isOk (): boolean {
    return this.currentValue >= this.minValue && this.currentValue <= this.maxValue
  }

  update (value: number): void {
    this.currentValue = value
  }
}
