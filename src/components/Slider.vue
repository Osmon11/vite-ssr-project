<script setup>
  import { ref } from "@vue/reactivity";
  import { onMounted, onUnmounted } from "@vue/runtime-core";

  import FeedbackModal from "@/components/FeedbackModal.vue";

  const slides = [
    {
      maintitle: "Welcome to FIC",
      subtitle: "FIRST INTERNATIONAL CONSULTING",
      img: "/src/assets/горы-4.jpg",
    },
    {
      maintitle: "MISSION",
      subtitle: "الأولى في الخدمة الإستشارية العالمية",
      img: "/src/assets/горы-1.jpg",
    },
    {
      maintitle: "We Provide",
      subtitle: "World class support and advisory services",
      img: "/src/assets/горы-2.png",
    },
  ];
  const activeSlide = ref(0);
  const openFeedbackModal = ref(false);

  let interval;
  onMounted(() => {
    interval = setInterval(() => {
      if (activeSlide.value + 1 !== slides.length) {
        activeSlide.value += 1;
      } else {
        activeSlide.value = 0;
      }
    }, 5000);
  });
  onUnmounted(() => {
    clearInterval(interval);
  });

  function setFeedbackModal(value) {
    openFeedbackModal.value = value;
  }
</script>

<template>
  <div class="slider-container">
    <div
      v-for="(item, index) in slides"
      :key="item.img"
      class="slide-item"
      :class="{ active: activeSlide === index }"
      :style="{
        backgroundImage: `url(${item.img})`,
      }"
    >
      <div class="slide-inner">
        <div class="contain text-slider">
          <h2 class="maintitle">{{ item.maintitle }}</h2>
          <p class="subtitle">{{ item.subtitle }}</p>
        </div>
        <button class="theme-btn" @click="setFeedbackModal(true)">
          Click to begin
        </button>
      </div>
    </div>
  </div>
  <FeedbackModal :open="openFeedbackModal" :onClose="setFeedbackModal" />
</template>

<style scoped>
  .slider-container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .slide-item {
    position: absolute;
    top: 0px;
    left: 0px;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-position: 50% 0px;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
    display: none;
  }
  .slide-item.active {
    display: block;
    animation: splash 600ms ease-in-out;
  }
  @keyframes splash {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
  .slide-inner {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 2;
    width: 100%;
    min-height: 260px;
    padding-top: 5px;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  .maintitle,
  .subtitle {
    color: #ffffff;
    z-index: 10;
    color: #fff;
    margin: 0;
    letter-spacing: 1px;
    text-shadow: 1px 1px 3px rgb(0 0 0 / 30%);
  }
  .maintitle {
    position: relative;
    display: inline-block;
    font-size: 57px;
    line-height: 67px;
    font-weight: 700;
    padding-bottom: 10px;
  }
  .maintitle::after {
    content: "";
    background-color: #61a375;
    position: absolute;
    width: 50%;
    height: 1px;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, -50%);
  }
  .subtitle {
    font-size: 30px;
    line-height: 40px;
    padding: 20px 0 50px;
    font-weight: 300;
  }
  .text-slider {
    position: relative;
    -webkit-animation-duration: 1.25s;
    animation-duration: 1.25s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInAndScale;
    animation-name: fadeInAndScale;
  }
  /* .text-slider {
    -webkit-animation-duration: 1.25s;
    animation-duration: 1.25s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInRightBig;
    animation-name: fadeInRightBig;
  } */
  @-webkit-keyframes fadeInRightBig {
    from {
      right: -1200px;
    }
    to {
      right: 0;
    }
  }
  @keyframes fadeInRightBig {
    from {
      right: -1200px;
    }
    to {
      right: 0;
    }
  }
</style>
