export default class Indicator {
  constructor (
    readonly id: number,
    readonly name: string,
    readonly unit: string,
    readonly description: string,
    readonly currentValue: number,
    readonly acceptedValue: number,
    readonly minValue = acceptedValue,
    readonly maxValue = acceptedValue
  ) {
  }

  isOk (): boolean {
    return this.currentValue >= this.minValue && this.currentValue <= this.maxValue
  }
}
