<script setup>
  import { ref } from "vue";
  import { VueRecaptcha } from "vue-recaptcha";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";
  import { useI18n } from "vue-i18n";

  const props = defineProps(["modelValue"]);
  const emit = defineEmits(["update:modelValue"]);
  const store = useStore();
  const { t } = useI18n();
  const form = ref();
  const valid = ref(false);
  const userName = ref("");
  const email = ref("");
  const message = ref("");
  const isLoading = ref(false);

  function handleRequestSubmit() {
    if (valid.value) {
      isLoading.value = true;
      store.sendFeedback(
        {
          message: `
        Имя: ${userName.value}\n
        Почта: ${email.value}\n
        Сообщение: ${message.value}
      `,
        },
        (success) => {
          isLoading.value = false;
          if (success) {
            closeHandler();
          }
        }
      );
    }
  }
  function closeHandler() {
    form.value.reset();
    emit("update:modelValue", false);
  }
</script>

<template>
  <Dialog :open="props.modelValue" :onClose="closeHandler">
    <v-form ref="form" v-model="valid" @submit.prevent="handleRequestSubmit">
      <div class="flex-box-center" style="margin-bottom: 40px">
        <h3 class="title divider">
          {{ t("general['Форма обратной связи']") }}
        </h3>
      </div>
      <div class="flex-box" style="gap: 20px">
        <v-text-field
          v-model="userName"
          type="text"
          name="userName"
          variant="outlined"
          :label="t('general.Имя')"
          color="#61a375"
          :rules="[(v) => !!v || t('errors.Введите_имя')]"
          style="width: calc(50% - 10px)"
        ></v-text-field>
        <v-text-field
          v-model="email"
          type="email"
          name="email"
          variant="outlined"
          :label="t('general.Email')"
          color="#61a375"
          :rules="[(v) => !!v || t('errors.Введите_email')]"
          style="width: calc(50% - 10px)"
        ></v-text-field>
      </div>
      <v-textarea
        v-model="message"
        type="text"
        name="message"
        variant="outlined"
        :label="t('general.Сообщение')"
        color="#61a375"
        :rules="[(v) => !!v || t('errors.Введите_сообщение')]"
      ></v-textarea>
      <div class="flex-box-center">
        <div class="flex-box" style="gap: 20px">
          <v-btn
            color="#61a375"
            class="text-white"
            type="submit"
            :loading="isLoading"
            >{{ t("general.отправить_сообщение") }}</v-btn
          >
          <v-btn color="#F44336" class="text-white" @click="closeHandler">{{
            t("general.отмена")
          }}</v-btn>
        </div>
      </div>
      <!-- <VueRecaptcha /> -->
    </v-form>
  </Dialog>
</template>
