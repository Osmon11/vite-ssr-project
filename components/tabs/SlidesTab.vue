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
      @click="dialog = true"
      >{{
        $t(
          "lang-2729514f-a39b-4cf6-981d-956ca5e814eb"
        )
      }}</v-btn
    >
  </div>
  <DataContainer
    :loading="loading"
    :noData="!Boolean(slides.length)"
    noDataText="lang-f1c57f05-0cea-4b81-b860-c6ac8ef3fa05"
  >
    <div v-if="slides.length">
      <div
        class="slide_item flex-box"
        style="align-items: flex-start"
        v-for="slide in slides"
        :key="slide._id"
      >
        <img
          class="img"
          :src="`${apiUrl}${slide.imageUrl}`"
          :alt="slide.imageName"
        />
        <div
          class="flex-box-between"
          style="width: calc(100% - 220px)"
        >
          <div>
            <p class="title">
              {{
                slide[
                  `title_${locale}` as keyof typeof slide
                ]
              }}
            </p>
            <p class="subtitle">
              {{
                slide[
                  `subtitle_${locale}` as keyof typeof slide
                ]
              }}
            </p>
          </div>
          <div class="flex-box-vertical">
            <v-btn
              icon="mdi-pencil"
              color="#61a375"
              @click="onEditClick(slide)"
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
              @click="onDeleteClick(slide)"
            ></v-btn>
          </div>
        </div>
      </div></div
  ></DataContainer>
  <SlideDialog v-model="dialog" />
</template>

<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { computed, onMounted, ref } from "vue";

  import SlideDialog from "@/components/dialogs/SlideDialog.vue";
  import DataContainer from "@/containers/DataContainer.vue";

  import { apiUrl } from "@/utils/constants";
  import { ISlide } from "@/api/index.types";

  import { useSlideStore } from "@/stores/slide";

  const { locale } = useI18n();

  const sliderStore = useSlideStore();
  const dialog = ref(false);
  const loading = ref(false);

  const slides = computed(
    () => sliderStore.getSlides
  );

  onMounted(() => {
    loading.value = true;
    sliderStore.fetchSlideList().then(() => {
      loading.value = false;
    });
  });

  function onEditClick(slide: ISlide) {
    sliderStore.setForm(slide);
  }
  function onDeleteClick(slide: ISlide) {
    if (false) {
      sliderStore.delete(slide._id);
    }
    //   store.setPromp({
    //     message: t(
    //       "lang-004708ab-a907-48db-9c1b-8c99fb35a283"
    //     ),
    //     confirm() {
    //       store.deleteSlide({ id: slide._id });
    //     },
    //   });
  }
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
