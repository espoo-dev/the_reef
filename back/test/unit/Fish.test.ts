import { Fish } from "../../src/domain/entity"

describe('Fish',() => {
  let fish!:Fish
  const mockFish = {
    name: 'Sargentinho',
    type: 'sea',
    litersRequired: 40
  }
  
  const sut = (mock: Fish = mockFish): Fish => {
    return new Fish(mock.name, mock.type, mock.litersRequired)
  }

  beforeEach(() => {
    fish = sut()
  })

  it('should create a new fish with correct name', () => {
    expect(fish.name).toBe(mockFish.name) 
  });

  it('should create a new fish with other name', () => {
    let fishName = 'ocellaris'
    let newFish = sut({name: fishName, litersRequired: 30, type: 'fresh'})
    expect(newFish.name).toBe(fishName) 
  });
})
