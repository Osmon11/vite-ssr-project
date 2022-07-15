<script setup>
  import { onMounted, ref } from "vue";

  import { useStore } from "../store";
  import SlideModal from "./SlideModal.vue";

  const store = useStore();
  const openModal = ref(false);
  const currentSlide = ref(null);

  onMounted(() => {
    store.getSlides();
  });

  function setModal(value) {
    openModal.value = value;
  }
  function setCurrentSlide(slide) {
    currentSlide.value = slide;
    openModal.value = true;
  }
  function deleteSlide(slide) {
    store.setPromp({
      message: "Подтверждаете удаление слайда ?",
      confirm() {
        store.deleteSlide({ id: slide.id });
      },
    });
  }
</script>

<template>
  <div class="flex-box-between" style="margin-bottom: 16px">
    <p class="title">Список слайдов</p>
    <v-btn color="#61a375" class="text-white" @click="setModal(true)"
      >Новый слайд</v-btn
    >
  </div>
  <div v-if="store.slides.length">
    <div
      class="slide_item flex-box"
      style="align-items: flex-start"
      v-for="slide in store.slides"
      :key="slide.id"
    >
      <img :src="slide.imageUrl" alt="" />
      <div class="flex-box-between" style="width: calc(100% - 220px)">
        <div>
          <p class="title">{{ slide.title }}</p>
          <p class="subtitle">{{ slide.subtitle }}</p>
        </div>
        <div class="flex-box-vertical">
          <v-btn
            icon="mdi-pencil"
            color="#61a375"
            @click="setCurrentSlide(slide)"
            style="margin-bottom: 10px; color: #ffffff"
          ></v-btn
          ><v-btn
            icon="mdi-delete"
            color="red"
            @click="deleteSlide(slide)"
          ></v-btn>
        </div>
      </div>
    </div>
  </div>
  <SlideModal :open="openModal" :onClose="setModal" :editSlide="currentSlide" />
</template>

<style scoped>
  .slide_item {
    gap: 20px;
    padding: 16px 0px;
    margin-bottom: 20px;
    border-bottom: 1px solid #61a375;
  }
  .slide_item img {
    width: 200px;
    height: 120px;
  }
</style>
