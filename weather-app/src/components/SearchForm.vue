<template>
  <modal-window v-show="showModal" @close-modal="showModal = false">
      <p>Maximum number of observed cities: 5. Please remove some of them to be able to add more!</p>
  </modal-window>
  <div class="search-form">
    <div class="search-form__input">
      <input type="text" placeholder="Search for a city" v-model="city.name" @input="searchCity"
      :disabled="route.name === 'favorites'">
      <button v-show="route.name !== 'favorites'">
        <i class="material-icons" @click="addCity(city.geometry)">add</i>
      </button>
    </div>
    <ul class="search-form__list" v-show="autocomplete.length">
      <li
        v-for="(city, index) in autocomplete"
        :key="index"
        @click="fillSearchInput(city)"
        @keyup.enter="fillSearchInput(city)"
        tabindex="0"
      >
      {{ city.name }}, {{ city.country }}
      <!-- {{ city.sys.country }} -->
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useCitiesStore } from '../stores/CitiesStore';
import ModalWindow from '@/components/ModalWindow.vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

export default {
  name: 'SearchForm',
  components: {
    ModalWindow,
  },
  setup () {
    const city = ref({
            name: '',
            geometry: {},
            country: '',
          });
    const citiesStore = useCitiesStore();
    const { autocomplete } = storeToRefs(citiesStore);
    const route = useRoute();
    const cities = computed(() => {
      return citiesStore.getCitiesLength;
    })
    const showModal = ref(false);

    const searchCity = async () => {
      if (city.value.name.length < 3) return;
      citiesStore.setCitiesList(city.value.name);
    }
    const fillSearchInput = (cityToAdd) => {
      city.value = cityToAdd;
      citiesStore.cleanAutocomplete();
    }

    const addCity = (cityGeo) => {
      if (cities.value >= 5) {
        city.value = '';
        showModal.value = true;
        return;
      }
      citiesStore.setPickedCity(cityGeo);
      city.value = {
        name: '',
        geometry: {},
        country: '',
      };
    }

    return {
      city,
      cities,
      autocomplete,
      searchCity,
      fillSearchInput,
      addCity,
      citiesStore,
      showModal,
      route
    }
  }
}
</script>

<style scoped>

</style>