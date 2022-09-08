<script setup>
  import { computed, ref, watch } from "vue";
  import { useI18n } from "vue-i18n";

  import Dialog from "@/shared/Dialog.vue";
  import appStore from "../store";

  const store = appStore.useStore();
  const props = defineProps(["modelValue", "editPartner"]);
  const emit = defineEmits(["update:modelValue"]);
  const { t } = useI18n();
  const form = ref();
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
    props.editPartner && image.value.length === 0
      ? props.editPartner["logo"]
      : t("general.Логотип_партнера")
  );

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
      data.append("name_ru", name_ru.value);
      data.append("name_en", name_en.value);
      if (!props.editPartner) {
        data.append("image", image.value[0]);
        store.setPartner(data, callback);
      } else {
        if (image.value[0]) data.append("image", image.value[0]);

        data.append("logo", props.editPartner.logo);
        store.updatePartner({ id: props.editPartner._id }, data, callback);
      }
    }
  }
  function closeHandler() {
    name_en.value = "";
    name_ru.value = "";
    image.value = [];
    form.value.resetValidation();
    emit("update:modelValue", false);
  }
</script>

<template>
  <Dialog :open="props.modelValue" :onClose="closeHandler">
    <div class="flex-box flex-box-center">
      <v-form
        ref="form"
        v-model="valid"
        class="form-max-width"
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
          v-model="image"
          name="image"
          accept="image/*"
          variant="outlined"
          :label="fileInputLabel"
          color="#61a375"
          :required="!editPartner"
          :rules="[
            (v) => !!v || !!v.length || t('errors.Загрузите_логотип_партнера'),
          ]"
          show-size
        ></v-file-input>
        <div class="flex-box-center">
          <div class="flex-box" style="gap: 20px">
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
            <v-btn color="#F44336" class="text-white" @click="closeHandler">{{
              t("general.отмена")
            }}</v-btn>
          </div>
        </div>
      </v-form>
    </div></Dialog
  >
</template>
