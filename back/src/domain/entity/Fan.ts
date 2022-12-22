export class Fan {
  name: string;
  on: boolean = false;

  constructor (name: string) {
    this.name = name
  }

  turnOn (): void {
    this.on = true
  }

  turnOff (): void {
    this.on = false
  }
}
