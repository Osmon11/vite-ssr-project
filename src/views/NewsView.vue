<script setup>
  import { useStore } from "../store";
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";

  const store = useStore();
</script>

<template>
  <Header />
  <div class="flex-box-center">
    <main style="padding: 5% 0px">
      <p class="title">{{ store.currentNews.title }}</p>
      <p class="text-caption">
        {{ store.currentNews.createdAt.split(" ")[0] }}
      </p>
      <img
        :src="store.currentNews.imageUrl"
        :alt="store.currentNews.imageName"
      />
      <p class="text-subtitle py-5">{{ store.currentNews.subtitle }}</p>
      <div class="content" v-html="store.currentNews.content"></div>
    </main>
  </div>
  <Footer />
</template>
