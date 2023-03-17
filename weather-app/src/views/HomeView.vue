<template>
  <main class="main-section">
    <weather-card
      v-for="city in cities"
      :key="city.data ? city.data.id : city.id"
      :city="city"/>
    <div class="main-section__graph">
    </div>
  </main>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useCitiesStore } from '@/stores/CitiesStore';
import WeatherCard from '@/components/WeatherCard.vue';
export default {
  components: {
    WeatherCard,
  },
  setup () {
    const citiesStore = useCitiesStore();
    const { cities, cityForecast } = storeToRefs(citiesStore);

    return { citiesStore, cities, cityForecast }
  }
}
</script>

<style scoped>

</style>
