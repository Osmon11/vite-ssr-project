<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  import appStore from "../store";

  const store = appStore.useStore();
  const navigate = useRouter();
  const valid = ref(false);
  const login = ref("");
  const password = ref("");
  const remember = ref(false);

  function handleLoginSubmit() {
    if (valid.value) {
      store.authorize(
        { login: login.value, password: password.value },
        remember.value,
        (success) => {
          if (success) {
            navigate.push("/admin");
          }
        }
      );
    }
  }
</script>

<template>
  <div class="login_wrapper flex-box-center">
    <main class="flex-box-center">
      <v-form
        class="form"
        v-model="valid"
        @submit.prevent="(event) => handleLoginSubmit(event)"
      >
        <v-text-field
          type="email"
          name="login"
          variant="outlined"
          label="Логин"
          color="#61a375"
          :autofocus="false"
          v-model="login"
          :rules="[(v) => !!v || 'Введите Логин']"
        ></v-text-field>
        <v-text-field
          type="password"
          name="password"
          variant="outlined"
          label="Пароль"
          color="#61a375"
          hide-details
          :autofocus="false"
          v-model="password"
          :rules="[(v) => !!v || 'Введите Пароль']"
        ></v-text-field>
        <v-checkbox
          name="remember"
          label="Запомнить ?"
          color="#61a375"
          hide-details
          :autofocus="false"
          v-model="remember"
        ></v-checkbox>
        <v-btn
          color="#61a375"
          class="text-white"
          style="width: 200px"
          type="submit"
        >
          Войти
        </v-btn>
      </v-form>
    </main>
  </div>
</template>

<style scoped>
  .form {
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
