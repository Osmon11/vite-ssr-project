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
              >Да</v-btn
            ><v-btn
              color="red"
              variant="flat"
              class="text-white"
              size="small"
              @click="prompHandler(store.promp.reject)"
              >Отмена</v-btn
            >
          </div></template
        >
      </v-snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from "vue";
  import { useStore } from "./store";

  const store = useStore();
  const alertSnackbar = ref(false);
  const prompSnackbar = ref(false);

  store.$subscribe((mutation, state) => {
    if (mutation.events.key === "alert") {
      alertSnackbar.value = Boolean(state.alert.message);
    }
    if (mutation.events.key === "promp") {
      prompSnackbar.value = Boolean(state.promp.message);
    }
  });

  function prompHandler(callback) {
    callback();
    this.prompSnackbar = false;
  }
</script>

<style>
  @import url(./App.css);
</style>
