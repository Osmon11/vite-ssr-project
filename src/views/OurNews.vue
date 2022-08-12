<script setup>
  import { onMounted, ref } from "vue";

  import { useStore } from "../store";
  import Header from "@/shared/Header.vue";
  import BlogListItem from "@/shared/BlogListItem.vue";
  import Footer from "@/shared/Footer.vue";
  import { useI18n } from "vue-i18n";

  const store = useStore();
  const { t } = useI18n();
  const loadedImg = ref({});

  onMounted(() => {
    store.getNewsFeed({}, (success) => {});
  });
</script>

<template>
  <Header />
  <div class="blog-list-wrapper flex-box-center">
    <main>
      <p class="title pb-6 mt-4 text-center" style="width: 100%">
        {{ t("general.новостная_лента") }}
      </p>
      <BlogListItem
        v-for="newsItem in store.newsFeed"
        :key="newsItem._id"
        :news="newsItem"
      />
    </main>
  </div>
  <Footer />
</template>

<style scoped>
  .blog-list-wrapper {
    min-height: calc(100vh - 545px);
    align-items: flex-start;
    margin: 40px 0px;
  }
</style>
