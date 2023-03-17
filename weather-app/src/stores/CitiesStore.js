import { defineStore } from 'pinia';
import { getCityById, getCityForecastData, multipleCitiesQuery } from '@/core/api';

export const useCitiesStore = defineStore('citiesStore', {
  state: () => ({
    cities: [],
    cityForecast: {
      labels: [],
      temperature: [],
    },
    hourlyTemp: {
      labeles: [],
      temperature: [],
    },
  }),
  getters: {
    getCurrentCity() {
      return this.currentCity;
    },
    getCitiesLength() {
      return this.cities.length;
    },
    getFavorites() {
      return this.cities.filter(city => city.isFav);
    },
    getCityForecast() {
      return this.cityForecast;
    }
  },
  actions: {
    async setPickedCity(id) {
      const currentCity = await getCityById(id);
      const newEntry = {
        isFav: false,
        ... currentCity,
      }
      this.cities.push(newEntry);
    },
    async setForecastData(city) {
      const response = await getCityForecastData(city);
      const week = response.data.list.splice(0, 40);
      week.forEach(day => {
        this.cityForecast.labels.push(day.dt_txt);
        this.cityForecast.temperature.push(Math.floor(day.main.temp));
      });
      console.log(this.cityForecast);
    },
    // async getHourlyDayTemp(lat, lon) {
    //   console.log(lat, lon);
    //   const response = await getCityDayliTemp(lat, lon);
    //   this.hourlyTemp.temperature = response.hourly.slice(0, 24).map(item => Math.floor(item.temp));
    //   this.hourlyTemp.labeles = response.hourly.slice(0, 24).map(item => new Date(item.dt * 1000)
    //     .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    // },
    toggleFavorite(id) {
      const entry = this.cities.find(city => {
        return city.data ? city.data.id === id : city.id === id;
      });
      entry.isFav = !entry.isFav;
      this.setCitiesToLocalStorage();
    },
    setCitiesToLocalStorage() {
      const cities = JSON.stringify(this.cities);
      localStorage.setItem('cities', cities);
    },
    async updateCitiesInLocalStorage() {
      const localList = JSON.parse(localStorage.getItem('cities'));
      if (!localList) return;
      const favList = localList.filter(city => city.isFav);
      if (!favList.length) return;
      const localIds = favList.map(city => city.data ? city.data.id : city.id);
      const query = localIds.join(',');
      const updatedFavs = await multipleCitiesQuery(query);
      const parsedFavs = updatedFavs.data.list.map(city => ({ isFav: true, ... city }));
      const notFavs = this.cities.filter(city => !city.isFav);
      this.cities = [...notFavs, ...parsedFavs];
    },
    removeCity(id) {
      this.cities = this.cities.filter(city => city.data ? city.data.id !== id : city.id !== id);
    }
  },
})
