<script setup>
  import { computed, ref, watch } from "vue";
  import { Quill, QuillEditor } from "@vueup/vue-quill";
  import "@vueup/vue-quill/dist/vue-quill.snow.css";
  import * as Emoji from "quill-emoji";
  import MagicUrl from "quill-magic-url";
  import * as QuillTableUI from "quill-table-ui";
  import BlotFormatter from "quill-blot-formatter";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";

  const store = useStore();
  const props = defineProps(["open", "onClose", "editNews"]);
  const valid = ref(false);
  const title = ref("");
  const subtitle = ref("");
  const image = ref([]);
  const content = ref("");
  const isLoading = ref(false);
  const fileInputLabel = computed(() =>
    props.editNews && !image.value[0] ? props.editNews["imageName"] : "Обложка"
  );
  const quillEditor = ref([]);
  const quillOptions = {
    theme: "snow",
    modules: {
      toolbar: "full",
      "emoji-toolbar": true,
      "emoji-textarea": true,
      "emoji-shortname": true,
      magicUrl: true,
      table: true,
      tableUI: true,
    },
    placeholder: "Напишите контент",
  };

  watch(
    () => props.editNews,
    (value) => {
      if (value) {
        title.value = value.title;
        subtitle.value = value.subtitle;
        image.value = [];
        quillEditor.value[0].setContents(JSON.parse(value.content));
      }
    }
  );
  // Quill.register("modules/emogi", Emoji);
  // Quill.register("modules/blot-formatter", BlotFormatter);
  // Quill.register("modules/magic-url", MagicUrl);
  // Quill.register("modules/table-ui", QuillTableUI);
  function resetForm() {
    title.value = "";
    subtitle.value = "";
    image.value = [];
    quillEditor.value[0].setContents("");
  }
  function callback(success) {
    isLoading.value = false;
    if (success) {
      resetForm();
      props.onClose(false);
    }
  }
  function submitHandler() {
    if (!content.value)
      store.setAlert({
        severity: "error",
        message: "Вы забыли написать контент",
      });

    if (valid.value) {
      isLoading.value = true;
      let data = new FormData();
      data.append("title", title.value);
      data.append("subtitle", subtitle.value);
      data.append("content", JSON.stringify(content.value));
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
            v-model="title"
            type="text"
            name="title"
            variant="outlined"
            label="Заголовок"
            color="#61a375"
            required
            :rules="[(v) => !!v || 'Введите заголовок']"
          ></v-text-field>
          <v-textarea
            v-model="subtitle"
            type="text"
            name="subtitle"
            variant="outlined"
            label="Краткое описание"
            color="#61a375"
            required
            :rules="[(v) => !!v || 'Введите краткое описание']"
          ></v-textarea>
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
          <QuillEditor
            :ref="(ref) => (quillEditor[0] = ref)"
            theme="snow"
            toolbar="full"
            :globalOptions="quillOptions"
            v-model:content="content"
          />
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
