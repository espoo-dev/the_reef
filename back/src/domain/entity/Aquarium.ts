import Dimensions from "./Dimensions";
import Fish from "./Fish";

export default class Aquarium {
  name: string;
  dimensions?: Dimensions;
  fishs: Fish[] = [];

  constructor(name: string, dimensions?: Dimensions) {
    this.name = name;
    this.dimensions = dimensions;
  }

  getLiters(): number {
    if (!this.dimensions) {
      throw new Error("Aquarium dont have dimensions");
    }
    return this.dimensions.getLiters();
  }

  addFish(fish: Fish): void {
    this.fishs.push(fish);
  }

  getFishs(): Fish[] {
    return this.fishs;
  }

  removeFish(name: string): void {
    this.fishs.forEach((fish, index) => {
      if (fish.name === name) {
        this.fishs.splice(index, 1);
      }
    })
  }

}