<template>
  <metainfo>
    <template
      v-slot:title="{ content, metainfo }"
      >{{
        `${content} | ${metainfo.description}`
      }}</template
    >
  </metainfo>
  <div class="login_wrapper flex-box-center">
    <main class="flex-box-center">
      <v-form
        class="form"
        v-model="valid"
        @submit.prevent="handleLoginSubmit"
      >
        <v-text-field
          type="email"
          name="login"
          variant="outlined"
          label="Логин"
          color="#61a375"
          :autofocus="false"
          :modelValue="form.login"
          @update:modelValue="
            onUpdate('login', $event)
          "
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
          :modelValue="form.password"
          @update:modelValue="
            onUpdate('password', $event)
          "
          :rules="[
            (v) => !!v || 'Введите Пароль',
          ]"
        ></v-text-field>
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

<script lang="ts" setup>
  import { computed, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useAuthStore } from "@/stores/auth";
  import { isUserInfoData } from "@/api/index.guards";

  const authStore = useAuthStore();
  const { locale } = useI18n();

  // --> FORM
  const form = computed(
    () => authStore.getLoginForm
  );
  const valid = ref(false);
  // actions
  function onUpdate(key: string, value: any) {
    authStore.updateLoginForm(key, value);
  }
  function handleLoginSubmit() {
    if (valid.value) {
      authStore.login().then((data) => {
        if (isUserInfoData(data)) {
        }
      });
    }
  }
</script>

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
