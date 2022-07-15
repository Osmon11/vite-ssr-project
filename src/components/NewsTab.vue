<script setup>
  import { ref } from "vue";

  import EditorModal from "@/components/EditorModal.vue";

  const openModal = ref(true);

  function setModal(value) {
    openModal.value = value;
  }
</script>

<template>
  <EditorModal :open="openModal" :onClose="setModal(false)" />
</template>
