<script setup>
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import appStore from "../store";
  import SlideModal from "./SlideModal.vue";

  const store = appStore.useStore();
  const { t, locale } = useI18n();
  const openModal = ref(false);
  const currentSlide = ref({});
  const loadedImg = ref({});
  const backendUrl = import.meta.env.VITE_API_URL;

  onMounted(() => {
    store.getSlides();
    setTimeout(
      store.slides.forEach(
        (slide) => (loadedImg.value[slide._id] = true),
        10000
      )
    );
  });

  function setModal(value) {
    openModal.value = value;
    if (!value) {
      currentSlide.value = {};
    }
  }
  function setCurrentSlide(slide) {
    currentSlide.value = slide;
    setModal(true);
  }
  function deleteSlide(slide) {
    store.setPromp({
      message: t("questions.Подтверждаете_удаление_слайда"),
      confirm() {
        store.deleteSlide({ id: slide._id });
      },
    });
  }
  function onLoadImg(id) {
    loadedImg.value[id] = true;
  }
</script>

<template>
  <div class="flex-box-between" style="margin-bottom: 16px">
    <p class="title">{{ t("Слайды") }}</p>
    <v-btn color="#61a375" class="text-white" @click="setModal(true)">{{
      t("general.Новый_слайд")
    }}</v-btn>
  </div>
  <div v-if="store.slides.length">
    <div
      class="slide_item flex-box"
      style="align-items: flex-start"
      v-for="slide in store.slides"
      :key="slide._id"
    >
      <img
        class="img"
        v-show="loadedImg[slide._id]"
        :src="`${backendUrl}${slide.imageUrl}`"
        @load="onLoadImg(slide._id)"
        alt=""
      />
      <div class="img flex-box-center" v-show="!loadedImg[slide._id]">
        <img
          class="loading-gif"
          src="/assets/loading-8bars.gif"
          alt="loading gif"
        />
      </div>
      <div class="flex-box-between" style="width: calc(100% - 220px)">
        <div>
          <p class="title">{{ slide[`title_${locale}`] }}</p>
          <p class="subtitle">{{ slide[`subtitle_${locale}`] }}</p>
        </div>
        <div class="flex-box-vertical">
          <v-btn
            icon="mdi-pencil"
            color="#61a375"
            @click="setCurrentSlide(slide)"
            style="margin-bottom: 10px; color: #ffffff; width: 40px"
          ></v-btn
          ><v-btn
            icon="mdi-delete"
            color="#F44336"
            style="color: #ffffff; width: 40px"
            @click="deleteSlide(slide)"
          ></v-btn>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-box-center" v-else>
    <p class="body1">
      {{ t("errors.Слайдов_пока_нет_Создайте_новый_слайд") }}
    </p>
  </div>
  <SlideModal v-model="openModal" :editSlide="currentSlide" />
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
