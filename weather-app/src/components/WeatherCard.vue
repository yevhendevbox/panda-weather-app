<template>
  <div class="weather-card">
    <div class="weather-card__header">
      <div class="weathet-card--title">
        <h2>{{ city.data.name }}, {{ city.data.sys.country }}</h2>
        <p>{{ city.data.weather[0].description }}</p>
      </div>
      <div class="weather-card--icon">
        <img :src="buildIconURL(city.data.weather[0].icon)" alt="">
      </div>
    </div>
    <div class="weather-card__footer">
      <div class="weather-card--temp">
        <h3>{{ Math.floor(city.data.main.temp) }}°C</h3>
      </div>
      <div class="weather-card--details">
        <h3>Details:</h3>
        <ul>
          <li>Feels like: {{ Math.floor(city.data.main.feels_like) }}°C</li>
          <li>Wind: {{ Math.floor(city.data.wind.speed) }} m/s</li>
          <li>Humidity: {{ city.data.main.humidity }}%</li>
          <li>Presure: {{ city.data.main.humidity }}hPa</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { buildWeatherIconURL } from '@/core/api';
export default {
  name: 'WeatherCard',
  props: {
    city: {
      required: true,
      type: Object,
    }
  },
  setup () {
    const buildIconURL = buildWeatherIconURL;

    return { buildIconURL }
  }
}
</script>

<style lang="scss" scoped>

</style>