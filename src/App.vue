<script setup>
  import cookie_js from "cookie_js";
  import { computed, onMounted, ref, watch } from "vue";
  import { useI18n } from "vue-i18n";

  import { useStore } from "./store";

  const store = useStore();
  const { t } = useI18n();
  const alertSnackbar = ref(false);
  const prompSnackbar = ref(false);

  const alert = computed(() => store.getAlert);
  const promp = computed(() => store.getPromp);

  watch(alert, (value) => (alertSnackbar.value = Boolean(value)));
  watch(promp, (value) => (prompSnackbar.value = Boolean(value)));

  onMounted(() => {
    if (cookie_js.get(import.meta.env.VITE_TOKEN_KEY) && !store.admin.token) {
      store.getUserInfo();
    }
  });

  function prompHandler(callback) {
    callback();
    this.prompSnackbar = false;
  }
</script>

<template>
  <v-app>
    <v-main>
      <v-snackbar
        v-model="alertSnackbar"
        :timeout="5000"
        variant="text"
        content-class="snackbar-transparent"
      >
        <v-alert border="start" density="default" :type="store.alert.severity">
          {{ store.alert.message }}
        </v-alert></v-snackbar
      >
      <v-snackbar v-model="prompSnackbar" :timeout="-1" color="info">
        {{ store.promp.message }}
        <template v-slot:actions
          ><div class="flex-box" style="gap: 20px">
            <v-btn
              color="#61a375"
              variant="flat"
              class="text-white"
              size="small"
              @click="prompHandler(store.promp.confirm)"
              >{{ t("general.да") }}</v-btn
            ><v-btn
              color="#F44336"
              style="color: #ffffff"
              variant="flat"
              class="text-white"
              size="small"
              @click="prompHandler(store.promp.reject)"
              >{{ t("general.отмена") }}</v-btn
            >
          </div></template
        >
      </v-snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
  @import url(./App.css);
</style>
