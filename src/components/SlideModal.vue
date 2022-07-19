<script setup>
  import { computed, ref, watch } from "vue";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";

  const { setSlide, updateSlide } = useStore();
  const props = defineProps(["open", "onClose", "editSlide"]);
  const valid = ref(true);
  const title = ref("");
  const subtitle = ref("");
  const image = ref([]);
  const isLoading = ref(false);

  watch(
    () => props.editSlide,
    (value) => {
      if (value) {
        title.value = value.title;
        subtitle.value = value.subtitle;
        image.value = [];
      }
    }
  );

  const fileInputLabel = computed(() =>
    props.editSlide && !image.value[0]
      ? props.editSlide["imageName"]
      : "Изображение фона"
  );

  function callback(success) {
    isLoading.value = false;
    if (success) {
      title.value = "";
      subtitle.value = "";
      image.value = {};
      props.onClose(false);
    }
  }
  function submitHandler() {
    if (valid.value) {
      isLoading.value = true;
      const data = new FormData();
      data.append("title", title.value);
      data.append("subtitle", subtitle.value);

      if (!props.editSlide) {
        data.append("image", image.value[0]);
        setSlide(data, callback);
      } else {
        if (image.value[0]) {
          data.append("image", image.value[0]);
        }
        data.append("imageUrl", props.editSlide.imageUrl);
        updateSlide({ id: props.editSlide._id }, data, callback);
      }
      image.value = null;
    }
  }
</script>

<template>
  <Dialog :open="open" :onClose="onClose">
    <div class="flex-box flex-box-center">
      <v-form
        class="form-max-width"
        v-model="valid"
        @submit.prevent="submitHandler"
      >
        <p class="title text-center mb-4" style="width: 100%">
          {{ props.editSlide ? "Редактировать слайд" : "Новый слайд" }}
        </p>
        <v-text-field
          v-model="title"
          type="text"
          name="title"
          variant="outlined"
          label="Заголовок"
          color="#61a375"
          required
          :rules="[(v) => !!v || 'Введите заголовок']"
        ></v-text-field>
        <v-text-field
          v-model="subtitle"
          type="text"
          name="subtitle"
          variant="outlined"
          label="Подзаголовок"
          color="#61a375"
          required
          :rules="[(v) => !!v || 'Введите подзаголовок']"
        ></v-text-field>
        <v-file-input
          name="image"
          accept="image/*"
          variant="outlined"
          :label="fileInputLabel"
          color="#61a375"
          @update:model-value="(value) => (image = value)"
          :required="!editSlide"
          :rules="[
            (v) =>
              !!v[0] || Boolean(editSlide) || 'Загрузите фоновое изображение',
          ]"
          show-size
        ></v-file-input>
        <div class="flex-box-center">
          <v-btn
            color="#61a375"
            class="text-white"
            type="submit"
            :loading="isLoading"
            >{{ props.editSlide ? "Обновить" : "Добавить слайд" }}</v-btn
          >
        </div>
      </v-form>
    </div></Dialog
  >
</template>
