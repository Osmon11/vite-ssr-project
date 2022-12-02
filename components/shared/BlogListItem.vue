<template>
  <article
    class="flex-box collapse"
    :class="{ expanded }"
  >
    <img
      class="cover"
      v-show="isLoaded"
      :src="`${apiUrl}${props.news.imageUrl}`"
      :alt="props.news.imageName"
      @load="onImageLoad"
    />
    <div
      class="flex-box-center cover"
      v-if="!isLoaded"
    >
      <img
        src="/public/assets/loading-12bras.gif"
        alt="loading gif"
      />
    </div>
    <div class="content">
      <h1 class="title">
        {{ props.news[`title_${locale}`] }}
      </h1>
      <p class="short-text body1 py-4">
        {{ props.news[`subtitle_${locale}`] }}
      </p>
    </div>
    <div
      class="expand-more flex-box-center"
      v-if="!expanded"
    >
      <p
        class="nav-item nav-item-secondary"
        @click="setCurrentNews(props.news)"
      >
        {{
          t(
            "lang-affa9989-3199-4634-95af-469c8881aca2"
          )
        }}
      </p>
    </div>
  </article>
</template>

<script lang="ts" setup>
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";

  import { apiUrl } from "@/utils/constants";
  import { INews } from "@/api/index.types";

  const props = defineProps(["news"]);

  const { t, locale } = useI18n();
  const isLoaded = ref(false);
  const expanded = ref(false);

  function setCurrentNews(news: INews) {
    console.log(news);
  }
  function onImageLoad() {
    console.log(true);
    isLoaded.value = true;
  }
</script>

<style scoped>
  article {
    width: 100%;
    max-height: 300px;
    overflow: hidden;
    position: relative;
    transition: all 0.5s ease;
    transform-origin: top left;
    gap: 20px;
    flex-wrap: wrap;
    padding: 16px 24px;
    border-bottom: 1px solid #61a375;
    align-items: flex-start;
    margin-bottom: 50px;
  }
  .expanded {
    max-height: 10000px;
  }
  .cover {
    width: 400px;
  }
  .content {
    width: calc(100% - 420px);
  }
  .content .title {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    max-height: 90px;
  }
  .expand-more {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: calc(100% - 440px);
    height: 70px;
    background: linear-gradient(
      0deg,
      #ffffff 0%,
      rgba(255, 255, 255, 1) 50%,
      transparent 110%
    );
  }
  @media (min-width: 600px) and (max-width: 960px) {
    .cover {
      width: 300px;
    }
    .content {
      width: calc(100% - 340px);
    }
    .content .title {
      font-size: 20px;
      font-weight: 400;
    }
    .expand-more {
      width: calc(100% - 340px);
    }
  }
</style>
