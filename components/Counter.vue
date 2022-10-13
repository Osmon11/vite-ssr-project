<template>
  <v-btn @click="state.count++">{{
    $t("lang-4c8ff4da-1a4c-4a03-9689-4df72ca069d8", { count: state.count })
  }}</v-btn>
</template>

<script lang="ts" setup>
  import { reactive } from "vue";
  const state = reactive({ count: 0 });
</script>
