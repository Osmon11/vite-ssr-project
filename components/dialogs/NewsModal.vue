<script setup>
  import { useI18n } from "vue-i18n";
  import { computed, ref, watch } from "vue";
  import CKEditor from "@ckeditor/ckeditor5-vue";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

  import appStore from "../store";
  import Dialog from "@/shared/Dialog.vue";
  import ckeditor from "@/plugins/ckeditor.js";

  const store = appStore.useStore();
  const props = defineProps([
    "modelValue",
    "editNews",
  ]);
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
      : t(
          "lang-e04aebbb-af6d-45fb-ae3f-c3dac8e7df81"
        )
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
        message: t(
          "lang-5f8ac396-82b4-4598-9226-f09d13bb2e9e"
        ),
      });
    }
    if (!editorData_en.value) {
      return store.setAlert({
        severity: "error",
        message: t(
          "lang-d001e0bd-1ded-4909-b9db-1c01862a45cd"
        ),
      });
    }

    if (valid.value) {
      isLoading.value = true;
      let data = new FormData();
      data.append("title_en", title_en.value);
      data.append(
        "subtitle_en",
        subtitle_en.value
      );
      data.append(
        "content_en",
        editorData_en.value
      );
      data.append("title_ru", title_ru.value);
      data.append(
        "subtitle_ru",
        subtitle_ru.value
      );
      data.append(
        "content_ru",
        editorData_ru.value
      );
      if (!props.editNews) {
        data.append("image", image.value[0]);
        store.setNews(data, callback);
      } else {
        if (image.value[0]) {
          data.append("image", image.value[0]);
        }
        data.append(
          "imageUrl",
          props.editNews.imageUrl
        );
        store.updateNews(
          { id: props.editNews._id },
          data,
          callback
        );
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
  <Dialog
    :open="props.modelValue"
    :onClose="closeHandler"
  >
    <p
      class="title text-center"
      style="width: 100%; margin-bottom: 28px"
    >
      {{
        props.editNews
          ? t(
              "lang-67ea05f8-55ba-4c75-b44f-1f24164cd1a3"
            )
          : t(
              "lang-c7c4caaa-a029-4b61-9837-ee2f3711a07a"
            )
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
            :label="
              t(
                'lang-37df7a50-035e-4529-9c53-39f48cc95e77'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                t(
                  'lang-8c98444e-2285-4236-816d-c653a0fa12ce'
                ),
            ]"
          ></v-text-field>
          <v-textarea
            v-model="subtitle_ru"
            type="text"
            name="subtitle_ru"
            variant="outlined"
            :label="
              t(
                'lang-8b92adf8-7f88-4e1f-ae2f-e5464cd56994'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                t(
                  'lang-404eec0f-8728-4bb1-b31d-154bff562be4'
                ),
            ]"
          ></v-textarea>
          <CKEditor.component
            v-model="editorData_ru"
            :editor="ClassicEditor"
            :config="{
              ...ckeditor.editorConfig,
              placeholder: t(
                'lang-2846959c-28e9-4cee-b173-b85c33fe6d63'
              ),
            }"
          />
          <div
            style="width: 100%; height: 38px"
          ></div>
          <v-text-field
            v-model="title_en"
            type="text"
            name="title_en"
            variant="outlined"
            :label="
              t(
                'lang-082f01c6-dc8d-4f1a-8bea-7739259d8c8d'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                t(
                  'lang-5317fbd0-71ca-406a-bc7f-7ec8d24c9524'
                ),
            ]"
          ></v-text-field>
          <v-textarea
            v-model="subtitle_en"
            type="text"
            name="subtitle_en"
            variant="outlined"
            :label="
              t(
                'lang-a29ef29c-2b0c-4fc9-bb66-87366263d7f9'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                t(
                  'lang-d6694bd1-a7c3-435b-a56c-b01bd2b33c52'
                ),
            ]"
          ></v-textarea>
          <CKEditor.component
            v-model="editorData_en"
            :editor="ClassicEditor"
            :config="{
              ...ckeditor.editorConfig,
              placeholder: t(
                'lang-01a3f6ac-c0b2-47b1-917c-28afc79468bf'
              ),
            }"
          />
          <div
            style="width: 100%; height: 38px"
          ></div>
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
                !!v ||
                !!v.length ||
                t(
                  'lang-816864e0-a4b6-4ee4-9b7e-48e05a69db08'
                ),
            ]"
            multiple
          ></v-file-input>
        </div>
        <div class="flex-box-center">
          <div
            class="flex-box"
            style="gap: 20px"
          >
            <v-btn
              type="submit"
              color="#61a375"
              class="text-white"
              :loading="isLoading"
              >{{
                props.editNews
                  ? t(
                      "lang-d32bd46b-3317-4367-bb12-c53c36e494f5"
                    )
                  : t(
                      "lang-ce4caba1-2de0-4970-9590-52b9d90e64f1"
                    )
              }}</v-btn
            >
            <v-btn
              color="#F44336"
              class="text-white"
              @click="closeHandler"
              >{{
                t(
                  "lang-13ae4b92-8336-4cdd-adbb-ead122b87cb3"
                )
              }}</v-btn
            >
          </div>
        </div></v-form
      >
    </div></Dialog
  >
</template>
