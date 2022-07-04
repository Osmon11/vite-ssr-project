<script setup>
  import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView
    ><template #fallback>
      <div class="preloader" style="opacity: 0; display: none">
        <div class="spinner">
          <div class="pre-bounce1"></div>
          <div class="pre-bounce2"></div>
        </div>
      </div> </template
  ></RouterView>
</template>

<style>
  @import "@/App.css";
  .preloader {
    background: none 0px 0px repeat scroll rgb(255, 255, 255);
    height: 100%;
    opacity: 1;
    position: fixed;
    text-align: center;
    transition: opacity 0.2s ease 0s;
    width: 100%;
    z-index: 9999;
  }
  .preloader .spinner {
    height: 30px;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
    position: relative;
    top: 50%;
    width: 30px;
  }
  .preloader .pre-bounce1,
  .preloader .pre-bounce2 {
    animation: 2s ease 0s infinite normal none running bounce;
    background-color: rgb(222, 73, 57);
    border-radius: 50%;
    height: 100%;
    left: 0px;
    opacity: 0.6;
    position: absolute;
    top: 0px;
    width: 100%;
  }
  .preloader .pre-bounce2 {
    animation-delay: -0.5s;
  }
  @-webkit-keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0px);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
  @keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: translateY(0px);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
</style>
