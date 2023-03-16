<template>
  <header>
    <div class="container">
      <div class="header__wrapper">
        <div class="brand">
          <div class="brand__logo"><img src="@/assets/logo.png" alt="Main logo"></div>
          <span>Panda Weather</span>
        </div>
        <nav class="header__links">
          <router-link :to="{ name: 'home' }">Home</router-link>
          <router-link :to="{ name: 'favorites' }">Favorites</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  name:'MainHeader',
  components: {
    RouterLink,
  },
  setup () {


    return {}
  }
}
</script>

<style scoped>
</style>