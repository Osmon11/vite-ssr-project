<script setup>
  import { VueRecaptcha } from "vue-recaptcha";

  const props = defineProps(["open", "onClose"]);

  function handleRequestSubmit(event) {
    const { userName, email, message } = event.target.elements;
    props.onClose(false);
  }
  function closeModalHandler(event) {
    if (event.target.hasAttribute("data-container")) {
      props.onClose(false);
    }
  }
</script>

<template>
  <div
    class="modal-container flex-box-center"
    v-show="open"
    @click.stop="closeModalHandler"
    data-container="true"
  >
    <main class="paper">
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
    </main>
  </div>
</template>

<style scoped>
  .modal-container {
    width: 100%;
    height: 100%;
    min-width: 100vw;
    min-height: 100vh;
    position: fixed;
    inset: 0;
    z-index: 1000;
    background-color: hsla(0, 0%, 0%, 0.33);
  }
  .modal-container .paper {
    padding: 32px;
    border-radius: 8px;
    background-color: #ffffff;
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInAndScale;
    animation-name: fadeInAndScale;
  }
</style>
