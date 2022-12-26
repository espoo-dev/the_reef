import { Fan } from "../../src/domain/entity"

describe('Fan',() => {
  let fan!:Fan
  const mockFan = {
    name: 'FAN 01',
  }

  const sut = (mock = mockFan): Fan => {
    return new Fan(mock.name)
  }

  beforeEach(() => {
    fan = sut()
  })

  it('should create a new fan with correct name', () => {
    expect(fan.name).toBe(mockFan.name)
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
