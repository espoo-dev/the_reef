import Aquarium from "../../src/domain/entity/Aquarium";
import Dimensions from "../../src/domain/entity/Dimensions";
import Fish from "../../src/domain/entity/Fish";

describe('Aquarium', () => {
  it('should create an aquarium', () => {
    const aquarium = new Aquarium('My Reef');
    expect(aquarium.name).toBe('My Reef');
  });

  it('should return total liters the aquarium', () => {
    const dimensions = new Dimensions(50, 50, 50);
    const aquarium = new Aquarium('My Reef', dimensions);
    expect(aquarium.getLiters()).toBe(125);
  });

  it('should return error when dont have dimensions', () => {
    const aquarium = new Aquarium('My Reef');
    expect(() => aquarium.getLiters()).toThrowError('Aquarium dont have dimensions');
  })

  it('should add a new fish', () => {
    const dimensions = new Dimensions(10, 10, 10);
    const aquarium = new Aquarium('My Reef', dimensions);
    const fish = new Fish('Nemo', 'clownfish', 10);
    aquarium.addFish(fish);
    expect(aquarium.getFishs()).toContain(fish);
  });

  it('should remove a fish', () => {
    const aquarium = new Aquarium('My Reef');
    const fish = new Fish('Nemo', 'clownfish', 10);
    aquarium.addFish(fish);
    aquarium.removeFish('Nemo');
    expect(aquarium.getFishs()).not.toContain(fish);
  })

  it.skip('should add a new fish only when have space', () => {})
});