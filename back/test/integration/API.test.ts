import axios from 'axios'

describe('API', () => {
  it.skip('should call API /aquariums', async () => {
    const response = await axios.get('http://localhost:3000/aquariums')
    const items = response.data
    expect(items).toHaveLength(1)
  })
})
