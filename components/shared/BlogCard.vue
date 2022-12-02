<template>
  <article
    class="blog-card"
    @click="setCurrentNews"
  >
    <figure>
      <img
        :src="`${apiUrl}${props.news.imageUrl}`"
        :alt="props.news.imageName"
      />
    </figure>
    <div class="blog_content">
      <h3 class="card-title">
        {{ props.news[`title_${locale}`] }}
      </h3>
    </div>
  </article>
</template>

<script lang="ts" setup>
  import { apiUrl } from "@/utils/constants";
  import { useI18n } from "vue-i18n";

  const props = defineProps(["news"]);
  const { locale } = useI18n();

  function setCurrentNews() {
    // navigate.push("/news");
  }
</script>

<style scoped>
  .blog-card {
    width: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    cursor: pointer;
    transition: box-shadow 0.15s ease-in-out,
      -webkit-transform 0.15s ease-in-out;
    transition: box-shadow 0.15s ease-in-out,
      transform 0.15s ease-in-out;
    transition: box-shadow 0.15s ease-in-out,
      transform 0.15s ease-in-out,
      -webkit-transform 0.15s ease-in-out;
    background-color: #eaf0f6;
    border-radius: 3px;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    flex-grow: 1;
    position: relative;
  }
  .blog-card:hover {
    box-shadow: 0 10px 50px -5px rgb(51 71 91 /
          12%);
    -webkit-transform: scale(1.014);
    transform: scale(1.014);
  }
  .blog-card figure {
    margin: 0;
    height: 0;
    position: relative;
    width: 100%;
    flex-grow: 2;
    overflow: hidden;
    padding-bottom: 56.3%;
  }
  .blog-card img,
  .blog-card .cover_image {
    width: 100%;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    min-width: 100%;
    min-height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    display: block;
  }
  .card-title {
    width: fit-content;
    font-family: "Roboto", sans-serif;
    font-weight: 600;
    font-size: 26px;
    color: #443f3f;
    text-transform: uppercase;
    padding: 16px;
  }
  .card-title h3 a {
    text-decoration: none;
    color: #33475b;
    font-weight: 600;
  }

  @media (min-width: 0px) and (max-width: 600px) {
    .card-title {
      font-size: 18px;
      font-weight: 400;
    }
  }
  @media (min-width: 600px) and (max-width: 960px) {
    .card-title {
      font-size: 20px;
      font-weight: 400;
    }
  }
</style>
