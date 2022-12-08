<template>
  <PageContainer>
    <div
      class="blog-list-wrapper flex-box-center"
    >
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
        <DataContainer
          :loading="loading"
          :noData="Boolean(!newsFeed)"
          noDataText="
              'lang-52a77386-baca-42ad-b12e-bd9fe630bfb1'
          "
        >
          <div
            v-if="xs"
            class="px-5"
          >
            <div
              class="full-width mb-5"
              v-for="news in newsFeed"
              :key="news._id"
            >
              <BlogCard :news="news" />
            </div>
          </div>
          <div v-else>
            <BlogListItem
              v-for="news in newsFeed"
              :key="news._id"
              :news="news"
            /></div
        ></DataContainer>
      </main>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from "vue";
  import { useNewsStore } from "@/stores/news";

  import PageContainer from "@/containers/PageContainer.vue";
  import DataContainer from "@/containers/DataContainer.vue";
  import BlogCard from "@/components/shared/BlogCard.vue";
  import BlogListItem from "@/components/shared/BlogListItem.vue";

  const xs = computed(() =>
    import.meta.env.SSR
      ? 0
      : window.innerWidth <= 600
  );

  const newsStore = useNewsStore();
  const loading = ref();

  onMounted(() => {
    loading.value = true;
    newsStore.fetchNewsFeed().then(() => {
      loading.value = false;
    });
  });

  const newsFeed = computed(
    () => newsStore.getNewsFeed
  );
  if (import.meta.env.SSR) {
    console.log("server", newsFeed.value);
  } else {
    console.log("client", newsFeed.value);
  }
</script>

<style scoped>
  .blog-list-wrapper {
    min-height: calc(100vh - 545px);
    align-items: flex-start;
  }
</style>
