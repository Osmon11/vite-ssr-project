<script setup>
  import { useI18n } from "vue-i18n";
  import { useMeta } from "vue-meta";

  import appStore from "../store";
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";

  const store = appStore.useStore();
  const { locale } = useI18n();

  useMeta({
    title: store.currentNews[`title_${locale.value}`] || store.defaultAppTitle,
    description: store.defaultAppDescription[locale.value],
    keywords: store.keywords,
  });
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content, metainfo }">{{
      `${content} | ${metainfo.description}`
    }}</template>
  </metainfo>
  <Header />
  <div class="flex-box-center py-5 px-5">
    <main>
      <p class="title divider text-center full-width my-5">
        {{ store.currentNews[`title_${locale}`] }}
      </p>
      <p class="text-caption">
        {{ store.currentNews.createdAt.split(" ")[0] }}
      </p>
      <img
        :src="`${store.backendUrl}${store.currentNews.imageUrl}`"
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
