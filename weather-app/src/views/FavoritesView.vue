<template>
  <div class="main-section">
    <h3 v-show="!getFavorites.length" style="text-align: center;">Theres no favorites cities yet!</h3>
    <weather-card v-for="city in getFavorites" :key="city.id" :city="city"/>
  </div>
</template>

<script>
import { useCitiesStore } from '@/stores/CitiesStore';
import { storeToRefs } from 'pinia';
import WeatherCard from '@/components/WeatherCard.vue';
export default {
  components: {
    WeatherCard,
  },
  setup () {
    const citiesStore = useCitiesStore();
    const { getFavorites } = storeToRefs(citiesStore);
    citiesStore.updateCitiesInLocalStorage();

    return { citiesStore, getFavorites }
  }
}
</script>

<style scoped>
</style>