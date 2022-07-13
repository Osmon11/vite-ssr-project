<script setup>
  import { computed, onMounted, onUnmounted } from "@vue/runtime-core";
  import { useRoute, useRouter } from "vue-router";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";

  import Select from "@/components/Select.vue";

  const props = defineProps(["scrollIntoHandler", "headerPosition"]);

  const { t, locale } = useI18n();
  const navigate = useRouter();
  const { name } = useRoute();
  const homePageNavigation = [
    { label: "About Us", key: "about_us" },
    { label: "Why Us", key: "why_us" },
    { label: "shariah board", to: "/shariah-board" },
    {
      label: "Our Experiences",
      key: "our_experiences",
    },
    { label: "Our Services", key: "our_services" },
    { label: "News", key: "blog" },
    { label: "Login", to: "/login" },
  ];
  const languageSelect = [
    {
      value: "ru",
      layout: `<div class="flex-box" style="gap: 8px; width: 42px"
      ><img src="/assets/russia.svg" alt="russia flag" style="width: 20px;
    height: 20px;" />
      <p>ru</p></div
    >`,
    },
    {
      value: "en",
      layout: `<div class="flex-box" style="gap: 8px; width: 42px"
        ><img src="/assets/united-kingdom.svg" alt="united kingdom flag" style="width: 20px;
    height: 20px;" />
        <p>en</p></div
      >`,
    },
  ];
  const lang = ref("en");
  const isActive = ref(name === "home");
  function handleScroll() {
    if (name === "home") {
      isActive.value = window.scrollY === 0;
    }
  }
  function logoClick() {
    if (name === "home") {
      props.scrollIntoHandler("top");
    } else {
      navigate.push("/");
    }
  }
  function navHandler(item) {
    if (item.key) {
      props.scrollIntoHandler(item.key);
    } else {
      navigate.push(item.to);
    }
  }
  function setLocale(value) {
    locale.value = value;
  }

  function logout() {}
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
</script>

<template>
  <header :class="{ active: isActive }" :style="{ position: headerPosition }">
    <div class="flex-box-center">
      <div class="row flex-box-between">
        <div class="logo-wrapper flex-box" @click="logoClick">
          <img class="logo" src="/assets/AA_LOGO.svg" alt="logo" />
          <p class="logo-text activeLogoText">Amanat Advisory LLC</p>
        </div>
        <nav class="flex-box" v-if="name === 'home'">
          <div
            class="nav-item"
            v-for="item in homePageNavigation"
            :key="item.label"
            @click.stop="navHandler(item)"
          >
            {{ item.label }}
          </div>
        </nav>
        <nav class="flex-box" v-if="name !== 'home'">
          <router-link class="nav-item" to="/">Home</router-link>
          <router-link class="nav-item" to="/our-news">News</router-link>
          <router-link class="nav-item" to="/login" v-if="name !== 'admin'"
            >Login</router-link
          >
          <div class="flex-box" style="cursor: pointer" @click="logout" v-else>
            <p class="nav-item" style="padding-right: 10px">Logout</p>
            <!-- <img
              class="logout-icon"
              src="/assets/logout-svgrepo-com.svg"
              alt=""
            /> -->
          </div>
        </nav>
      </div>
    </div>
    <div class="toggle-language">
      <!-- <v-select
        class="color-white"
        v-model="lang"
        :items="['en', 'ru']"
        variant="outlined"
        density="compact"
        hide-details
      ></v-select> -->
      <Select
        :value="locale"
        @change="setLocale"
        :items="languageSelect"
        :class="{ activeSelect: !isActive }"
      />
    </div>
  </header>
</template>

<style scoped>
  .row {
    width: 100%;
    max-width: 1140px;
    gap: 5vw;
  }
  .logo-wrapper {
    height: 40px;
    gap: 10px;
    padding: 0px 10px;
    cursor: pointer;
  }
  .logout-icon {
    width: 24px;
    height: 24px;
    filter: invert(15%) sepia(89%) saturate(7500%) hue-rotate(3deg)
      brightness(93%) contrast(121%);
  }
</style>
