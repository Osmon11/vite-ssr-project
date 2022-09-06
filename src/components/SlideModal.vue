<script setup>
  import { computed, ref, watch } from "vue";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";
  import { useI18n } from "vue-i18n";

  const { setSlide, updateSlide } = useStore();
  const props = defineProps(["open", "onClose", "editSlide"]);
  const { t } = useI18n();
  const form = ref();
  const valid = ref(true);
  const title_en = ref("");
  const subtitle_en = ref("");
  const title_ru = ref("");
  const subtitle_ru = ref("");
  const image = ref([]);
  const isLoading = ref(false);

  watch(
    () => props.editSlide,
    (value) => {
      if (value) {
        title_en.value = value.title_en;
        subtitle_en.value = value.subtitle_en;
        title_ru.value = value.title_ru;
        subtitle_ru.value = value.subtitle_ru;
        image.value = [];
      } else {
        resetForm();
      }
    }
  );

  const fileInputLabel = computed(() =>
    props.editSlide && image.value.length === 0
      ? props.editSlide["imageName"]
      : t("general.Изображение_фона")
  );
  const resetForm = () => {
    title_en.value = "";
    // subtitle_en.value = "";
    // title_ru.value = "";
    // subtitle_ru.value = "";
    // image.value = [];
    form.value.resetValidation();
  };
  function callback(success) {
    isLoading.value = false;
    if (success) {
      resetForm();
      props.onClose(false);
    }
  }
  function submitHandler() {
    if (valid.value) {
      isLoading.value = true;
      const data = new FormData();
      data.append("title_ru", title_ru.value);
      data.append("subtitle_ru", subtitle_ru.value);
      data.append("title_en", title_en.value);
      data.append("subtitle_en", subtitle_en.value);

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
      image.value = [];
    }
  }
</script>

<template>
  <Dialog :open="open" :onClose="onClose">
    <div class="flex-box flex-box-center">
      <v-form
        class="form-max-width"
        v-model="valid"
        :ref="(ref) => (form = ref)"
        @submit.prevent="submitHandler"
        lazy-validation
      >
        <p class="title text-center mb-4" style="width: 100%">
          {{
            props.editSlide
              ? t("general.Редактировать_слайд")
              : t("general.Новый_слайд")
          }}
        </p>
        <v-text-field
          v-model="title_ru"
          type="text"
          name="title_ru"
          variant="outlined"
          :label="t('general.Заголовок_на_русском')"
          color="#61a375"
          required
          :rules="[(v) => !!v || t('errors.Введите_заголовок_на_русском')]"
        ></v-text-field>
        <v-text-field
          v-model="subtitle_ru"
          type="text"
          name="subtitle_ru"
          variant="outlined"
          :label="t('general.Подзаголовок_на_русском')"
          color="#61a375"
          required
          :rules="[(v) => !!v || t('general.Введите_подзаголовок_на_русском')]"
        ></v-text-field>
        <v-text-field
          v-model="title_en"
          type="text"
          name="title_en"
          variant="outlined"
          :label="t('general.Заголовок_на_английском')"
          color="#61a375"
          required
          :rules="[(v) => !!v || t('errors.Введите_заголовок_на_английском')]"
        ></v-text-field>
        <v-text-field
          v-model="subtitle_en"
          type="text"
          name="subtitle_en"
          variant="outlined"
          :label="t('general.Подзаголовок_на_английском')"
          color="#61a375"
          required
          :rules="[
            (v) => !!v || t('general.Введите_подзаголовок_на_английском'),
          ]"
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
              !!v[0] ||
              Boolean(editSlide) ||
              t('errors.Загрузите_фоновое_изображение'),
          ]"
          show-size
        ></v-file-input>
        <div class="flex-box-center">
          <v-btn
            color="#61a375"
            class="text-white"
            type="submit"
            :loading="isLoading"
            >{{
              props.editSlide
                ? t("general.Обновить")
                : t("general.Добавить_слайд")
            }}</v-btn
          >
        </div>
      </v-form>
    </div></Dialog
  >
</template>
