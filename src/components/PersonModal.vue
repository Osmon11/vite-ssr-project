<script setup>
  import { computed, ref, watch } from "vue";
  import cookie_js from "cookie_js";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";

  const store = useStore();
  const props = defineProps(["open", "onClose", "editPerson"]);
  const valid = ref(false);
  const title = ref("");
  const biography = ref("");
  const image = ref([]);
  const isLoading = ref(false);
  const fileInputLabel = computed(() =>
    props.editPerson && !image.value[0]
      ? props.editPerson["imageName"]
      : "Фотография"
  );

  watch(
    () => props.editPerson,
    (value) => {
      if (value) {
        title.value = value.title;
        biography.value = value.biography;
        image.value = [];
      }
    }
  );
  function resetForm() {
    title.value = "";
    biography.value = "";
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
    if (!editorData.value)
      store.setAlert({
        severity: "error",
        message: "Вы забыли написать биографию",
      });

    if (valid.value) {
      isLoading.value = true;
      let data = new FormData();
      data.append("title", title.value);
      data.append("biography", biography.value);
      if (!props.editPerson) {
        data.append("image", image.value[0]);
        store.setEmployee(data, callback);
      } else {
        if (image.value[0]) {
          data.append("image", image.value[0]);
        }
        data.append("imageUrl", props.editPerson.imageUrl);
        store.updateEmployee({ id: props.editPerson._id }, data, callback);
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
      {{ props.editPerson ? "Редактировать сотрудника" : "Новый сотрудник" }}
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
            label="ФИО"
            color="#61a375"
            required
            :rules="[(v) => !!v || 'Введите ФИО']"
          ></v-text-field>
          <v-file-input
            name="image"
            accept="image/*"
            variant="outlined"
            :label="fileInputLabel"
            color="#61a375"
            :model-value="image"
            @update:model-value="(value) => (image = value)"
            :required="!editPerson"
            :rules="[(v) => !!v[0] || Boolean(editPerson) || 'Загрузите фото']"
            clearable
            show-size
          ></v-file-input>
          <v-textarea
            v-model="biography"
            type="text"
            name="biography"
            variant="outlined"
            label="Биография"
            color="#61a375"
            required
            :rules="[(v) => !!v || 'Введите биографию']"
          ></v-textarea>
        </div>
        <div class="flex-box-center">
          <v-btn
            type="submit"
            color="#61a375"
            class="text-white"
            :loading="isLoading"
            >{{ props.editPerson ? "Обновить" : "Добавить сотрудника" }}</v-btn
          >
        </div></v-form
      >
    </div></Dialog
  >
</template>
