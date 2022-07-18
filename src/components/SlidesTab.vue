<script setup>
  import { onMounted, ref } from "vue";

  import { useStore } from "../store";
  import SlideModal from "./SlideModal.vue";

  const store = useStore();
  const openModal = ref(false);
  const currentSlide = ref(null);
  const loadingImg = ref({});

  onMounted(() => {
    store.getSlides({}, (succes) => {
      if (succes) {
        let newState = {};
        store.slides.forEach((slide) => {
          newState[slide.id] = true;
        });
        loadingImg.value = newState;
        setTimeout(() => {
          let resetState = {};
          store.slides.forEach((slide) => {
            resetState[slide.id] = false;
          });
          loadingImg.value = resetState;
        }, 5000);
      }
    });
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
  function onLoadImg(id) {
    loadingImg.value[id] = false;
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
      <img
        class="img"
        v-show="!loadingImg[slide.id]"
        :src="slide.imageUrl"
        loading="lazy"
        @load="onLoadImg(slide.id)"
        alt=""
      />
      <div class="img flex-box-center" v-show="loadingImg[slide.id]">
        <img
          class="loading-gif"
          src="/public/assets/loading.gif"
          alt="loading gif"
        />
      </div>
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
  <div class="flex-box-center" v-else>
    <p class="body1">Слайдов пока нет. Создайте новый слайд</p>
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
  .slide_item .img {
    width: 200px;
    height: 120px;
  }
</style>
