<template>
  <Dialog
    :open="props.modelValue"
    :onClose="closeHandler"
  >
    <p
      class="title text-center"
      style="width: 100%"
    >
      {{
        !props.editPerson
          ? $t(
              "lang-887dd0c0-ac04-48ce-aa48-1bd1190577d9"
            )
          : $t(
              "lang-9dba1315-db40-4594-b704-33b0b5318463"
            )
      }}
    </p>
    <div class="flex-box-center">
      <v-form
        ref="form"
        v-model="valid"
        class="form-max-width"
        @submit.prevent="submitHandler"
      >
        <div class="editor-wrapper">
          <v-text-field
            v-model="fullname_ru"
            type="text"
            name="fullname_ru"
            variant="outlined"
            :label="
              $t(
                'lang-ecf04419-ca3b-4de1-823d-7036c481a58e'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                $t(
                  'lang-d3c18477-bd37-410a-bf6c-6f6dc46722ee'
                ),
            ]"
          ></v-text-field>
          <v-textarea
            v-model="biography_ru"
            type="text"
            name="biography_ru"
            variant="outlined"
            :label="
              $t(
                'lang-849c6509-4145-43d9-a3da-94cf82104d49'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                $t(
                  'lang-528e9126-00b4-4da0-9429-f248314ebc2a'
                ),
            ]"
          ></v-textarea>
          <v-text-field
            v-model="fullname_en"
            type="text"
            name="fullname_en"
            variant="outlined"
            :label="
              $t(
                'lang-787c63fa-0665-401f-b201-f73bf6e17c08'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                $t(
                  'lang-5402701f-9485-40ca-a420-6c64e4c0402c'
                ),
            ]"
          ></v-text-field>
          <v-textarea
            v-model="biography_en"
            type="text"
            name="biography_en"
            variant="outlined"
            :label="
              $t(
                'lang-94f4e6be-bf4c-4d12-9622-f5a8509d3543'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                $t(
                  'lang-0375d510-b71b-4e6d-b1a1-a734f2603a85'
                ),
            ]"
          ></v-textarea>
          <v-file-input
            v-model="image"
            name="image"
            accept="image/*"
            variant="outlined"
            :label="fileInputLabel"
            color="#61a375"
            :required="!editPerson"
            :rules="[
              (v) =>
                !!v ||
                !!v.length ||
                $t(
                  'lang-521d32a6-505e-4c62-965f-f9bbb32b3bc0'
                ),
            ]"
            clearable
            show-size
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
                props.editPerson
                  ? $t(
                      "lang-d32bd46b-3317-4367-bb12-c53c36e494f5"
                    )
                  : $t(
                      "lang-2b0b4316-3cd1-4db5-84cd-3e3da8788fdc"
                    )
              }}</v-btn
            >
            <v-btn
              color="#F44336"
              class="text-white"
              @click="closeHandler"
              >{{
                $t(
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

<script lang="ts" setup>
  import { computed, ref, watch } from "vue";

  import Dialog from "@/shared/Dialog.vue";
  import { useI18n } from "vue-i18n";

  const props = defineProps([
    "modelValue",
    "editPerson",
  ]);
  const emit = defineEmits(["update:modelValue"]);
  const { t } = useI18n();
  const form = ref();
  const valid = ref(false);
  const fullname_en = ref("");
  const biography_en = ref("");
  const fullname_ru = ref("");
  const biography_ru = ref("");
  const image = ref([]);
  const isLoading = ref(false);
  const fileInputLabel = computed(() =>
    props.editPerson && image.value.length === 0
      ? props.editPerson["avatar"]
      : t(
          "lang-800ebbd8-b6eb-4da0-9bdf-24f7dab85c77"
        )
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
  function submitHandler() {
    if (valid.value) {
      isLoading.value = true;
      let data = new FormData();
      data.append(
        "fullname_en",
        fullname_en.value
      );
      data.append(
        "biography_en",
        biography_en.value
      );
      data.append(
        "fullname_ru",
        fullname_ru.value
      );
      data.append(
        "biography_ru",
        biography_ru.value
      );
      if (!props.editPerson) {
        data.append("image", image.value[0]);
      } else {
        if (image.value[0]) {
          data.append("image", image.value[0]);
        }
        data.append(
          "avatar",
          props.editPerson.avatar
        );
      }
    }
  }
  function closeHandler() {
    fullname_ru.value = "";
    biography_ru.value = "";
    fullname_en.value = "";
    biography_en.value = "";
    image.value = [];
    form.value.resetValidation();
    emit("update:modelValue", false);
  }
</script>
