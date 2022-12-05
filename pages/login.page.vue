<template>
  <div class="login_wrapper flex-box-center">
    <main class="flex-box-center">
      <v-form
        class="form"
        v-model="valid"
        @submit.prevent="onLoginSubmit"
      >
        <v-text-field
          type="email"
          name="login"
          variant="outlined"
          :label="
            $t(
              'lang-9edf35fc-0287-4a0f-a4b8-e469ad12ea39'
            )
          "
          color="#61a375"
          :autofocus="false"
          :modelValue="form.login"
          @update:modelValue="
            onUpdate('login', $event)
          "
          :rules="[
            (v) =>
              !!v ||
              $t(
                'lang-091f36a9-4ea2-4fc9-829d-1b079c267987'
              ),
          ]"
        ></v-text-field>
        <v-text-field
          type="password"
          name="password"
          variant="outlined"
          :label="
            $t(
              'lang-850b7b87-adeb-4dc5-b303-629b582c8be5'
            )
          "
          color="#61a375"
          hide-details
          :autofocus="false"
          :modelValue="form.password"
          @update:modelValue="
            onUpdate('password', $event)
          "
          :rules="[
            (v) =>
              !!v ||
              $t(
                'lang-d4cf3bf5-74de-4ca4-9d32-bd64ae17c69d'
              ),
          ]"
        ></v-text-field>
        <v-btn
          color="#61a375"
          class="text-white"
          style="width: 200px"
          type="submit"
        >
          {{
            $t(
              "lang-2e36c4e6-cae9-4d49-a2bc-60df31ec947c"
            )
          }}
        </v-btn>
      </v-form>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from "vue";
  import { useAuthStore } from "@/stores/auth";
  import { isUserInfoData } from "@/api/index.guards";
  import { navigate } from "vite-plugin-ssr/client/router";

  const authStore = useAuthStore();

  // --> FORM
  const form = computed(
    () => authStore.getLoginForm
  );
  const valid = ref(false);
  // action handlers
  function onUpdate(key: string, value: any) {
    authStore.updateLoginForm(key, value);
  }
  function onLoginSubmit() {
    if (valid.value) {
      authStore.login().then((data) => {
        if (isUserInfoData(data)) {
          navigate("/admin");
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
