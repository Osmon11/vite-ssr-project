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
            !editMod
              ? $t(
                  "lang-e6e7353b-1dfd-42fd-9ee8-ee112edee550"
                )
              : $t(
                  "lang-8bb75dc4-3000-407f-b131-d662b43deb0b"
                )
          }}
        </p>
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
              'lang-379107af-bf56-44da-808b-dad8d112f3d7'
            )
          "
          color="#61a375"
          required
          :rules="[(v) => !!v || $t('errors.')]"
        ></v-text-field>

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
              'lang-0491248f-ddc0-4fa6-ab05-bab1658d4149'
            )
          "
          color="#61a375"
          required
          :rules="[(v) => !!v || $t('errors.')]"
        ></v-text-field>

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
              :loading="loading"
              >{{
                editMod
                  ? $t(
                      "lang-d32bd46b-3317-4367-bb12-c53c36e494f5"
                    )
                  : $t(
                      "lang-4b9703fc-3398-45f9-bd06-14ba7c65b28b"
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
  import { computed, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import Dialog from "@/components/dialogs/Dialog.vue";

  import { usePartnerStore } from "@/stores/partner";

  const props = defineProps(["modelValue"]);
  const emit = defineEmits(["update:modelValue"]);

  const { t } = useI18n();
  const partnerStore = usePartnerStore();

  // FORM
  const form = computed(
    () => partnerStore.getForm
  );
  const valid = ref(true);
  const loading = ref(true);
  const editMod = computed(
    () => partnerStore.isEditMod
  );
  const fileInputLabel = computed(() =>
    editMod.value && form.value.image === null
      ? form.value.logo
      : t(
          "lang-75f7377c-2c49-4516-b2ea-551f90458b15"
        )
  );
  // action handlers
  function onUpdate(key: string, value: any) {
    partnerStore.updateForm(key, value);
  }
  function onSubmit() {
    if (valid.value) {
      loading.value = true;
      partnerStore.save().then(closeHandler);
    }
  }
  function closeHandler() {
    loading.value = false;
    partnerStore.resetForm();
    emit("update:modelValue", false);
  }
</script>
