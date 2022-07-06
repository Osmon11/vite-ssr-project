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
          <img src="/src/assets/iconmonstr-user-5.svg" /><input
            type="text"
            name="login"
          />
        </div>
        <div class="flex_box input">
          <img src="/src/assets/iconmonstr-lock-3.svg" /><input
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
</style>
