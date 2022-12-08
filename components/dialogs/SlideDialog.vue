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
        @submit.prevent="onSubmit"
      >
        <p
          class="title text-center mb-4"
          style="width: 100%"
        >
          {{
            props.editSlide
              ? $t(
                  "lang-f2b180e5-5f7e-4dde-a1ad-30b169d200d1"
                )
              : $t(
                  "lang-2729514f-a39b-4cf6-981d-956ca5e814eb"
                )
          }}
        </p>
        <v-text-field
          :modelValue="form.title_ru"
          @update:modelValue="
            onUpdate('title_ru', $event)
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
        <v-text-field
          :modelValue="form.subtitle_ru"
          @update:modelValue="
            onUpdate('subtitle_ru', $event)
          "
          type="text"
          name="subtitle_ru"
          variant="outlined"
          :label="
            $t(
              'lang-f120203b-7159-4126-8bab-3bfce50b5da0'
            )
          "
          color="#61a375"
          required
          :rules="[
            (v) =>
              !!v ||
              $t(
                'lang-eacb23c4-373c-4ab2-84cc-46bbb75da4e0'
              ),
          ]"
        ></v-text-field>
        <v-text-field
          :modelValue="form.title_en"
          @update:modelValue="
            onUpdate('title_en', $event)
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
        <v-text-field
          :modelValue="form.subtitle_en"
          @update:modelValue="
            onUpdate('subtitle_en', $event)
          "
          type="text"
          name="subtitle_en"
          variant="outlined"
          :label="
            $t(
              'lang-e6ce63e3-2456-401e-acaa-36266e22f5b6'
            )
          "
          color="#61a375"
          required
          :rules="[
            (v) =>
              !!v ||
              $t(
                'lang-2db61cf7-4d32-4b69-a735-77a34df2bfe3'
              ),
          ]"
        ></v-text-field>
        <v-file-input
          :modelValue="form.image"
          @update:modleValue="
            onUpdate('image', $event)
          "
          name="image"
          accept="image/*"
          variant="outlined"
          :label="fileInputLabel"
          color="#61a375"
          :required="!editSlide"
          :rules="[
            (v) =>
              !!v[0] ||
              Boolean(editSlide) ||
              $t(
                'lang-816864e0-a4b6-4ee4-9b7e-48e05a69db08'
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
              :loading="loading"
              >{{
                props.editSlide
                  ? $t(
                      "lang-d32bd46b-3317-4367-bb12-c53c36e494f5"
                    )
                  : $t(
                      "lang-4c464403-826b-43f2-8540-b6e753f2396c"
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
        </div>
      </v-form>
    </div></Dialog
  >
</template>

<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { computed, ref } from "vue";

  import Dialog from "@/components/dialogs/Dialog.vue";

  import { useSlideStore } from "@/stores/slide";

  const props = defineProps([
    "modelValue",
    "editSlide",
  ]);
  const emit = defineEmits(["update:modelValue"]);

  const { t } = useI18n();

  const slideStore = useSlideStore();

  // --> FORM
  const form = computed(() => slideStore.getForm);
  const valid = ref(true);
  const loading = ref(false);
  const editMod = computed(
    () => slideStore.isEditMod
  );
  const fileInputLabel = computed(() =>
    editMod.value && !form.value.image[0]
      ? form.value.imageName
      : t(
          "lang-06c97754-3b15-4867-866e-c0c8e09f401d"
        )
  );
  // action handlers
  function onUpdate(key: string, value: any) {
    slideStore.updateForm(key, value);
  }
  function onSubmit() {
    if (valid.value) {
      loading.value = true;
      slideStore
        .save()
        .then(closeHandler)
        .catch(() => (loading.value = false));
    }
  }
  const closeHandler = () => {
    loading.value = true;
    slideStore.resetForm();
    emit("update:modelValue", false);
  };
</script>
