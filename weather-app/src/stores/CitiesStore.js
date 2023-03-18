import { defineStore } from 'pinia';
import { getCityForecastData, multipleCitiesQuery, getCitiesByChanks, getCityByLoc, getDefaultCity } from '@/core/api';

export const useCitiesStore = defineStore('citiesStore', {
  state: () => ({
    cities: [],
    hourlyTemp: [],
    autocomplete: [],
    isLoading: false,
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
    },
    getHourlyTemp() {
      return this.hourlyTemp;
    }
  },
  actions: {
    async setPickedCity(cityGeo) {
      const currentCity = await getCityByLoc(cityGeo.lat, cityGeo.lng);
      if (this.cities.some(item => item.data ?
         item.data.id === currentCity.data.id : item.id === currentCity.data.id)) return;

      const newEntry = {
        isFav: false,
        today: this.setTodayDate(),
        ... currentCity,
      }
      this.cities.push(newEntry);
    },
    async setForecastData(city) {
      const response = await getCityForecastData(city);
      const now = new Date();
      const year = now.getFullYear();
      const month = ('0' + (now.getMonth() + 1)).slice(-2);
      const day = ('0' + now.getDate()).slice(-2);
      const formatedDate = `${year}-${month}-${day}`;

      const todaysWeatherByHours = response.data.list.filter(item => {
        if (item.dt_txt.split(' ')[0] === formatedDate) {
          return item;
        }
      });
      todaysWeatherByHours.forEach(item => {
        this.hourlyTemp.push({ label: item.dt_txt.split(' ')[1], temperature: Math.floor(item.main.temp)});
      });
    },
    async setCitiesList(city) {
      const response = await getCitiesByChanks(city);
        const list = response.data.results.map(city => {
          return {
            name: city.formatted.split(',')[0],
            geometry: city.geometry,
            country: city.components.country,
          }
        });
        this.autocomplete = list;
    },
    async setDefaultCity() {
      if (this.cities.length > 1) return;
      if (!localStorage.getItem('location')) return;
      const response = await getDefaultCity('Kyiv');

      const newEntry = {
        isFav: false,
        today: this.setTodayDate(),
        ... response,
      }
      this.cities.push(newEntry);
    },
    cleanAutocomplete() {
      this.autocomplete = [];
    },

    async setUserLocationCity() {
      if (!localStorage.getItem('location')) {
        this.isLoading = true;
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const currentCity = await getCityByLoc(lat, lon);

          if (this.cities.some(item => item.data ?
            item.data.id === currentCity.data.id : item.id === currentCity.data.id)) return;

          const newEntry = {
            isFav: false,
            ... currentCity,
          }
          this.cities.push(newEntry);
          localStorage.setItem('location', true);
          this.isLoading = false;
      });
    }
  },
  setTodayDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const formatedDate = `${year}-${month}-${day}`;
    this.today = formatedDate;
  },

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
