export class Dimensions {
  length: number;
  width: number;
  height: number;

  constructor (length: number, width: number, height: number) {
    this.length = length
    this.width = width
    this.height = height
  }

  getLiters (): number {
    return (this.length * this.width * this.height) / 1000
  }
}
