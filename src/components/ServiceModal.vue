<script setup>
  import { computed, ref, watch } from "vue";
  import CKEditor from "@ckeditor/ckeditor5-vue";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic/";

  import { useStore } from "../store";
  import Dialog from "@/shared/Dialog.vue";
  import { editorConfig } from "@/plugins/ckeditor.js";
  import { useI18n } from "vue-i18n";

  const store = useStore();
  const props = defineProps(["open", "onClose", "editNews"]);
  const { t } = useI18n();
  const valid = ref(false);
  const name_en = ref("");
  const editorData_en = ref("");
  const name_ru = ref("");
  const editorData_ru = ref("");
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
        name_en.value = value.name_en;
        editorData_en.value = value.content_en;
        name_ru.value = value.name_ru;
        editorData_ru.value = value.content_ru;
      }
    }
  );
  function resetForm() {
    name_en.value = "";
    editorData_en.value = "";
    name_ru.value = "";
    editorData_ru.value = "";
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
      let data = {
        name_en: name_en.value,
        content_en: editorData_en.value,
        name_ru: name_ru.value,
        content_ru: editorData_ru.value,
      };
      if (!props.editNews) {
        store.setSetvice(data, callback);
      } else {
        store.updateService({ id: props.editNews._id }, data, callback);
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
          ? t("general.Редактирование_услуги")
          : t("general.Добавление_услуги")
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
            v-model="name_ru"
            type="text"
            name="title_ru"
            variant="outlined"
            :label="t('general.Заголовок_на_русском')"
            color="#61a375"
            required
            :rules="[(v) => !!v || t('errors.Введите_заголовок_на_русском')]"
          ></v-text-field>
          <CKEditor.component
            v-model="editorData_ru"
            :editor="ClassicEditor"
            :config="{
              ...editorConfig,
              placeholder: t('general.Напишите_контент_на_русском'),
            }"
          />
          <div style="width: 100%; height: 38px"></div>
          <v-text-field
            v-model="name_en"
            type="text"
            name="title_en"
            variant="outlined"
            :label="t('general.Заголовок_на_английском')"
            color="#61a375"
            required
            :rules="[(v) => !!v || t('errors.Введите_заголовок_на_английском')]"
          ></v-text-field>
          <CKEditor.component
            v-model="editorData_en"
            :editor="ClassicEditor"
            :config="{
              ...editorConfig,
              placeholder: t('general.Напишите_контент_на_английском'),
            }"
          />
          <div style="width: 100%; height: 38px"></div>
        </div>
        <div class="flex-box-center">
          <v-btn
            type="submit"
            color="#61a375"
            class="text-white"
            :loading="isLoading"
            >{{
              props.editNews ? t("general.Обновить") : t("general.Создать")
            }}</v-btn
          >
        </div></v-form
      >
    </div></Dialog
  >
</template>
