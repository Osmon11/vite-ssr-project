<script setup>
  import { computed, ref, watch } from "vue";

  import Dialog from "@/shared/Dialog.vue";
  import appStore from "../store";
  import { useI18n } from "vue-i18n";

  const { setSlide, updateSlide } =
    appStore.useStore();
  const props = defineProps([
    "modelValue",
    "editSlide",
  ]);
  const emit = defineEmits(["update:modelValue"]);
  const { t } = useI18n();
  const form = ref();
  const valid = ref(true);
  const title_en = ref("");
  const subtitle_en = ref("");
  const title_ru = ref("");
  const subtitle_ru = ref("");
  const image = ref([]);
  const isLoading = ref(false);
  const slideToEdit = computed(
    () => props.editSlide
  );
  const fileInputLabel = ref(
    t("lang-06c97754-3b15-4867-866e-c0c8e09f401d")
  );

  watch(slideToEdit, (value) => {
    if (value) {
      title_en.value = value.title_en;
      subtitle_en.value = value.subtitle_en;
      title_ru.value = value.title_ru;
      subtitle_ru.value = value.subtitle_ru;
      image.value = [];
      fileInputLabel.value = value.imageName;
    } else {
      fileInputLabel.value = t(
        "lang-06c97754-3b15-4867-866e-c0c8e09f401d"
      );
    }
  });

  function callback(success) {
    isLoading.value = false;
    if (success) {
      closeHandler();
    }
  }
  function submitHandler() {
    if (valid.value) {
      isLoading.value = true;
      const data = new FormData();
      data.append("title_ru", title_ru.value);
      data.append(
        "subtitle_ru",
        subtitle_ru.value
      );
      data.append("title_en", title_en.value);
      data.append(
        "subtitle_en",
        subtitle_en.value
      );

      if (!props.editSlide) {
        data.append("image", image.value[0]);
        setSlide(data, callback);
      } else {
        if (image.value[0]) {
          data.append("image", image.value[0]);
        }
        data.append(
          "imageUrl",
          props.editSlide.imageUrl
        );
        updateSlide(
          { id: props.editSlide._id },
          data,
          callback
        );
      }
      image.value = [];
    }
  }
  const closeHandler = () => {
    title_en.value = "";
    subtitle_en.value = "";
    title_ru.value = "";
    subtitle_ru.value = "";
    image.value = [];
    form.value.resetValidation();
    emit("update:modelValue", false);
  };
</script>

<template>
  <Dialog
    :open="props.modelValue"
    :onClose="closeHandler"
  >
    <div class="flex-box flex-box-center">
      <v-form
        ref="form"
        v-model="valid"
        class="form-max-width"
        @submit.prevent="submitHandler"
      >
        <p
          class="title text-center mb-4"
          style="width: 100%"
        >
          {{
            props.editSlide
              ? t(
                  "lang-f2b180e5-5f7e-4dde-a1ad-30b169d200d1"
                )
              : t(
                  "lang-2729514f-a39b-4cf6-981d-956ca5e814eb"
                )
          }}
        </p>
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
        <v-text-field
          v-model="subtitle_ru"
          type="text"
          name="subtitle_ru"
          variant="outlined"
          :label="
            t(
              'lang-f120203b-7159-4126-8bab-3bfce50b5da0'
            )
          "
          color="#61a375"
          required
          :rules="[
            (v) =>
              !!v ||
              t(
                'lang-eacb23c4-373c-4ab2-84cc-46bbb75da4e0'
              ),
          ]"
        ></v-text-field>
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
        <v-text-field
          v-model="subtitle_en"
          type="text"
          name="subtitle_en"
          variant="outlined"
          :label="
            t(
              'lang-e6ce63e3-2456-401e-acaa-36266e22f5b6'
            )
          "
          color="#61a375"
          required
          :rules="[
            (v) =>
              !!v ||
              t(
                'lang-2db61cf7-4d32-4b69-a735-77a34df2bfe3'
              ),
          ]"
        ></v-text-field>
        <v-file-input
          name="image"
          accept="image/*"
          variant="outlined"
          :label="fileInputLabel"
          color="#61a375"
          @update:model-value="
            (value) => (image = value)
          "
          :required="!editSlide"
          :rules="[
            (v) =>
              !!v[0] ||
              Boolean(editSlide) ||
              t(
                'lang-816864e0-a4b6-4ee4-9b7e-48e05a69db08'
              ),
          ]"
          show-size
        ></v-file-input>
        <div class="flex-box-center">
          <div
            class="flex-box"
            style="gap: 20px"
          >
            <v-btn
              color="#61a375"
              class="text-white"
              type="submit"
              :loading="isLoading"
              >{{
                props.editSlide
                  ? t(
                      "lang-d32bd46b-3317-4367-bb12-c53c36e494f5"
                    )
                  : t(
                      "lang-4c464403-826b-43f2-8540-b6e753f2396c"
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
        </div>
      </v-form>
    </div></Dialog
  >
</template>
