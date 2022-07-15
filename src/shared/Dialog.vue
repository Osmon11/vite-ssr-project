<script setup>
  const props = defineProps(["open", "onClose"]);

  function closeModalHandler(event) {
    if (event.target.hasAttribute("data-container")) {
      props.onClose(false);
    }
  }
</script>

<template>
  <div
    class="modal-container flex-box-center"
    v-show="open"
    @click.stop="closeModalHandler"
    data-container="true"
  >
    <main class="paper"><slot></slot></main>
  </div>
</template>
