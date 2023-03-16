<template>
  <main class="main-section">
    <weather-card v-for="city in cities" :key="city.data.id" :city="city"/>
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
    const { cities } = storeToRefs(citiesStore);

    return { citiesStore, cities }
  }
}
</script>

<style scoped>

</style>
