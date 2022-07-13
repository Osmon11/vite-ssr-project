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
      <form
        @submit.prevent="(event) => handleLoginSubmit(event)"
        autocomplete="off"
      >
        <v-text-field
          type="text"
          name="login"
          variant="outlined"
          label="Логин"
          color="#61a375"
          :autofocus="false"
        ></v-text-field>
        <v-text-field
          type="password"
          name="password"
          variant="outlined"
          label="Пороль"
          color="#61a375"
          hide-details
          :autofocus="false"
        ></v-text-field>
        <v-checkbox
          name="remember"
          label="Запомнить ?"
          color="#61a375"
          hide-details
          :autofocus="false"
        ></v-checkbox>
        <v-btn
          color="#61a375"
          class="text-white"
          style="width: 200px"
          type="submit"
        >
          Войти
        </v-btn>
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
