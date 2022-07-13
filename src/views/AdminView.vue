<script setup>
  import { ref } from "vue";

  import Header from "@/components/Header.vue";
  import Editor from "@/components/Editor.vue";
  import Footer from "@/components/Footer.vue";

  const tab = ref("news");
</script>

<template>
  <Header />
  <!-- <v-card><v-tabs v-model="tabs"> 
    <v-tab >News</v-tab>
  </v-tabs></v-card> -->
  <div class="editor_wrapper">
    <Editor />
  </div>
  <Footer />
</template>

<style scoped>
  .editor_wrapper {
    width: 100%;
    min-height: calc(100vh - 545px);
    margin-bottom: 40px;
  }
</style>
