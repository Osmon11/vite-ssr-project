<script setup>
  import { onMounted, ref } from "vue";

  import { useStore } from "../store";
  import Header from "@/shared/Header.vue";
  import BlogListItem from "@/shared/BlogListItem.vue";
  import Footer from "@/shared/Footer.vue";

  const store = useStore();
  const loadedImg = ref({});

  onMounted(() => {
    store.getNewsFeed({}, (success) => {});
  });
</script>

<template>
  <Header />
  <div class="blog-list-wrapper flex-box-center">
    <main>
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
