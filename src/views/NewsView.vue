<script setup>
  import { useStore } from "../store";
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  import { useI18n } from "vue-i18n";

  const store = useStore();
  const { locale } = useI18n();
</script>

<template>
  <Header />
  <div class="flex-box-center">
    <main style="padding: 5% 0px">
      <p class="title">{{ store.currentNews[`title_${locale}`] }}</p>
      <p class="text-caption">
        {{ store.currentNews.createdAt.split(" ")[0] }}
      </p>
      <img
        :src="store.currentNews.imageUrl"
        :alt="store.currentNews.imageName"
      />
      <p class="text-subtitle py-5">
        {{ store.currentNews[`subtitle_${locale}`] }}
      </p>
      <div
        class="content"
        v-html="store.currentNews[`content_${locale}`]"
      ></div>
    </main>
  </div>
  <Footer />
</template>
