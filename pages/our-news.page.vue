<template>
  <Header />
  <div class="blog-list-wrapper flex-box-center">
    <main>
      <p
        class="title divider py-5 my-5 text-center"
        style="width: 100%"
      >
        {{
          $t(
            "lang-fe822a05-8604-4300-b532-491d82716a23"
          )
        }}
      </p>
      <!-- <div
        v-if="xs"
        class="px-5"
      >
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
      </div> -->
    </main>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  import { onMounted } from "vue";

  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  // import BlogListItem from "@/shared/BlogListItem.vue";
  // import BlogCard from "../shared/BlogCard.vue";

  // const loadedImg = ref({});
  // const xs = computed(
  //   () => import.meta.env.SSR ? 0 : window.innerWidth <= 600
  // );

  onMounted(() => {});
</script>

<style scoped>
  .blog-list-wrapper {
    min-height: calc(100vh - 545px);
    align-items: flex-start;
  }
</style>
