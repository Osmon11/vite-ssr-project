<script setup>
  import { ref } from "@vue/reactivity";

  defineProps(["article"]);

  const isLoaded = ref(false);
  const isExpanded = ref(false);

  function setExpanded(value) {
    isExpanded.value = value;
  }
</script>

<template>
  <article class="flex-box collapse" :class="{ expanded: isExpanded }">
    <img
      :src="article.imageUrl"
      class="cover"
      alt=""
      v-show="isLoaded"
      @load="isLoaded = true"
    />
    <div class="flex-box-center cover" v-show="!isLoaded">
      <img src="/public/assets/loading-12bras.gif" alt="" />
    </div>
    <div class="content">
      <h1 class="title">{{ article.title }}</h1>
      <span class="short-text body1">{{ article.subtitle }}</span>
    </div>
    <p class="body1">{{ article.text }}</p>
    <div class="expand-more flex-box-center" v-if="!isExpanded">
      <p class="nav-item nav-item-secondary" @click="setExpanded(true)">
        Посмотреть все
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
    display: inline;
    width: calc(100% - 420px);
  }
  article .content .title {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    max-height: 90px;
  }
  article .content .short-text {
    display: inline;
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
