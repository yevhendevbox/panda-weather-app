import { defineStore } from 'pinia';
import { getCityById } from '@/core/api';

export const useCitiesStore = defineStore('citiesStore', {
  state: () => ({
    cities: [],
  }),
  getters: {
    getCurrentCity() {
      return this.currentCity;
    }
  },
  actions: {
    async getPickedCity(payloadID) {
      const currentCity = await getCityById(payloadID);
      this.cities.push(currentCity);
    }
  },
})
