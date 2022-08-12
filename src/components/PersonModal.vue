<script setup>
  import { computed, ref, watch } from "vue";
  import cookie_js from "cookie_js";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";
  import { useI18n } from "vue-i18n";

  const store = useStore();
  const props = defineProps(["open", "onClose", "editPerson"]);
  const { t } = useI18n();
  const valid = ref(false);
  const fullname_en = ref("");
  const biography_en = ref("");
  const fullname_ru = ref("");
  const biography_ru = ref("");
  const image = ref([]);
  const isLoading = ref(false);
  const fileInputLabel = computed(() =>
    props.editPerson && !image.value?.length
      ? props.editPerson["avatar"]
      : t("general.Фотография")
  );

  watch(
    () => props.editPerson,
    (value) => {
      if (value) {
        fullname_ru.value = value.fullname_ru;
        biography_ru.value = value.biography_ru;
        fullname_en.value = value.fullname_en;
        biography_en.value = value.biography_en;
        image.value = [];
      }
    }
  );
  function resetForm() {
    fullname_ru.value = "";
    biography_ru.value = "";
    fullname_en.value = "";
    biography_en.value = "";
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
    if (valid.value) {
      isLoading.value = true;
      let data = new FormData();
      data.append("fullname_en", fullname_en.value);
      data.append("biography_en", biography_en.value);
      data.append("fullname_ru", fullname_ru.value);
      data.append("biography_ru", biography_ru.value);
      if (!props.editPerson) {
        data.append("image", image.value[0]);
        store.setEmployee(data, callback);
      } else {
        if (image.value[0]) {
          data.append("image", image.value[0]);
        }
        data.append("avatar", props.editPerson.avatar);
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
      {{
        props.editPerson
          ? t("general.Редактировать_сотрудника")
          : t("general.Новый_сотрудник")
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
            v-model="fullname_ru"
            type="text"
            name="fullname_ru"
            variant="outlined"
            :label="t('general.ФИО_на_русском')"
            color="#61a375"
            required
            :rules="[(v) => !!v || t('errors.Введите_ФИО_на_русском')]"
          ></v-text-field>
          <v-textarea
            v-model="biography_ru"
            type="text"
            name="biography_ru"
            variant="outlined"
            :label="t('general.Биография_на_русском')"
            color="#61a375"
            required
            :rules="[(v) => !!v || t('errors.Введите_биографию_на_русском')]"
          ></v-textarea>
          <v-text-field
            v-model="fullname_en"
            type="text"
            name="fullname_en"
            variant="outlined"
            :label="t('general.ФИО_на_английском')"
            color="#61a375"
            required
            :rules="[(v) => !!v || t('errors.Введите_ФИО_на_английском')]"
          ></v-text-field>
          <v-textarea
            v-model="biography_en"
            type="text"
            name="biography_en"
            variant="outlined"
            :label="t('general.Биография_на_английском')"
            color="#61a375"
            required
            :rules="[(v) => !!v || t('errors.Введите_биографию_на_английском')]"
          ></v-textarea>
          <v-file-input
            name="image"
            accept="image/*"
            variant="outlined"
            :label="fileInputLabel"
            color="#61a375"
            :model-value="image"
            @update:model-value="(value) => (image = value)"
            :required="!editPerson"
            :rules="[
              (v) =>
                !!v[0] || Boolean(editPerson) || t('errors.Загрузите_фото'),
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
            >{{ props.editPerson ? "Обновить" : "Добавить сотрудника" }}</v-btn
          >
        </div></v-form
      >
    </div></Dialog
  >
</template>
