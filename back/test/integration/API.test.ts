import axios from 'axios'

const serverUrl = `${process.env.SERVER_URL}:${process.env.PORT}`

describe('API', () => {
  it.skip('should call API /aquariums', async () => {
    const response = await axios.get(`${serverUrl}/aquariums`)
    const items = response.data
    expect(items).toHaveLength(1)
  })

  it.skip('should call API /indicators', async () => {
    const response = await axios.get(`${serverUrl}/indicators`)
    const items = response.data
    expect(items).toHaveLength(1)
  })

  it.skip('should call API /indicator/id/update to update current value of indicator', async () => {
    const requestBody = { newValue: 20 }
    const response = await axios.put(`${serverUrl}/indicator/1/update`, requestBody)
    const indicator = response.data
    expect(indicator.currentValue).toBe(requestBody.newValue)
  })
})
