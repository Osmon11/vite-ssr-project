<template>
  <div
    class="flex-box-between"
    style="margin-bottom: 16px"
  >
    <p class="title">
      {{
        $t(
          "lang-a7fbb933-403c-437a-8cb8-96eefb0b8309"
        )
      }}
    </p>
    <v-btn
      color="#61a375"
      class="text-white"
      @click="setModal(true)"
      >{{
        $t(
          "lang-2729514f-a39b-4cf6-981d-956ca5e814eb"
        )
      }}</v-btn
    >
  </div>
  <!-- <div v-if="store.slides.length">
    <div
      class="slide_item flex-box"
      style="align-items: flex-start"
      v-for="slide in store.slides"
      :key="slide._id"
    >
      <img
        class="img"
        v-show="loadedImg[slide._id]"
        :src="`${apiUrl}${slide.imageUrl}`"
        @load="onLoadImg(slide._id)"
        :alt="slide.imageName"
      />
      <div
        class="img flex-box-center"
        v-show="!loadedImg[slide._id]"
      >
        <img
          class="loading-gif"
          src="/assets/loading-8bars.gif"
          alt="loading gif"
        />
      </div>
      <div
        class="flex-box-between"
        style="width: calc(100% - 220px)"
      >
        <div>
          <p class="title">
            {{ slide[`title_${locale}`] }}
          </p>
          <p class="subtitle">
            {{ slide[`subtitle_${locale}`] }}
          </p>
        </div>
        <div class="flex-box-vertical">
          <v-btn
            icon="mdi-pencil"
            color="#61a375"
            @click="setCurrentSlide(slide)"
            style="
              margin-bottom: 10px;
              color: #ffffff;
              width: 40px;
            "
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
  <div
    class="flex-box-center"
    v-else
  >
    <p class="body1">
      {{
        $t(
          "lang-f1c57f05-0cea-4b81-b860-c6ac8ef3fa05"
        )
      }}
    </p>
  </div> -->
  <SlideModal
    v-model="openModal"
    :editSlide="currentSlide"
  />
</template>

<script lang="ts" setup>
  // import { apiUrl } from "@/utils/constants";
  import { onMounted, ref } from "vue";
  // import { useI18n } from "vue-i18n";

  import SlideModal from "./SlideModal.vue";

  // const { t } = useI18n();
  const openModal = ref(false);
  const currentSlide = ref({});
  // const loadedImg = ref({});

  onMounted(() => {});

  // function setCurrentSlide(slide) {
  //   currentSlide.value = slide;
  //   setModal(true);
  // }
  function setModal(value: boolean) {
    openModal.value = value;
    if (!value) {
      currentSlide.value = {};
    }
  }
  // function deleteSlide(slide) {
  //   store.setPromp({
  //     message: t(
  //       "lang-004708ab-a907-48db-9c1b-8c99fb35a283"
  //     ),
  //     confirm() {
  //       store.deleteSlide({ id: slide._id });
  //     },
  //   });
  // }
  // function onLoadImg(id) {
  //   loadedImg.value[id] = true;
  // }
</script>

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
