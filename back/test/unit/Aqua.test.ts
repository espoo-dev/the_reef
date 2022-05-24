import { Aquarium, Dimensions } from '@/domain/entity'
import { mockNemo } from '../mock/Fish'

const mockFish = mockNemo

describe('Aquarium', () => {
  const sut = (): Aquarium => {
    return new Aquarium(1, 'My Reef', new Dimensions(50, 50, 50))
  }

  it('should create an aquarium', () => {
    const aquarium = sut()
    expect(aquarium.name).toBe('My Reef')
  })

  it('should return total liters the aquarium', () => {
    const aquarium = sut()
    expect(aquarium.getLiters()).toBe(125)
  })

  it('should return error when dont have dimensions', () => {
    const aquarium = new Aquarium(1, 'My Reef')
    expect(() => aquarium.getLiters()).toThrowError(
      'Aquarium dont have dimensions'
    )
  })

  it('should return liters remaing without fishs', () => {
    const aquarium = sut()
    expect(aquarium.getLitersRemaining()).toBe(125)
  })

  it('should return liters remaing with a fish', () => {
    const aquarium = sut()
    aquarium.addFish({ ...mockFish, litersRequired: 25 })
    expect(aquarium.getLitersRemaining()).toBe(100)
  })

  describe('add fish', () => {
    it('should add a new fish', () => {
      const aquarium = sut()
      const fish = { ...mockFish, litersRequired: 10 }
      aquarium.addFish(fish)
      expect(aquarium.getFishs()).toContain(fish)
    })

    it('should add a new fish only when have space', () => {
      const aquariumWith125Liters = sut()
      const smallFish = { ...mockFish, litersRequired: 50 }
      expect(() => aquariumWith125Liters.addFish(smallFish)).not.toThrowError(
        'Aquarium crowded'
      )
    })

    it('not should add a new fish when dont have space', () => {
      const aquariumWith125Liters = sut()
      const bigShark = { ...mockFish, type: 'Shark', litersRequired: 200 }
      expect(() => aquariumWith125Liters.addFish(bigShark)).toThrowError(
        'Aquarium crowded'
      )
    })
  })

  describe('remove fish', () => {
    it('should remove a fish', () => {
      const aquarium = sut()
      const fish = { ...mockFish, commonName: 'Nemo', litersRequired: 10 }
      aquarium.addFish({ ...mockFish, commonName: 'Dory', litersRequired: 10 })
      aquarium.addFish(fish)
      aquarium.removeFish('Nemo')
      expect(aquarium.getFishs()).not.toContain(fish)
      expect(aquarium.fishs.length).toBe(1)
    })

    it('not should remove fish when name not found', () => {
      const aquarium = sut()
      expect(() => aquarium.removeFish('Nemo')).toThrowError('Fish not found')
    })
  })
})
