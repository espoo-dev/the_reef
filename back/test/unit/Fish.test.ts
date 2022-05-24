import { Fish } from '@/domain/entity'
import { mockNemo } from '../mock/Fish'

const mockFish = mockNemo

describe('Fish', () => {
  const sut = (): Fish => {
    return new Fish(
      mockFish.commonName,
      mockFish.scientificName,
      mockFish.type,
      mockFish.litersRequired,
      mockFish.picture,
      mockFish.description,
      mockFish.reefSafe,
      mockFish.fishAvoid,
      mockFish.difficulty
    )
  }
  it('should create a fish with a correct name', () => {
    const fish = sut()
    expect(fish.commonName).toBe(mockFish.commonName)
  })
  it('should create a fish with a correct scientific name', () => {
    const fish = sut()
    expect(fish.scientificName).toBe(mockFish.scientificName)
  })
  it('should create a fish with a correct type', () => {
    const fish = sut()
    expect(fish.type).toBe(mockFish.type)
  })
  it('should create a fish with correct liters required', () => {
    const fish = sut()
    expect(fish.litersRequired).toBe(mockFish.litersRequired)
  })
  it('should create a fish with a correct image', () => {
    const fish = sut()
    expect(fish.picture).toBe(mockFish.picture)
  })
  it('should create a fish with a correct description', () => {
    const fish = sut()
    expect(fish.description).toBe(mockFish.description)
  })
  it('should create a fish with a correct reef safe attribute', () => {
    const fish = sut()
    expect(fish.reefSafe).toBe(mockFish.reefSafe)
  })

  it('should create a fish with a correct list of fishes to avoid', () => {
    const fish = sut()
    expect(fish.fishAvoid).toBe(mockFish.fishAvoid)
  })
  it('should create a fish with a correct difficulty', () => {
    const fish = sut()
    expect(fish.difficulty).toBe(mockFish.difficulty)
    mockFish.difficulty = 'Need more careful'
    const fishMoreDifficult = sut()
    expect(fishMoreDifficult.difficulty).toBe(mockFish.difficulty)
    mockFish.difficulty = 'Only experients aquarists'
    const fishSuperDifficult = sut()
    expect(fishSuperDifficult.difficulty).toBe(mockFish.difficulty)
  })
})
