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
          <div class="input" style="width: calc(50% - 10px)">
            <input type="text" placeholder="Имя" name="userName" />
          </div>
          <div class="input" style="width: calc(50% - 10px)">
            <input type="email" placeholder="Email" name="email" />
          </div>
        </div>
        <div class="input">
          <textarea placeholder="Сообщение" name="message" />
        </div>
        <div class="flex-box-center" style="margin-top: 40px">
          <button class="theme-btn" type="submit">Отправить сообщение</button>
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
