<template>
  <modal-window v-show="showModal" @close-modal="showModal = false">
      <p>Maximum number of observed cities: 5. Please remove some of them to be able to add more!</p>
  </modal-window>
  <div class="search-form">
    <div class="search-form__input">
      <input type="text" placeholder="Search for a city" v-model="city" @input="searchCity"
      :disabled="route.name === 'favorites'">
      <button>
        <i class="material-icons">add</i>
      </button>
    </div>
    <ul class="search-form__list" v-show="city">
      <li
        v-for="city in searchedCities"
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
import { ref, computed } from 'vue';
import { getCities } from '@/core/api.js';
import { useCitiesStore } from '../stores/CitiesStore';
import ModalWindow from '@/components/ModalWindow.vue';
import { useRoute } from 'vue-router';

export default {
  name: 'SearchForm',
  components: {
    ModalWindow,
  },
  setup () {
    const city = ref('');
    const searchedCities = ref([]);
    const citiesStore = useCitiesStore();
    const route = useRoute();
    const cities = computed(() => {
      return citiesStore.getCitiesLength;
    })
    const showModal = ref(false);

    const searchCity = async () => {
      const list = await getCities(city.value);
      searchedCities.value = list;
    }

    const addCity = (id) => {
      if (cities.value >= 5) {
        city.value = '';
        showModal.value = true;
        return;
      }
      citiesStore.setPickedCity(id);
      city.value = '';
      searchedCities.value = [];
    }

    return { city, cities, searchedCities, searchCity, addCity, citiesStore, showModal, route }
  }
}
</script>

<style scoped>

</style>