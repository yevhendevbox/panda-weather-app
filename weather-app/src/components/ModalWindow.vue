<template>
  <div class="modal">
    <div class="modal-overlay" @click="close"></div>
    <div class="modal-content" @click.stop>
      <slot></slot>
      <div class="modal-actions">
        <slot name="actions" :onCityRemove="onCityRemove"></slot>
        <button class="modal-btn" @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: {
    'close-modal': null,
    'delete-city': null,
  },
  setup(props, { emit }) {
    const close = () => {
      emit('close-modal');
    }
    const onCityRemove = () => {
      emit('delete-city');
    }

    return { close, onCityRemove };
  }
}
</script>

<style scoped>
</style>