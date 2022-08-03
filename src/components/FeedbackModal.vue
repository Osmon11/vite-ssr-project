<script setup>
  import { ref } from "vue";
  import { VueRecaptcha } from "vue-recaptcha";

  import Dialog from "@/shared/Dialog.vue";
  import { useStore } from "../store";

  const props = defineProps(["open", "onClose"]);
  const store = useStore();

  const valid = ref(false);
  const userName = ref("");
  const email = ref("");
  const message = ref("");
  const isLoading = ref(false);

  function handleRequestSubmit() {
    if (valid) {
      isLoading.value = true;
      store.sendFeedback(
        {
          message: `
        Имя: ${userName}\n
        Почта: ${email}\n
        Сообщение: ${message}
      `,
        },
        (success) => {
          isLoading.value = false;
          if (success) {
            userName.value = "";
            email.value = "";
            message.value = "";
          }
        }
      );
      props.onClose(false);
    }
  }
</script>

<template>
  <Dialog :open="open" :onClose="onClose">
    <v-form
      v-model="valid"
      @submit.prevent="(event) => handleRequestSubmit(event)"
    >
      <div class="flex-box-center" style="margin-bottom: 40px">
        <h3 class="title divider">Форма обратной связи</h3>
      </div>
      <div class="flex-box" style="gap: 20px">
        <v-text-field
          type="text"
          name="userName"
          variant="outlined"
          label="Имя"
          color="#61a375"
          :rules="[(v) => !!v || 'Введите имя']"
          style="width: calc(50% - 10px)"
        ></v-text-field>
        <v-text-field
          type="email"
          name="email"
          variant="outlined"
          label="Email"
          color="#61a375"
          :rules="[(v) => !!v || 'Введите email']"
          style="width: calc(50% - 10px)"
        ></v-text-field>
      </div>
      <v-textarea
        type="text"
        name="message"
        variant="outlined"
        label="Сообщение"
        color="#61a375"
        :rules="[(v) => !!v || 'Введите сообщение']"
      ></v-textarea>
      <div class="flex-box-center">
        <v-btn
          color="#61a375"
          class="text-white"
          type="submit"
          :loading="isLoading"
          >Отправить сообщение</v-btn
        >
      </div>
      <!-- <VueRecaptcha /> -->
    </v-form>
  </Dialog>
</template>
