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
        !editMod
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
        @submit.prevent="onSubmit"
      >
        <div class="editor-wrapper">
          <v-text-field
            :modelValue="form.fullname_ru"
            @update:modelValue="
              onUpdate('fullname_ru', $event)
            "
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
            :modelValue="form.biography_ru"
            @update:modelValue="
              onUpdate('biography_ru', $event)
            "
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
            :modelValue="form.fullname_en"
            @update:modelValue="
              onUpdate('fullname_en', $event)
            "
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
            :modelValue="form.biography_en"
            @update:modelValue="
              onUpdate('biography_en', $event)
            "
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
            :modelValue="form.image"
            @update:modelValue="
              onUpdate('image', $event)
            "
            name="image"
            accept="image/*"
            variant="outlined"
            :label="fileInputLabel"
            color="#61a375"
            :required="!editMod"
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
              :loading="loading"
              >{{
                editMod
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
  import { useI18n } from "vue-i18n";
  import { computed, ref } from "vue";

  import Dialog from "@/components/dialogs/Dialog.vue";

  import { useEmployeeStore } from "@/stores/employee";

  const props = defineProps(["modelValue"]);
  const emit = defineEmits(["update:modelValue"]);

  const { t } = useI18n();
  const employeeStore = useEmployeeStore();

  // FORM
  const form = computed(
    () => employeeStore.getForm
  );
  const valid = ref(false);
  const loading = ref(false);
  const editMod = computed(
    () => employeeStore.isEditMod
  );
  const fileInputLabel = computed(() =>
    editMod.value && !form.value.image[0]
      ? form.value.avatar
      : t(
          "lang-800ebbd8-b6eb-4da0-9bdf-24f7dab85c77"
        )
  );
  // action handlers
  function onUpdate(key: string, value: any) {
    employeeStore.updateForm(key, value);
  }
  function onSubmit() {
    if (valid.value) {
      loading.value = true;
      employeeStore
        .save()
        .then(closeHandler)
        .catch(() => (loading.value = false));
    }
  }

  function closeHandler() {
    loading.value = false;
    employeeStore.resetForm();
    emit("update:modelValue", false);
  }
</script>
