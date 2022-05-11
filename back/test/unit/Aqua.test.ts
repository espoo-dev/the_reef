describe('Aquarium', () => {
  it('should create an aquarium', () => {
    const aquarium = new Aquarium('My Reef');
    expect(aquarium.name).toBe('My Reef');
  });

  it('should return total liters the aquarium', () => {
    const dimensions = new Dimensions(10, 10, 10);
    const aquarium = new Aquarium('My Reef', dimensions);
    expect(aquarium.getLiters()).toBe(125);
  });

  it('should add a fish', () => {
    const dimensions = new Dimensions(10, 10, 10);
    const aquarium = new Aquarium('My Reef', dimensions);
    const fish = new Fish('Nemo', 'clownfish', 1);
    aquarium.addFish(fish);
    expect(aquarium.getFishs()).toBe([{ name: 'Nemo', type: 'clownfish' }]);
  });
});