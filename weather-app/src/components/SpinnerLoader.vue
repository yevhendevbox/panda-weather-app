<template>
  <div class="spinner-container">
    <div class="spinner">
    </div>
  </div>
</template>

<script>
export default {
  setup () {


    return {}
  }
}
</script>

<style scoped>
.spinner-container {
  width: 100%;
  height: 40vh;
  position: relative;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--accent);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>