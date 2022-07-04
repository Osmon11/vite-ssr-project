<script setup>
  import { ref } from "@vue/reactivity";
  import { onMounted, onUnmounted } from "@vue/runtime-core";

  const slides = [
    {
      maintitle: "Welcome to FIC",
      subtitle: "FIRST INTERNATIONAL CONSULTING",
      img: "http://fic-isfin.my/wp-content/uploads/2018/07/buildings-business-city-22804.jpg",
    },
    {
      maintitle: "MISSION",
      subtitle: "الأولى في الخدمة الإستشارية العالمية",
      img: "http://fic-isfin.my/wp-content/uploads/2018/07/architectural-design-calm-waters-cloud-formation-394355.jpg",
    },
    {
      maintitle: "We Provide",
      subtitle: "World class support and advisory services",
      img: "http://fic-isfin.my/wp-content/uploads/2018/07/charts-coffee-cup-938959.jpg",
    },
  ];
  const activeSlide = ref(0);
  let interval;
  onMounted(() => {
    interval = setInterval(() => {
      if (activeSlide.value + 1 !== slides.length) {
        activeSlide.value += 1;
      } else {
        activeSlide.value = 0;
      }
    }, 30000);
  });
  onUnmounted(() => {
    clearInterval(interval);
  });
</script>
<template>
  <div class="slider_container">
    <div
      v-for="(item, index) in slides"
      :key="item.img"
      class="slide_item"
      :class="{ active: activeSlide === index }"
      :style="{
        backgroundImage: `url(${item.img})`,
      }"
    >
      <div class="slide_inner">
        <div class="contain text_slider">
          <h2 class="maintitle">{{ item.maintitle }}</h2>
          <p class="subtitle">{{ item.subtitle }}</p>
        </div>
        <router-link to="/" class="slide_btn">Click to begin</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .slider_container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .slide_item {
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
    display: none;
    z-index: 0;
    animation: splash 1s ease-in;
  }
  .slide_item.active {
    display: block;
    z-index: 0;
  }
  @-webkit-keyframes splash {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
    75% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes splash {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
    75% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
  .slide_inner {
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
    background-color: #d65050;
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
  .slide_btn {
    background-color: #d65050;
    border: 1px solid #d65050;
    position: relative;
    display: inline-block;
    font-family: "Raleway", sans-serif;
    font-size: 13px;
    line-height: 24px;
    font-weight: 700;
    padding: 12px 35px;
    color: #fff;
    text-transform: uppercase;
    border-radius: 3px;
    transition: all 0.3s;
    cursor: pointer;
    text-decoration: none;
  }
  .slide_btn:hover {
    color: #d65050;
    background-color: transparent;
  }
  .text_slider {
    position: relative;
    -webkit-animation-duration: 1.25s;
    animation-duration: 1.25s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInRightBig;
    animation-name: fadeInRightBig;
  }
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
