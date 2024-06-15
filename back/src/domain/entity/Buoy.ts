export class Buoy {
  currentValue: boolean;
  last_update!: string;

  constructor (
    readonly id: number,
    readonly aquariumId: number,
    readonly name: string,
    readonly description: string,
    currentValue: boolean
  ) {
    this.currentValue = currentValue
  }

  isOn (): boolean {
    return this.currentValue === true
  }

  update (newValue: boolean): void {
    this.currentValue = newValue
  }
}
