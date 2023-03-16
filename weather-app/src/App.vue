<template>
  <main-header />
  <div class="container">
    <search-form />
    <router-view />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import MainHeader from './components/MainHeader.vue';
import SearchForm from './components/SearchForm.vue';

export default {
  components: {
    RouterView,
    MainHeader,
    SearchForm,
  },
  setup () {


    return {}
  }
}


</script>
<style scoped>
</style>
