<template>
  <div>
    <main class="main-section">
      <spinner-loader v-show="isLoading"/>
      <weather-card
        v-for="city in cities"
        :key="city.data ? city.data.id : city.id"
        :city="city"
        @show-chart="showChart"
        />
    </main>
      <div class="main-section__graph" v-show="isChartOpen">
        <button @click="isChartOpen = false" v-show="!cities.length">Close Chart</button>
        <chart-line :hourly-temp="hourlyTemp"/>
      </div>
  </div>
</template>

<script>
import { ref, onMounted, onDeactivated } from 'vue';
import { storeToRefs } from 'pinia';
import { useCitiesStore } from '@/stores/CitiesStore';
import WeatherCard from '@/components/WeatherCard.vue';
import ChartLine from '@/components/ChartLine.vue';
import SpinnerLoader from '@/components/SpinnerLoader.vue';
export default {
  components: {
    WeatherCard,
    ChartLine,
    SpinnerLoader,
  },
  setup () {
    const isChartOpen = ref(false);
    const citiesStore = useCitiesStore();
    const { cities, cityForecast, isLoading, hourlyTemp } = storeToRefs(citiesStore);

    const showChart = (btnState) => {
      if (isChartOpen.value && btnState) return;
      if (isChartOpen.value && !btnState) {
        isChartOpen.value = false;
      }
      if (!isChartOpen.value && btnState) {
        isChartOpen.value = true;
      }
    }

    onMounted(() => {
      citiesStore.setUserLocationCity();
      citiesStore.setDefaultCity();
    });

    onDeactivated(() => {
      localStorage.removeItem('location');
    });
    return { citiesStore, cities, cityForecast, showChart, isLoading, hourlyTemp, isChartOpen }
  }
}
</script>

<style scoped>

</style>
