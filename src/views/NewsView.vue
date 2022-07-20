<script setup>
  import { QuillEditor } from "@vueup/vue-quill";

  import { useStore } from "../store";
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";

  const store = useStore;
</script>

<template>
  <Header />
  <div class="flex-box-center">
    <main>
      <p class="text-h6">{{ store.currentNews.createdAt }}</p>
      <p class="title">{{ store.currentNews.title }}</p>
      <img :src="store.currentNews.imageUrl" alt="" />
      <p class="body1">{{ store.currentNews.subtitle }}</p>
      <QuillEditor
        theme="bubble"
        :readOnly="true"
        :content="JSON.parse(store.currentNews.content)"
      />
    </main>
  </div>
  <Footer />
</template>
