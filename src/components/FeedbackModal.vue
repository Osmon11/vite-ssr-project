<script setup>
  import { VueRecaptcha } from "vue-recaptcha";

  import Dialog from "@/shared/Dialog.vue";

  const props = defineProps(["open", "onClose"]);

  function handleRequestSubmit(event) {
    const { userName, email, message } = event.target.elements;
    props.onClose(false);
  }
</script>

<template>
  <Dialog :open="open" :onClose="onClose">
    <form @submit.prevent="(event) => handleRequestSubmit(event)">
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
          style="width: calc(50% - 10px)"
        ></v-text-field>
        <v-text-field
          type="text"
          name="email"
          variant="outlined"
          label="Email"
          color="#61a375"
          style="width: calc(50% - 10px)"
        ></v-text-field>
      </div>
      <v-textarea
        type="text"
        name="message"
        variant="outlined"
        label="Сообщение"
        color="#61a375"
      ></v-textarea>
      <div class="flex-box-center">
        <v-btn color="#61a375" class="text-white" type="submit"
          >Отправить сообщение</v-btn
        >
      </div>
      <!-- <VueRecaptcha /> -->
    </form>
  </Dialog>
</template>
