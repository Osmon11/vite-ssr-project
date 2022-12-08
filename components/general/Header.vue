<template>
  <header
    :class="{
      sticky: isSticky,
      active: isTransparent,
    }"
  >
    <div class="flex-box-center">
      <div class="row flex-box-between gap">
        <div
          class="logo-wrapper flex-box gap"
          @click="onLogoClick"
          static
        >
          <img
            class="logo"
            src="/assets/AA_LOGO.svg"
            alt="Amanat Advisory"
          />
          <p class="logo-text activeLogoText">
            Amanat Advisory LLC
          </p>
        </div>
        <v-layout
          v-if="xs || sm"
          class="justify-end"
        >
          <NavigationDrawer
            v-model="drawer"
            :closeDrawer="closeDrawer"
            :navHandler="navHandler"
          />
          <v-icon
            icon="mdi-menu"
            color="white"
            variant="text"
            @click.stop="drawer = true"
          ></v-icon>
        </v-layout>
        <Navigation
          v-else
          :navHandler="navHandler"
        />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  import {
    ref,
    computed,
    onMounted,
    onUnmounted,
    PropType,
  } from "vue";
  import { navigate } from "vite-plugin-ssr/client/router";

  import Navigation from "./Navigation.vue";

  import { usePageContext } from "@/renderer/usePageContext";
  import NavigationDrawer from "./NavigationDrawer.vue";

  const props = defineProps({
    scrollIntoHandler: {
      type: Function as PropType<
        (key: string) => void
      >,
      default: () => {},
    },
  });

  const pageContext = usePageContext();

  const isHome = computed(
    () => pageContext.urlPathname === "/"
  );
  const xs = computed(() =>
    import.meta.env.SSR
      ? 0
      : window.innerWidth <= 600
  );
  const sm = computed(() =>
    import.meta.env.SSR
      ? 0
      : window.innerWidth <= 960
  );

  // --> HEADER
  const isSticky = ref(isHome.value);
  const isTransparent = ref(isHome.value);

  function handleScroll() {
    if (!import.meta.env.SSR && isHome.value) {
      isTransparent.value = window.scrollY === 0;
      isSticky.value =
        window.scrollY < window.innerHeight - 50;
    }
  }
  onMounted(() => {
    if (!import.meta.env.SSR) {
      window.addEventListener(
        "scroll",
        handleScroll
      );
    }
  });
  onUnmounted(() => {
    if (!import.meta.env.SSR) {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    }
  });

  // --> NAVIGATION
  // action handlers
  function onLogoClick() {
    if (isHome.value) {
      props.scrollIntoHandler("top");
    } else {
      navigate("/");
    }
  }
  function navHandler(
    route: string,
    section?: string
  ) {
    if (section && isHome.value) {
      props.scrollIntoHandler(section);
    } else if (section === "contacts") {
      window.scroll({
        top: 1000000,
        behavior: "smooth",
      });
    } else {
      navigate(route, {
        keepScrollPosition: true,
      });
    }
  }

  // DRAWER
  const drawer = ref(false);
  function closeDrawer() {
    drawer.value = false;
  }
</script>

<style scoped>
  .row {
    width: 100%;
    max-width: 1250px;
  }
  .logo-wrapper {
    height: 40px;
    gap: 10px;
    cursor: pointer;
  }
  .logout-icon {
    width: 24px;
    height: 24px;
    filter: invert(15%) sepia(89%) saturate(7500%)
      hue-rotate(3deg) brightness(93%)
      contrast(121%);
  }

  @media (min-width: 0px) and (max-width: 600px) {
  }
  @media (min-width: 600px) and (max-width: 960px) {
  }
  @media (min-width: 960px) and (max-width: 1264px) {
  }
</style>
