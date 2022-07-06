<script setup>
  import { ref } from "@vue/reactivity";

  defineProps(["article"]);

  const isExpanded = ref(false);
  function setExpanded(value) {
    isExpanded.value = value;
  }
</script>

<template>
  <article class="flex_box collapse" :class="{ expanded: isExpanded }">
    <img :src="article.cover" class="cover" alt="" />
    <div class="content">
      <h1 class="title">{{ article.title }}</h1>
      <span class="short_text body1">{{ article.shortText }}</span>
    </div>
    <p class="body1">{{ article.text }}</p>
    <div class="expand_more flex_box_center" v-if="!isExpanded">
      <p class="nav_item nav_item_secondary" @click="setExpanded(true)">
        показать все
      </p>
    </div>
  </article>
</template>

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
  article .content .short_text {
    display: inline;
  }
  article .expand_more {
    position: absolute;
    right: 0px;
    top: 229px;
    width: calc(100% - 440px);
    height: 70px;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 50%,
      transparent 110%
    );
  }
</style>
