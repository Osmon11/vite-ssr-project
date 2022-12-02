<template>
  <div class="slider-container">
    <div
      v-for="(slide, index) in slideList"
      :key="slide._id"
      class="slide-item"
      :class="{ active: activeSlide === index }"
    >
      <div
        v-show="loadedImg[slide._id]"
        style="width: 100%; height: 100%"
      >
        <img
          class="img"
          :src="`${apiUrl}${slide.imageUrl}`"
          @load="onLoadImg(slide._id)"
          :alt="slide.imageName"
        />
        <div class="image-black-cover"></div>
        <div
          class="slide-inner flex-box-center flex-box-vertical"
        >
          <div class="contain text-slider">
            <h1 class="maintitle">
              {{
                slide[
                  `title_${locale}` as keyof typeof slide
                ]
              }}
            </h1>
            <p class="subtitle">
              {{
                slide[
                  `subtitle_${locale}` as keyof typeof slide
                ]
              }}
            </p>
          </div>
          <v-btn
            color="#61a375"
            class="text-white"
            @click="feedbackModal = true"
          >
            {{
              t(
                "lang-a3bed61a-5493-4c37-9959-704e03364489"
              )
            }}
          </v-btn>
        </div>
      </div>
      <div
        v-show="!loadedImg[slide._id]"
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
  <FeedbackModal v-model="feedbackModal" />
</template>

<script lang="ts" setup>
  import {
    computed,
    onMounted,
    onUnmounted,
  } from "vue";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";

  import { useSliderStore } from "@/stores/slider";
  import FeedbackModal from "@/components/dialogs/FeedbackModal.vue";
  import { apiUrl } from "@/utils/constants";
  import { isSlideList } from "@/api/index.guards";
  import { IIndexable } from "../types/interfaces";

  const sliderStore = useSliderStore();
  const { t, locale } = useI18n();
  const activeSlide = ref(0);
  const feedbackModal = ref(false);
  const loadedImg = ref<IIndexable>({});

  const slideList = computed(
    () => sliderStore.getSlides
  );

  let interval: NodeJS.Timer;
  onMounted(() => {
    sliderStore.fetchSlides().then((data) => {
      if (isSlideList(data)) {
        setTimeout(() => {
          interval = setInterval(() => {
            if (
              activeSlide.value + 1 !==
              sliderStore.slides.length
            ) {
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

  function onLoadImg(id: string) {
    loadedImg.value[id] = true;
  }
</script>

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
    object-position: center;
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
