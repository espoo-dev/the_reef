export class Fan {
  on: boolean = false;

  constructor (
    readonly id: number,
    readonly name: string,
    readonly aquariumId: number,
    on: boolean = false
  ) {
    this.on = on;
  }

  turnOn (): void {
    this.on = true
  }

  turnOff (): void {
    this.on = false
  }
}
