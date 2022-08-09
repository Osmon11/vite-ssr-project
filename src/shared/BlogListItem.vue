<script setup>
  import { ref } from "@vue/reactivity";

  import { useStore } from "@/store";
  import { useRouter } from "vue-router";

  defineProps(["news"]);

  const store = useStore();
  const navigate = useRouter();
  const isLoaded = ref(false);
  const expanded = ref(false);

  function setExpanded(value) {
    expanded.value = value;
  }
  function setCurrentNews(news) {
    store.$patch((state) => {
      state.currentNews = news;
    });
    navigate.push("/news");
  }
</script>

<template>
  <article class="flex-box collapse" :class="{ expanded }">
    <img
      :src="news.imageUrl"
      class="cover"
      alt=""
      v-show="isLoaded"
      @load="isLoaded = true"
    />
    <div class="flex-box-center cover" v-show="!isLoaded">
      <img src="/public/assets/loading-12bras.gif" alt="" />
    </div>
    <div class="content">
      <h1 class="title">{{ news.title }}</h1>
      <p class="short-text body1 py-4">{{ news.subtitle }}</p>
    </div>
    <div class="expand-more flex-box-center" v-if="!expanded">
      <p class="nav-item nav-item-secondary" @click="setCurrentNews(news)">
        Прочитать подробней
      </p>
    </div>
  </article>
</template>

<style scoped>
  article {
    width: 100%;
    max-height: 300px;
    min-height: 300px;
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
  article .cover {
    width: 400px;
  }
  article .content {
    width: calc(100% - 420px);
  }
  article .content .title {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    max-height: 90px;
  }
  article .expand-more {
    position: absolute;
    right: 0px;
    top: 229px;
    width: calc(100% - 440px);
    height: 70px;
    background: linear-gradient(
      0deg,
      #ffffff 0%,
      rgba(255, 255, 255, 1) 50%,
      transparent 110%
    );
  }
</style>
