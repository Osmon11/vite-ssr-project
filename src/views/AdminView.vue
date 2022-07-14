<script setup>
  import { ref, watch } from "vue";

  import Header from "@/components/Header.vue";
  import Editor from "@/components/Editor.vue";
  import Footer from "@/components/Footer.vue";
  import NewSlideForm from "@/components/NewSlideForm.vue";

  const tabs = ref("news");
  watch("tabs", (value) => {
    console.log(value);
  });
</script>

<template>
  <Header />
  <div class="d-flex flex-row admin-wrapper">
    <v-card>
      <v-tabs v-model="tabs" direction="vertical" color="#61a375">
        <v-tab value="news">News</v-tab>
        <v-tab value="slides">Slides</v-tab>
      </v-tabs></v-card
    ><v-window v-model="tabs" class="py-10" style="width: 100%"
      ><v-window-item value="news"><Editor /></v-window-item
      ><v-window-item value="slides"><NewSlideForm /></v-window-item
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
