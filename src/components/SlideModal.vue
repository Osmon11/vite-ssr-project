<script setup>
  import { computed, ref } from "vue";
  import axios from "axios";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";

  const { setSlide } = useStore();
  const props = defineProps(["open", "onClose", "editSlide"]);
  const valid = ref(true);
  const title = ref(props.editSlide ? props.editSlide["title"] : "");
  const subtitle = ref(props.editSlide ? props.editSlide["subtitle"] : "");
  const image = ref(null);
  const fileInputLabel = computed(() =>
    props.editSlide && !image.value
      ? props.editSlide["imageName"]
      : "Изображение фона"
  );

  function submitHandler() {
    if (valid.value) {
      const data = new FormData();
      data.append("title", title.value);
      data.append("subtitle", subtitle.value);
      data.append("image", image.value[0]);
      setSlide(data);
      onClose(true);
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
        <p class="title text-center mb-4" style="width: 100%">Новый слайд</p>
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
            (v) => !!v[0] || editSlide || 'Загрузите фоновое изображение',
          ]"
          show-size
        ></v-file-input>
        <div class="flex-box-center">
          <v-btn color="#61a375" class="text-white" type="submit"
            >Добавить слайд</v-btn
          >
        </div>
      </v-form>
    </div></Dialog
  >
</template>
