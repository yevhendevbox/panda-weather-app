<template>
  <div class="search-form">
    <input type="text" placeholder="Search for a city" v-model="city" @input="searchCity">
    <ul class="search-form__list" v-show="city">
      <li
        v-for="city in cities"
        :key="city.id"
        @click="addCity(city.id)"
        @keyup.enter="addCity(city.id)"
        tabindex="0"
      >
      {{ city.name }}, {{ city.sys.country }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getCities } from '@/core/api.js';
import { useCitiesStore } from '../stores/CitiesStore';

export default {
  name: 'SearchForm',
  setup () {
    const city = ref('');
    const cities = ref([]);
    const citiesStore = useCitiesStore();

    const searchCity = async () => {
      const list = await getCities(city.value);
      cities.value = list;
    }

    const addCity = (id) => {
      citiesStore.getPickedCity(id);
      city.value = '';
      cities.value = [];
    }

    return { city, cities, searchCity, addCity, citiesStore }
  }
}
</script>

<style scoped>

</style>