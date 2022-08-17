<script setup>
  import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
  import { onMounted, onUnmounted } from "@vue/runtime-core";
  import "vue3-carousel/dist/carousel.css";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";

  import { useStore } from "../store";
  import FeedbackModal from "@/components/FeedbackModal.vue";

  const store = useStore();
  const { t, locale } = useI18n();
  const activeSlide = ref(0);
  const openFeedbackModal = ref(false);
  const loadedImg = ref({});

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
  <div class="carousel">
    <Carousel wrapAround>
      <Slide v-for="slide in store.slides" :key="slide.id">
        <img
          class="carousel-img"
          :src="slide.imageUrl"
          :alt="slide.imageName"
        />
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
  .carousel {
    width: 100%;
    padding: 0px 50px;
  }
</style>
