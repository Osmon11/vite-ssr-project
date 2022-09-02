<script setup>
  import { useI18n } from "vue-i18n";
  import { computed, ref, watch } from "vue";
  import CKEditor from "@ckeditor/ckeditor5-vue";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

  import { useStore } from "../store";
  import Dialog from "@/shared/Dialog.vue";
  import { editorConfig } from "@/plugins/ckeditor.js";

  const store = useStore();
  const props = defineProps(["open", "onClose", "editNews"]);
  const { t } = useI18n();
  const valid = ref(false);
  const title_en = ref("");
  const subtitle_en = ref("");
  const editorData_en = ref("");
  const title_ru = ref("");
  const subtitle_ru = ref("");
  const editorData_ru = ref("");
  const image = ref([]);
  const isLoading = ref(false);
  const fileInputLabel = computed(() =>
    props.editNews && !image.value?.length
      ? props.editNews["imageName"]
      : t("general.Обложка")
  );

  watch(
    () => props.editNews,
    (value) => {
      if (value) {
        title_en.value = value.title_en;
        subtitle_en.value = value.subtitle_en;
        editorData_en.value = value.content_en;
        title_ru.value = value.title_ru;
        subtitle_ru.value = value.subtitle_ru;
        editorData_ru.value = value.content_ru;
        image.value = [];
      }
    }
  );
  function resetForm() {
    title_en.value = "";
    subtitle_en.value = "";
    editorData_en.value = "";
    title_ru.value = "";
    subtitle_ru.value = "";
    editorData_ru.value = "";
    image.value = [];
  }
  function callback(success) {
    isLoading.value = false;
    if (success) {
      resetForm();
      props.onClose(false);
    }
  }
  function submitHandler() {
    if (!editorData_ru.value) {
      return store.setAlert({
        severity: "error",
        message: t("errors.Вы_забыли_написать_контент_на_русском"),
      });
    }
    if (!editorData_en.value) {
      return store.setAlert({
        severity: "error",
        message: t("errors.Вы_забыли_написать_контент_на_английском"),
      });
    }

    if (valid.value) {
      isLoading.value = true;
      let data = new FormData();
      data.append("title_en", title_en.value);
      data.append("subtitle_en", subtitle_en.value);
      data.append("content_en", editorData_en.value);
      data.append("title_ru", title_ru.value);
      data.append("subtitle_ru", subtitle_ru.value);
      data.append("content_ru", editorData_ru.value);
      if (!props.editNews) {
        data.append("image", image.value[0]);
        store.setNews(data, callback);
      } else {
        if (image.value[0]) {
          data.append("image", image.value[0]);
        }
        data.append("imageUrl", props.editNews.imageUrl);
        store.updateNews({ id: props.editNews._id }, data, callback);
      }
    }
  }
</script>

<template>
  <Dialog
    :open="open"
    :onClose="
      (value) => {
        resetForm();
        onClose(value);
      }
    "
  >
    <p class="title text-center" style="width: 100%; margin-bottom: 28px">
      {{
        props.editNews
          ? t("general.редактировать_новость")
          : t("general.новая_новость")
      }}
    </p>
    <div class="flex-box-center">
      <v-form
        class="form-max-width"
        v-model="valid"
        @submit.prevent="submitHandler"
      >
        <div class="editor-wrapper">
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
          <v-textarea
            v-model="subtitle_ru"
            type="text"
            name="subtitle_ru"
            variant="outlined"
            :label="t('general.Краткое_описание_на_русском')"
            color="#61a375"
            required
            :rules="[
              (v) => !!v || t('errors.Введите_краткое_описание_на_русском'),
            ]"
          ></v-textarea>
          <CKEditor.component
            v-model="editorData_ru"
            :editor="ClassicEditor"
            :config="{
              ...editorConfig,
              placeholder: t('general.Напишите_новость_на_русском'),
            }"
          />
          <div style="width: 100%; height: 38px"></div>
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
          <v-textarea
            v-model="subtitle_en"
            type="text"
            name="subtitle_en"
            variant="outlined"
            :label="t('general.Краткое_описание_на_английском')"
            color="#61a375"
            required
            :rules="[
              (v) => !!v || t('errors.Введите_краткое_описание_на_английском'),
            ]"
          ></v-textarea>
          <CKEditor.component
            v-model="editorData_en"
            :editor="ClassicEditor"
            :config="{
              ...editorConfig,
              placeholder: t('general.Напишите_новость_на_английском'),
            }"
          />
          <div style="width: 100%; height: 38px"></div>
          <v-file-input
            name="image"
            accept="image/*"
            variant="outlined"
            :label="fileInputLabel"
            color="#61a375"
            :model-value="image"
            @update:model-value="(value) => (image = value)"
            :required="!editNews"
            :rules="[
              (v) =>
                !!v[0] ||
                Boolean(editNews) ||
                t('errors.Загрузите_фоновое_изображение'),
            ]"
            clearable
            show-size
          ></v-file-input>
        </div>
        <div class="flex-box-center">
          <v-btn
            type="submit"
            color="#61a375"
            class="text-white"
            :loading="isLoading"
            >{{
              props.editNews
                ? t("general.Обновить")
                : t("general.Добавить_новость")
            }}</v-btn
          >
        </div></v-form
      >
    </div></Dialog
  >
</template>
