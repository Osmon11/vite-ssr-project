<script setup>
  import { computed, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import appStore from "../store";
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  import BlogListItem from "@/shared/BlogListItem.vue";
  import BlogCard from "../shared/BlogCard.vue";

  const store = appStore.useStore();
  const { t } = useI18n();
  const loadedImg = ref({});
  const xs = computed(() => window.innerWidth <= 600);

  onMounted(() => {
    store.getNewsFeed();
  });
</script>

<template>
  <Header />
  <div class="blog-list-wrapper flex-box-center">
    <main>
      <p class="title divider py-5 my-5 text-center" style="width: 100%">
        {{ t("general.новостная_лента") }}
      </p>
      <div v-if="xs" class="px-5">
        <div
          class="full-width mb-5"
          v-for="news in store.newsFeed"
          :key="news._id"
        >
          <BlogCard :news="news" />
        </div>
      </div>
      <div v-else>
        <BlogListItem
          v-for="news in store.newsFeed"
          :key="news._id"
          :news="news"
        />
      </div>
    </main>
  </div>
  <Footer />
</template>

<style scoped>
  .blog-list-wrapper {
    min-height: calc(100vh - 545px);
    align-items: flex-start;
  }
</style>
