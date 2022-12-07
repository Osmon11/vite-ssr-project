<template>
  <Dialog
    :open="props.modelValue"
    :onClose="closeHandler"
  >
    <p
      class="title text-center"
      style="width: 100%; margin-bottom: 28px"
    >
      {{
        !editMod
          ? $t(
              "lang-c4a55d33-b1e5-49c0-b560-34cb25845d12"
            )
          : $t(
              "lang-248f51a8-c4dd-4618-ada6-109e15692077"
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
            :modelValue="form.name_ru"
            @update:modelValue="
              onUpdate('name_ru', $event)
            "
            type="text"
            name="title_ru"
            variant="outlined"
            :label="
              $t(
                'lang-37df7a50-035e-4529-9c53-39f48cc95e77'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                $t(
                  'lang-8c98444e-2285-4236-816d-c653a0fa12ce'
                ),
            ]"
          ></v-text-field>
          <CKEditor.component
            :modelValue="form.content_ru"
            @update:modelValue="
              onUpdate('content_ru', $event)
            "
            :editor="ClassicEditor"
            :config="{
              ...ckeditor.editorConfig,
              placeholder: $t(
                'lang-9477bb6c-791d-48cf-9416-441ee6b65e1a'
              ),
            }"
          />
          <div
            style="width: 100%; height: 38px"
          ></div>
          <v-text-field
            :modelValue="form.name_en"
            @update:modelValue="
              onUpdate('name_en', $event)
            "
            type="text"
            name="title_en"
            variant="outlined"
            :label="
              $t(
                'lang-082f01c6-dc8d-4f1a-8bea-7739259d8c8d'
              )
            "
            color="#61a375"
            required
            :rules="[
              (v) =>
                !!v ||
                $t(
                  'lang-5317fbd0-71ca-406a-bc7f-7ec8d24c9524'
                ),
            ]"
          ></v-text-field>
          <CKEditor.component
            :modelValue="form.content_en"
            @update:modelValue="
              onUpdate('content_en', $event)
            "
            :editor="ClassicEditor"
            :config="{
              ...ckeditor.editorConfig,
              placeholder: $t(
                'lang-3803588d-bbe2-46de-b397-50a9e9f92c9d'
              ),
            }"
          />
          <div
            style="width: 100%; height: 38px"
          ></div>
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
                      "lang-ac5e3fd9-f935-4a12-a624-3ad6e8028b44"
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
  import { computed, ref } from "vue";
  // @ts-ignore
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic/";
  // @ts-ignore
  import CKEditor from "@ckeditor/ckeditor5-vue";

  import Dialog from "@/components/dialogs/Dialog.vue";
  import ckeditor from "@/plugins/ckeditor.js";

  import { useServiceStore } from "@/stores/service";
  import { useNotification } from "@/utils/useNotification";

  const props = defineProps(["modelValue"]);
  const emit = defineEmits(["update:modelValue"]);

  const { setAlert } = useNotification();

  const serviceStore = useServiceStore();

  // FORM
  const form = computed(
    () => serviceStore.getForm
  );
  const valid = ref(false);
  const loading = ref(false);
  const editMod = computed(
    () => serviceStore.isEditMod
  );
  // action handlers
  function onUpdate(key: string, value: any) {
    serviceStore.updateForm(key, value);
  }
  function onSubmit() {
    if (!form.value.content_ru) {
      return setAlert({
        type: "error",
        message:
          "lang-5f8ac396-82b4-4598-9226-f09d13bb2e9e",
      });
    }
    if (!form.value.content_en) {
      return setAlert({
        type: "error",
        message:
          "lang-d001e0bd-1ded-4909-b9db-1c01862a45cd",
      });
    }

    if (valid.value) {
      loading.value = true;
      serviceStore
        .save()
        .then(closeHandler)
        .catch(() => (loading.value = false));
    }
  }
  function closeHandler() {
    loading.value = false;
    serviceStore.resetForm();
    emit("update:modelValue", false);
  }
</script>
