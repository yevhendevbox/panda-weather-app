<template>
  <div>
    <div class="weather-card">
      <div class="weather-card__header">
        <div class="weathet-card--title">
          <h2>{{city.data ? city.data.name : city.name }},
          {{ city.data ? city.data.sys.country : city.sys.country }}</h2>
          <p>{{ city.data ? city.data.weather[0].description : city.weather[0].description }}</p>
        </div>
        <div class="weather-card--icon">
          <img :src="buildIconURL(city.data ? city.data.weather[0].icon : city.weather[0].icon)" alt="">
        </div>
      </div>
      <div class="weather-card__footer">
        <div class="weather-card--temp">
          <h3>{{ Math.floor(city.data ? city.data.main.temp : city.main.temp) }}°C</h3>
        </div>
        <div class="weather-card--details">
          <h3>Details:</h3>
          <ul>
            <li>Feels like: {{ Math.floor(city.data ? city.data.main.feels_like : city.main.feels_like) }}°C</li>
            <li>Wind: {{ Math.floor(city.data ? city.data.wind.speed : city.wind.speed) }} m/s</li>
            <li>Humidity: {{ city.data ? city.data.main.humidity : city.main.humidity }}%</li>
            <li>Presure: {{ city.data ? city.data.main.humidity : city.main.humidity }}hPa</li>
          </ul>
        </div>
      </div>
      <div class="weather-card__actions">
        <div>
          <button
            :class="{active: isChartOpen}"
            class="btn graph-btn"
            @click="showChart(city.data ? city.data.name : city.name)"
            >
            <i class="material-icons">query_stats</i>
            <span>1 day temp</span>
          </button>
        </div>
        <div>
          <button class="btn" @click="citiesStore.toggleFavorite(city.data ? city.data.id : city.id)">
            <i class="material-icons"
            :class="{ 'active': city.isFav }">favorite</i>
          </button>
          <button class="btn" @click="showModal = true">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>
  <modal-window v-show="showModal" @close-modal="showModal = false"
    @delete-city="removeCityCard(city.data ? city.data.id : city.id)">
    <p>Are you sure, you wont to delete {{ city.data ? city.data.name : city.name }} card?</p>
    <template #actions='{ onCityRemove }'>
      <button class="modal-btn delete-btn" @click="onCityRemove">
        <i class="material-icons">delete</i>
        OK
      </button>
    </template>
  </modal-window>
  </div>
</template>

<script>
import { ref } from 'vue';
import { buildWeatherIconURL } from '@/core/api';
import { useCitiesStore } from '@/stores/CitiesStore';
import ModalWindow from '@/components/ModalWindow.vue';
export default {
  name: 'WeatherCard',
  components: {
    ModalWindow,
  },
  emits: {
    'show-chart': null,
  },
  props: {
    city: {
      required: true,
      type: Object,
    }
  },
  setup (props, { emit }) {
    const buildIconURL = buildWeatherIconURL;
    const citiesStore = useCitiesStore();
    const showModal = ref(false);
    const isChartOpen = ref(false);

    const showChart = (city) => {
      if (isChartOpen.value) {
        isChartOpen.value = false;
        emit('show-chart', isChartOpen.value);
        return;
      }
      isChartOpen.value = !isChartOpen.value;
      citiesStore.setForecastData(city);
      emit('show-chart', isChartOpen.value);
    };

    const removeCityCard = (id) => {
      showModal.value = false;
      citiesStore.removeCity(id);
    }

    return { buildIconURL, citiesStore, showModal, removeCityCard, showChart, isChartOpen }
  }
}
</script>

<style scoped>

</style>