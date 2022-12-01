<script setup>
  import { computed, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useMeta } from "vue-meta";

  import appStore from "../store";
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  import BlogListItem from "@/shared/BlogListItem.vue";
  import BlogCard from "../shared/BlogCard.vue";

  const store = appStore.useStore();
  const { t, locale } = useI18n();
  useMeta({
    title: store.defaultAppTitle,
    description:
      store.defaultAppDescription[locale.value],
    keywords: store.keywords,
  });
  const loadedImg = ref({});
  const xs = computed(
    () => window.innerWidth <= 600
  );

  onMounted(() => {
    store.getNewsFeed();
  });
</script>

<template>
  <metainfo>
    <template
      v-slot:title="{ content, metainfo }"
      >{{
        `${content} - ${t(
          "lang-fe822a05-8604-4300-b532-491d82716a23"
        )} | ${metainfo.description}`
      }}</template
    >
  </metainfo>
  <Header />
  <div class="blog-list-wrapper flex-box-center">
    <main>
      <p
        class="title divider py-5 my-5 text-center"
        style="width: 100%"
      >
        {{
          t(
            "lang-fe822a05-8604-4300-b532-491d82716a23"
          )
        }}
      </p>
      <div
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
