<script setup>
  import { useRouter } from "vue-router";

  const navigate = useRouter();

  function handleLoginSubmit(event) {
    const { login, password, remember } = event.target.elements;
    navigate.push("/admin");
  }
</script>

<template>
  <div class="flex_box_center" style="width: 100%; min-height: 100vh">
    <main class="flex_box_center">
      <form @submit.prevent="(event) => handleLoginSubmit(event)">
        <div class="flex_box input">
          <img src="src/assets/iconmonstr-user-5.svg" /><input
            type="text"
            name="login"
          />
        </div>
        <div class="flex_box input">
          <img src="src/assets/iconmonstr-lock-3.svg" /><input
            type="password"
            name="password"
          />
        </div>
        <div class="flex_box_between">
          <div class="flex_box" style="gap: 10px">
            <input type="checkbox" name="remember" />
            <p class="body1">Запомнить ?</p>
          </div>
        </div>
        <button
          class="theme_btn"
          style="width: 200px; margin-top: 16px"
          type="submit"
        >
          Войти
        </button>
      </form>
    </main>
  </div>
</template>

<style scoped>
  form {
    width: 400px;
  }
  .input {
    gap: 15px;
    padding: 16px;
    border-radius: 6px;
    border: 1px solid #c8c9c6;
    background-color: #f1f0f5;
    margin-bottom: 16px;
  }
  .input img {
    width: 24px;
    height: 24px;
    filter: invert(81%) sepia(5%) saturate(100%) hue-rotate(219deg)
      brightness(82%) contrast(90%);
  }
  .input input {
    width: 100%;
    min-height: 24px;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #757575;
    background-color: transparent;
    border: none;
    outline: none;
  }
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
  input[type="checkbox"]:checked {
    background: transparent;
    border: none;
    outline: none;
  }
</style>
