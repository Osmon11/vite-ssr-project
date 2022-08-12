<script setup>
  import { computed, ref, watch } from "vue";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";
  import { useI18n } from "vue-i18n";

  const store = useStore();
  const props = defineProps(["open", "onClose", "editPartner"]);
  const { t } = useI18n();
  const valid = ref(true);
  const name_en = ref("");
  const name_ru = ref("");
  const image = ref([]);
  const isLoading = ref(false);

  watch(
    () => props.editPartner,
    (value) => {
      if (value) {
        name_en.value = value.name_en;
        name_ru.value = value.name_ru;
        image.value = [];
      }
    }
  );

  const fileInputLabel = computed(() =>
    props.editPartner && !image.value?.length
      ? props.editPartner["logo"]
      : t("general.Логотип_партнера")
  );

  function callback(success) {
    isLoading.value = false;
    if (success) {
      name_en.value = "";
      name_ru.value = "";
      image.value = [];
      props.onClose(false);
    }
  }
  function submitHandler() {
    if (valid.value) {
      isLoading.value = true;
      const data = new FormData();
      data.append("name_ru", name_ru.value);
      data.append("name_en", name_en.value);

      if (!props.editPartner) {
        data.append("image", image.value[0]);
        store.setPartner(data, callback);
      } else {
        if (image.value[0]) {
          data.append("image", image.value[0]);
        }
        data.append("logo", props.editPartner.logo);
        store.updatePartner({ id: props.editPartner._id }, data, callback);
      }
      image.value = null;
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
        <p class="title text-center mb-4" style="width: 100%">
          {{
            props.editPartner
              ? t("general.Редактировать_партнера")
              : t("general.Новый_партнер")
          }}
        </p>
        <v-text-field
          v-model="name_ru"
          type="text"
          name="title_ru"
          variant="outlined"
          :label="t('general.Наименование_на_русском')"
          color="#61a375"
          required
          :rules="[(v) => !!v || t('errors.Введите_Наименование_на_русском')]"
        ></v-text-field>

        <v-text-field
          v-model="name_en"
          type="text"
          name="title_en"
          variant="outlined"
          :label="t('general.Наименование_на_английском')"
          color="#61a375"
          required
          :rules="[
            (v) => !!v || t('errors.Введите_Наименование_на_английском'),
          ]"
        ></v-text-field>

        <v-file-input
          name="image"
          accept="image/*"
          variant="outlined"
          :label="fileInputLabel"
          color="#61a375"
          @update:model-value="(value) => (image = value)"
          :required="!editPartner"
          :rules="[
            (v) =>
              !!v[0] ||
              Boolean(editPartner) ||
              t('errors.Загрузите_логотип_партнера'),
          ]"
          show-size
        ></v-file-input>
        <div class="flex-box-center">
          <v-btn
            color="#61a375"
            class="text-white"
            type="submit"
            :loading="isLoading"
            >{{
              props.editPartner
                ? t("general.Обновить")
                : t("general.Добавить_партнера")
            }}</v-btn
          >
        </div>
      </v-form>
    </div></Dialog
  >
</template>
