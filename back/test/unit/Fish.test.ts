import { Fish } from '@/domain/entity';

const mockFish: Fish = {
  name: 'Nemo',
  type: 'Clown',
  litersRequired: 10
};

describe('Fish', () => {
  const sut = (): Fish => {
    return new Fish(mockFish.name, mockFish.type, mockFish.litersRequired);
  };
  it('should create a fish with a correct name', () => {
    const fish = sut();
    expect(fish.name).toBe(mockFish.name);
  });
  it('should create a fish with a correct type', () => {
    const fish = sut();
    expect(fish.type).toBe(mockFish.type);
  });
  it('should create a fish with correct liters required', () => {
    const fish = sut();
    expect(fish.litersRequired).toBe(mockFish.litersRequired);
  });
});
