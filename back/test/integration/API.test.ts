import axios from 'axios'
import { factoryHeader } from './mocks/mountHeaders';

const serverUrl = `${process.env.SERVER_URL}:${process.env.PORT}`

describe('API', () => {
  describe('Indicator', () => {
    it.skip('should call API /indicators', async () => {
      const response = await axios.get(`${serverUrl}/indicators`)
      const items = response.data
      expect(items).toHaveLength(1)
    })

    it.skip('should return 403 when call API /indicator/id/update without token', async () => {
      const indicators = await axios.get(`${serverUrl}/indicators`)
      const requestBody = { newValue: 20, indicatorId: indicators.data[0].id }
      try {
        await axios.put(`${serverUrl}/indicators/update`, requestBody)
      } catch (error: any) {
        expect(error.response.status).toBe(403)
      }
    })

    it.skip('should call API /indicator/id/update to update current value of indicator', async () => {
      const indicators = await axios.get(`${serverUrl}/indicators`)
      const requestBody = { newValue: 20, indicatorId: indicators.data[0].id }
      const response = await axios.put(`${serverUrl}/indicators/update`, requestBody, factoryHeader())
      const indicator = response.data
      expect(indicator.currentValue).toBe(requestBody.newValue)
    })

    it.skip('should response 403 when authorization is wrong', async () => {
      const indicators = await axios.get(`${serverUrl}/indicators`)
      const requestBody = { newValue: 20, indicatorId: indicators.data[0].id }
      try {
        await axios.put(`${serverUrl}/indicators/update`, requestBody, {
          headers: { 'authorization': 'wrong-authorization'}
        })
      } catch (error: any) {
        expect(error.response.status).toBe(403)
      }
    })

    it.skip('should call API POST /indicators to add a new Indicator', async () => {
      const newIndicator = {
        aquariumId: 1,
        name: 'Temperature',
        unit: 'celsius',
        description: 'Temperature of the reef',
        currentValue: 27,
        acceptedValue: 26,
        minValue: 26,
        maxValue: 29
      }
      const response = await axios.post(`${serverUrl}/indicators`, newIndicator)
      expect(response.data.name).toBe(newIndicator.name)
    })
  });

  describe('Aquarium', () => {
    it.skip('should call API /aquariums', async () => {
      const response = await axios.get(`${serverUrl}/aquariums`)
      const items = response.data
      expect(items).toHaveLength(1)
    })

    it.skip('should call API POST /aquariums to add a new aquarium', async () => {
      const requestBody = { name: 'IuryReef', dimensions: { length: 50, width: 40, height: 40 } }
      const response = await axios.post(`${serverUrl}/aquariums`, requestBody)
      expect(response.data.name).toBe(requestBody.name)
    })
  });

  describe('Fan', () => {
    it.skip('should call API /fans', async () => {
      const response = await axios.get(`${serverUrl}/fans`)
      const items = response.data
      expect(items).toHaveLength(1)
    })

    it.skip('should call API POST /fans to add a new aquarium', async () => {
      const requestBody = { name: 'Sump Fun', aquarium_id: 46 }
      const response = await axios.post(`${serverUrl}/fans`, requestBody)
      expect(response.data.name).toBe(requestBody.name)
      expect(response.data.aquarium_id).toBe(requestBody.aquarium_id)
    })

    it.skip('should call API PUT /fans/update_on to update fan to off', async () => {
      const requestBody = { fanId: 68, on: false }
      const response = await axios.put(`${serverUrl}/fans/update_on`, requestBody)
      expect(response.data.on).toBe(requestBody.on)
    })

    it.skip('should call update_on fan to off with string value', async () => {
      const responseFans = await axios.get(`${serverUrl}/fans`)
      const fanToUpdate = responseFans.data[0].id;
      const requestBody = { fanId: fanToUpdate, on: "false" }
      const response = await axios.put(`${serverUrl}/fans/update_on`, requestBody, factoryHeader())
      expect(response.data.on).toBe(false)
    })
  });
})
