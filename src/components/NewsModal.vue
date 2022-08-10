<script setup>
  import { computed, ref, watch } from "vue";
  import CKEditor from "@ckeditor/ckeditor5-vue";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic/";
  import cookie_js from "cookie_js";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";

  const store = useStore();
  const props = defineProps(["open", "onClose", "editNews"]);
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
    props.editNews && !image.value[0] ? props.editNews["imageName"] : "Обложка"
  );

  const editorConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "underline",
        "highlight",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "alignment",
        "indent",
        "|",
        "imageInsert",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "|",
        "fontBackgroundColor",
        "fontColor",
        "fontFamily",
        "fontSize",
        "|",
        "undo",
        "findAndReplace",
        "redo",
        "|",
        "removeFormat",
        "sourceEditing",
        "code",
        "codeBlock",
        "horizontalLine",
      ],
    },
    language: "en",
    image: {
      toolbar: [
        "imageTextAlternative",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
        "linkImage",
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableCellProperties",
        "tableProperties",
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: "iframe",
          attributes: true,
          classes: true,
          styles: true,
        },
        {
          name: "video",
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
    },
    uploadAdapter: {
      uploadUrl: `${import.meta.env.VITE_API_URL}/editor-uploads`,
      useFetch: true, // optional
      headers: { Authorization: cookie_js.get(import.meta.env.VITE_TOKEN_KEY) }, // optional (eg. in asp.net core for CSRF prevention you would have headers : { "RequestVerificationToken": _serverSideGeneratedCSRFToken })
    },
  };
  watch(
    () => props.editNews,
    (value) => {
      if (value) {
        title_en.value = value.title_en;
        subtitle_en.value = value.subtitle_en;
        editorData_en.value = value.conten_en;
        title_ru.value = value.title_ru;
        subtitle_ru.value = value.subtitle_ru;
        editorData_ru.value = value.conten_ru;
        image.value = [];
      }
    }
  );
  function resetForm() {
    title_en.value = "";
    subtitle_en.value = "";
    editorData_en.value = "";
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
    if (!editorData_en.value) {
      return store.setAlert({
        severity: "error",
        message: "Вы забыли написать контент",
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
    <p class="title text-center" style="width: 100%">
      {{ props.editNews ? "Редактировать новость" : "Новая новость" }}
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
            label="Заголовок на русском"
            color="#61a375"
            required
            :rules="[(v) => !!v || 'Введите заголовок на русском']"
          ></v-text-field>
          <v-textarea
            v-model="subtitle_ru"
            type="text"
            name="subtitle_ru"
            variant="outlined"
            label="Краткое описание на русском"
            color="#61a375"
            required
            :rules="[(v) => !!v || 'Введите краткое описание на русском']"
          ></v-textarea>
          <CKEditor.component
            v-model="editorData_ru"
            :editor="ClassicEditor"
            :config="{
              ...editorConfig,
              placeholder: 'Напишите новость на русском',
            }"
          />
          <div style="width: 100%; height: 38px"></div>
          <v-text-field
            v-model="title_en"
            type="text"
            name="title_en"
            variant="outlined"
            label="Заголовок на английском"
            color="#61a375"
            required
            :rules="[(v) => !!v || 'Введите заголовок на английском']"
          ></v-text-field>
          <v-textarea
            v-model="subtitle_en"
            type="text"
            name="subtitle_en"
            variant="outlined"
            label="Краткое описание на английском"
            color="#61a375"
            required
            :rules="[(v) => !!v || 'Введите краткое описание на английском']"
          ></v-textarea>
          <CKEditor.component
            v-model="editorData_en"
            :editor="ClassicEditor"
            :config="{
              ...editorConfig,
              placeholder: 'Напишите новость на английском',
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
                !!v[0] || Boolean(editNews) || 'Загрузите фоновое изображение',
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
            >{{ props.editNews ? "Обновить" : "Добавить новость" }}</v-btn
          >
        </div></v-form
      >
    </div></Dialog
  >
</template>

<style scoped>
  .editor-wrapper {
    max-width: 950px;
    min-height: 450px;
    background: #fff;
    border-radius: 8px;
    -webkit-box-shadow: 0 24px 24px -18px rgb(69 104 129 / 33%),
      0 9px 45px 0 rgb(114 119 160 / 12%);
    box-shadow: 0 24px 24px -18px rgb(69 104 129 / 33%),
      0 9px 45px 0 rgb(114 119 160 / 12%);
    padding: 70px 50px;
    margin: 32px auto;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
