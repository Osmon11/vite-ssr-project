<script setup>
  import Header from "@/components/Header.vue";
  import Editor from "@/components/Editor.vue";
  import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />
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
