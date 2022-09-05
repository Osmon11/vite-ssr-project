<script setup>
  import { onMounted, onUnmounted } from "@vue/runtime-core";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";

  import { useStore } from "../store";
  import FeedbackModal from "@/components/FeedbackModal.vue";

  const store = useStore();
  const { t, locale } = useI18n();
  const activeSlide = ref(0);
  const openFeedbackModal = ref(false);
  const loadedImg = ref({});
  const backendUrl = import.meta.env.VITE_API_URL;

  let interval;
  onMounted(() => {
    store.getSlides({}, (succes) => {
      if (succes) {
        setTimeout(() => {
          interval = setInterval(() => {
            if (activeSlide.value + 1 !== store.slides.length) {
              activeSlide.value += 1;
            } else {
              activeSlide.value = 0;
            }
          }, 5000);
        }, 5000);
      }
    });
  });

  onUnmounted(() => {
    clearInterval(interval);
  });

  function setFeedbackModal(value) {
    openFeedbackModal.value = value;
  }
  function onLoadImg(id) {
    loadedImg.value[id] = true;
  }
</script>

<template>
  <div class="slider-container">
    <div
      v-for="(slide, index) in store.slides"
      :key="slide.id"
      class="slide-item"
      :class="{ active: activeSlide === index }"
    >
      <div v-show="loadedImg[slide.id]" style="width: 100%; height: 100%">
        <img
          class="img"
          :src="`${backendUrl}${slide.imageUrl}`"
          @load="onLoadImg(slide.id)"
          :alt="slide.imageName"
        />
        <div class="image-black-cover"></div>
        <div class="slide-inner flex-box-center flex-box-vertical">
          <div class="contain text-slider">
            <h2 class="maintitle">{{ slide[`title_${locale}`] }}</h2>
            <p class="subtitle">{{ slide[`subtitle_${locale}`] }}</p>
          </div>
          <v-btn
            color="#61a375"
            class="text-white"
            @click="setFeedbackModal(true)"
          >
            {{ t("general['свяжитесь с нами']") }}
          </v-btn>
        </div>
      </div>
      <div
        v-show="!loadedImg[slide.id]"
        class="flex-box-center"
        style="width: 100%; height: 100%"
      >
        <img
          src="/assets/loading-12bras.gif"
          alt="background loading svg"
          style="width: 10%"
        />
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
    z-index: -1;
    opacity: 0;
    transition: all 2s;
  }
  .slide-item .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image-black-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.25);
  }
  .slide-item.active {
    z-index: 0;
    opacity: 1;
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
    text-transform: uppercase;
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
    padding: 20px 20px 50px;
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
  @media (min-width: 0px) and (max-width: 600px) {
    .maintitle {
      font-size: 30px;
    }
    .subtitle {
      font-size: 20px;
    }
  }
  @media (min-width: 600px) and (max-width: 960px) {
    .maintitle {
      font-size: 40px;
    }
    .subtitle {
      font-size: 20px;
    }
  }
</style>
