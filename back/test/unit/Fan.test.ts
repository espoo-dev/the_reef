import { Fan } from "../../src/domain/entity"

describe('Fan',() => {
  let fan!:Fan
  const mockFan = {
    id: 1,
    name: 'FAN 01',
    aquariumId: 2
  }

  const sut = (mock = mockFan): Fan => {
    return new Fan(mock.id, mock.name, mock.aquariumId)
  }

  beforeEach(() => {
    fan = sut()
  })

  it('should create a new fan with correct name', () => {
    expect(fan.name).toBe(mockFan.name)
  });

  it('should create a new fan with correct aquarium id', () => {
    expect(fan.aquariumId).toBe(mockFan.aquariumId)
  });

  it('should create a fan off by default', async () => {
    expect(fan.on).toBeFalsy()
  });

  it('should turn on the fan', async () => {
    fan.turnOn()
    expect(fan.on).toBeTruthy()
  });

  it('should turn off the fan', async () => {
    fan.turnOff()
    expect(fan.on).toBeFalsy()
  });
})
