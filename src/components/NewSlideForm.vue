<script setup>
  import { ref } from "vue";
  import axios from "axios";

  const valid = ref(true);
  const form = ref(null);

  function submitHandler(event) {
    if (valid.value) {
      const { title, subtitle, image } = event.target.elements;
      const data = new FormData();
      data.append("title", title.value);
      data.append("subtitle", subtitle.value);
      data.append("image", image.files[0]);
      axios
        .post("http://localhost:3001/slides", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res, res.data);
        })
        .catch((err) => console.log(err));
    }
  }
</script>

<template>
  <div class="flex-box flex-box-center">
    <v-form
      class="form-max-width"
      :ref="form"
      v-model="valid"
      @submit.prevent="submitHandler"
    >
      <p class="title text-center mb-4" style="width: 100%">Новый слайд</p>
      <v-text-field
        type="text"
        name="title"
        variant="outlined"
        label="Заголовок"
        color="#61a375"
        required
        :rules="[(v) => !!v || 'Введите заголовок']"
      ></v-text-field>
      <v-text-field
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
        label="Изображение фона"
        color="#61a375"
        required
        :rules="[(v) => !!v[0] || 'Загрузите фоновое изображение']"
        show-size
      ></v-file-input>
      <div class="flex-box-center">
        <v-btn color="#61a375" class="text-white" type="submit"
          >Добавить слайд</v-btn
        >
      </div>
    </v-form>
  </div>
</template>
