<script setup>
  import { useI18n } from "vue-i18n";
  import { computed, ref, watch } from "vue";
  import CKEditor from "@ckeditor/ckeditor5-vue";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

  import appStore from "../store";
  import Dialog from "@/shared/Dialog.vue";
  import ckeditor from "@/plugins/ckeditor.js";

  const store = appStore.useStore();
  const props = defineProps(["modelValue", "editNews"]);
  const emit = defineEmits(["update:modelValue"]);
  const { t } = useI18n();
  const form = ref();
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
    props.editNews && image.value.length === 0
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
  function callback(success) {
    isLoading.value = false;
    if (success) {
      closeHandler();
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
  function closeHandler() {
    title_en.value = "";
    subtitle_en.value = "";
    editorData_en.value = "";
    title_ru.value = "";
    subtitle_ru.value = "";
    editorData_ru.value = "";
    image.value = [];
    form.value.resetValidation();
    emit("update:modelValue", false);
  }
</script>

<template>
  <Dialog :open="props.modelValue" :onClose="closeHandler">
    <p class="title text-center" style="width: 100%; margin-bottom: 28px">
      {{
        props.editNews
          ? t("general.редактировать_новость")
          : t("general.добавить_новость")
      }}
    </p>
    <div class="flex-box-center">
      <v-form
        ref="form"
        v-model="valid"
        class="form-max-width"
        @submit.prevent="submitHandler"
        lazy-validation
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
              ...ckeditor.editorConfig,
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
              ...ckeditor.editorConfig,
              placeholder: t('general.Напишите_новость_на_английском'),
            }"
          />
          <div style="width: 100%; height: 38px"></div>
          <v-file-input
            v-model="image"
            name="image"
            accept="image/*"
            variant="outlined"
            :label="fileInputLabel"
            color="#61a375"
            :required="!editNews"
            :rules="[
              (v) =>
                !!v || !!v.length || t('errors.Загрузите_фоновое_изображение'),
            ]"
            multiple
          ></v-file-input>
        </div>
        <div class="flex-box-center">
          <div class="flex-box" style="gap: 20px">
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
            <v-btn color="#F44336" class="text-white" @click="closeHandler">{{
              t("general.отмена")
            }}</v-btn>
          </div>
        </div></v-form
      >
    </div></Dialog
  >
</template>
