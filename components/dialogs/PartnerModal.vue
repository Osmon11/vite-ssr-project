<script setup>
  import { computed, ref, watch } from "vue";
  import { useI18n } from "vue-i18n";

  import Dialog from "@/shared/Dialog.vue";
  import appStore from "../store";

  const store = appStore.useStore();
  const props = defineProps([
    "modelValue",
    "editPartner",
  ]);
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
      : t(
          "lang-75f7377c-2c49-4516-b2ea-551f90458b15"
        )
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
        if (image.value[0])
          data.append("image", image.value[0]);

        data.append(
          "logo",
          props.editPartner.logo
        );
        store.updatePartner(
          { id: props.editPartner._id },
          data,
          callback
        );
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
            !props.editPartner
              ? t(
                  "lang-e6e7353b-1dfd-42fd-9ee8-ee112edee550"
                )
              : t(
                  "lang-8bb75dc4-3000-407f-b131-d662b43deb0b"
                )
          }}
        </p>
        <v-text-field
          v-model="name_ru"
          type="text"
          name="title_ru"
          variant="outlined"
          :label="
            t(
              'lang-379107af-bf56-44da-808b-dad8d112f3d7'
            )
          "
          color="#61a375"
          required
          :rules="[(v) => !!v || t('errors.')]"
        ></v-text-field>

        <v-text-field
          v-model="name_en"
          type="text"
          name="title_en"
          variant="outlined"
          :label="
            t(
              'lang-0491248f-ddc0-4fa6-ab05-bab1658d4149'
            )
          "
          color="#61a375"
          required
          :rules="[(v) => !!v || t('errors.')]"
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
            (v) =>
              !!v ||
              !!v.length ||
              t(
                'lang-e84a07db-3933-412b-b386-3cab06799321'
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
                props.editPartner
                  ? t(
                      "lang-d32bd46b-3317-4367-bb12-c53c36e494f5"
                    )
                  : t(
                      "lang-4b9703fc-3398-45f9-bd06-14ba7c65b28b"
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
