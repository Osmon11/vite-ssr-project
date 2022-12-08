<template>
  <PageContainer>
    <DataContainer
      :loading="loading"
      :noData="!news"
    >
      <div class="flex-box-center py-5 px-5">
        <main v-if="news">
          <p
            class="title divider text-center full-width my-5"
          >
            {{
              news[
                `title_${locale}` as keyof typeof news
              ]
            }}
          </p>
          <p class="text-caption">
            {{ news.createdAt.split(" ")[0] }}
          </p>
          <img
            :src="`${apiUrl}${news.imageUrl}`"
            :alt="news.imageName"
          />
          <p class="text-subtitle py-5">
            {{
              news[
                `subtitle_${locale}` as keyof typeof news
              ]
            }}
          </p>
          <div
            class="news_content"
            v-html="
          news[`content_${locale}` as keyof typeof news]
        "
          ></div>
        </main></div></DataContainer
  ></PageContainer>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { apiUrl } from "@/utils/constants";

  import PageContainer from "@/containers/PageContainer.vue";
  import DataContainer from "@/containers/DataContainer.vue";

  import { useNewsStore } from "@/stores/news";
  import { usePageContext } from "@/renderer/usePageContext";

  const pageContext = usePageContext();
  const { locale } = useI18n();

  const newsStore = useNewsStore();
  const loading = ref(null);

  const news = computed(
    () => newsStore.getCurrentNews
  );

  onMounted(() => {
    if (pageContext.urlParsed.search.id) {
      loading.value = true;
      newsStore
        .fetchNewsInfo(
          pageContext.urlParsed.search.id
        )
        .then(() => (loading.value = false));
    }
  });
</script>
