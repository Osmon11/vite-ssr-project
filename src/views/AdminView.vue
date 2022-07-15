<script setup>
  import { ref, watch } from "vue";

  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  import SlidesTab from "@/components/SlidesTab.vue";
  import NewsTab from "@/components/NewsTab.vue";

  const tabs = ref("news");
</script>

<template>
  <Header />
  <div class="d-flex flex-row admin-wrapper">
    <v-card class="py-10">
      <v-tabs v-model="tabs" direction="vertical" color="#61a375">
        <v-tab value="news">News</v-tab>
        <v-tab value="slides">Slides</v-tab>
      </v-tabs></v-card
    ><v-window v-model="tabs" class="py-10 px-10" style="width: 100%"
      ><v-window-item value="news"><NewsTab /></v-window-item
      ><v-window-item value="slides"><SlidesTab /></v-window-item
    ></v-window>
  </div>
  <Footer />
</template>

<style scoped>
  .admin-wrapper {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 545px);
  }
</style>
