describe('Aquarium', () => {
  it('should create an aquarium', () => {
    const aquarium = new Aquarium('Aquarium 1');
    expect(aquarium.name).toBe('Aquarium 1');
  });
});