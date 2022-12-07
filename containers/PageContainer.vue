<template>
  <div class="page_container">
    <Header
      :scrollIntoHandler="props.scrollIntoHandler"
    />
    <div class="content"><slot></slot></div>
    <Footer
      :scrollIntoHandler="props.scrollIntoHandler"
    />
    <v-snackbar
      v-model="alertSnackbar"
      :timeout="5000"
      variant="text"
      content-class="snackbar-transparent"
    >
      <v-alert
        border="start"
        density="default"
        :type="alert.type"
      >
        {{ $t(alert.message) }}
      </v-alert></v-snackbar
    >
    <v-snackbar
      v-model="prompSnackbar"
      :timeout="-1"
      color="info"
    >
      {{ $t(promp.message) }}
      <template v-slot:actions
        ><div
          class="flex-box"
          style="gap: 20px"
        >
          <v-btn
            color="#61a375"
            variant="flat"
            class="text-white"
            size="small"
            @click="prompHandler('confirm')"
            >{{
              $t(
                "lang-2aaab848-d4c2-4202-bf28-9dfc88cad0f7"
              )
            }}</v-btn
          ><v-btn
            color="#F44336"
            style="color: #ffffff"
            variant="flat"
            class="text-white"
            size="small"
            @click="prompHandler('reject')"
            >{{
              $t(
                "lang-13ae4b92-8336-4cdd-adbb-ead122b87cb3"
              )
            }}</v-btn
          >
        </div></template
      >
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
  import cookie_js from "cookie_js";
  import {
    computed,
    onMounted,
    PropType,
    ref,
    watch,
  } from "vue";

  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";

  import { useAuthStore } from "@/stores/auth";
  import { useAppStore } from "@/stores/app";

  const props = defineProps({
    scrollIntoHandler: {
      type: Function as PropType<
        (key: string) => void
      >,
      default: () => {},
    },
  });

  const appStore = useAppStore();
  const authStore = useAuthStore();

  const alert = computed(() => appStore.getAlert);
  const promp = computed(() => appStore.getPromp);

  const alertSnackbar = ref(
    Boolean(alert.value.message)
  );
  const prompSnackbar = ref(
    Boolean(promp.value.message)
  );

  watch(
    alert,
    (value) =>
      (alertSnackbar.value = Boolean(
        value.message
      ))
  );
  watch(
    promp,
    (value) =>
      (prompSnackbar.value = Boolean(
        value.message
      ))
  );

  onMounted(() => {
    if (
      cookie_js.get(
        import.meta.env.VITE_TOKEN_KEY
      ) &&
      !authStore.user.token
    ) {
      authStore.fetchUserInfo();
    }
  });

  function prompHandler(
    action: "confirm" | "reject"
  ) {
    if (
      action === "confirm" &&
      promp.value.confirm
    ) {
      promp.value.confirm();
    }
    if (
      action === "reject" &&
      promp.value.reject
    ) {
      promp.value.reject();
    }
    prompSnackbar.value = false;
  }
</script>
