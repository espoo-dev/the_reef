import Dimensions from "./Dimensions";

export default class Aquarium {
  name: string;
  dimensions?: Dimensions;

  constructor(name: string, dimensions?: Dimensions) {
    this.name = name;
  }

  getLiters(): number {
    return this.dimensions.getLiters();
  }
}