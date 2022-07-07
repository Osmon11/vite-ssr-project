<script setup>
  import { useRouter } from "vue-router";

  const navigate = useRouter();

  function handleLoginSubmit(event) {
    const { login, password, remember } = event.target.elements;
    navigate.push("/admin");
  }
</script>

<template>
  <div class="login_wrapper flex-box-center">
    <main class="flex-box-center">
      <form @submit.prevent="(event) => handleLoginSubmit(event)">
        <div class="flex-box input">
          <img src="/src/assets/iconmonstr-user-5.svg" /><input
            type="text"
            name="login"
          />
        </div>
        <div class="flex-box input">
          <img src="/src/assets/iconmonstr-lock-3.svg" /><input
            type="password"
            name="password"
          />
        </div>
        <div class="flex-box-between">
          <div class="flex-box" style="gap: 10px">
            <input type="checkbox" name="remember" />
            <p class="body1">Запомнить ?</p>
          </div>
        </div>
        <button class="theme-btn login_btn" type="submit">Войти</button>
      </form>
    </main>
  </div>
</template>

<style scoped>
  form {
    width: 400px;
  }
  .login_wrapper {
    width: 100%;
    min-height: 100vh;
  }
  .login_btn {
    width: 200px;
    margin-top: 16px;
  }
</style>
