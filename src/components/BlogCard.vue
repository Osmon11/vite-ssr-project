<script setup>
  defineProps(["cover", "title"]);
</script>

<template>
  <article class="blog_card">
    <figure>
      <router-link to="/"><img :src="cover" alt="" /></router-link>
    </figure>
    <div class="blog_content">
      <h3 class="title">
        <router-link to="/">{{ title }}</router-link>
      </h3>
    </div>
  </article>
</template>

<style>
  .blog_card {
    width: 100%;
    max-width: 33.33%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    cursor: pointer;
    transition: box-shadow 0.15s ease-in-out,
      -webkit-transform 0.15s ease-in-out;
    transition: box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out;
    transition: box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out,
      -webkit-transform 0.15s ease-in-out;
    background-color: #eaf0f6;
    border-radius: 3px;
    overflow: hidden;
    margin: 0 1rem 1rem 0;
    padding: 0;
    flex-grow: 1;
    position: relative;
    min-height: 475px;
  }
  .blog_card:hover {
    box-shadow: 0 10px 50px -5px rgb(51 71 91 / 12%);
    -webkit-transform: scale(1.014);
    transform: scale(1.014);
  }
  .blog_card figure {
    margin: 0;
    height: 0;
    position: relative;
    width: 100%;
    flex-grow: 2;
    overflow: hidden;
    padding-bottom: 56.3%;
  }
  .blog_card img {
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
  .blog_card h3 {
    padding: 16px;
  }
  .blog_card h3 a {
    text-decoration: none;
    color: #33475b;
    font-weight: 600;
  }
</style>
