<script setup>
  import { onMounted, onUnmounted } from "@vue/runtime-core";
  import { useRoute, useRouter } from "vue-router";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";

  import Select from "@/components/Select.vue";

  const props = defineProps(["scrollIntoHandler"]);

  const { t, locale } = useI18n();
  const navigate = useRouter();
  const { name } = useRoute();
  const homePageNavigation = [
    { label: "Introduction", key: "introduction" },
    { label: "About Us", key: "about_us" },
    { label: "Why Us", key: "why_us" },
    {
      label: "Our Experiences",
      key: "our_experiences",
    },
    { label: "Our Services", key: "our_services" },
    { label: "Blog", key: "blog" },
    { label: "Login", to: "/login" },
  ];
  const languageSelect = [
    {
      value: "ru",
      layout: `<div class="flex_box" style="gap: 8px; width: 42px"
      ><img src="/src/assets/russia.svg" alt="russia flag" style="width: 20px;
    height: 20px;" />
      <p>ru</p></div
    >`,
    },
    {
      value: "en",
      layout: `<div class="flex_box" style="gap: 8px; width: 42px"
        ><img src="/src/assets/united-kingdom.svg" alt="united kingdom flag" style="width: 20px;
    height: 20px;" />
        <p>en</p></div
      >`,
    },
  ];
  const isActive = ref(name === "home");
  function handleScroll() {
    if (name === "home") {
      isActive.value = window.scrollY === 0;
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
  <header
    :class="{ active: isActive }"
    :style="{ position: name === 'home' ? 'fixed' : 'relative' }"
  >
    <div class="flex_box_center">
      <div
        class="row flex_box_between"
        style="width: 100%; max-width: 1140px; gap: 5vw"
      >
        <div
          class="flex_box"
          @click="
            name === 'home' ? scrollIntoHandler('top') : navigate.push('/')
          "
          style="height: 100px; gap: 10px; padding: 0px 10px; cursor: pointer"
        >
          <img class="logo" src="../assets/AA_LOGO.svg" alt="logo" />
          <p
            class="logo_text"
            :style="{ color: isActive ? '#FFFFFF' : '#61a375' }"
          >
            Amanat Advisory LLC
          </p>
        </div>
        <nav class="flex_box" v-if="name === 'home'">
          <div
            class="nav_item"
            :class="{ nav_item_secondary: !isActive }"
            v-for="item in homePageNavigation"
            :key="item.label"
            @click.stop="navHandler(item)"
          >
            {{ item.label }}
          </div>
        </nav>
        <nav class="flex_box" v-if="name === 'admin'">
          <router-link class="nav_item nav_item_secondary" to="/blog"
            >Blog</router-link
          >
          <div class="flex_box" style="cursor: pointer" @click="logout">
            <p class="nav_item nav_item_secondary" style="padding-right: 10px">
              Logout
            </p>
            <img
              src="/src/assets/logout-svgrepo-com.svg"
              alt=""
              style="
                width: 24px;
                height: 24px;
                filter: invert(15%) sepia(89%) saturate(7500%) hue-rotate(3deg)
                  brightness(93%) contrast(121%);
              "
            />
          </div>
        </nav>
      </div>
    </div>
    <div class="toggle_language">
      <Select
        :value="locale"
        @change="setLocale"
        :items="languageSelect"
        :class="{ activeSelect: !isActive }"
      />
    </div>
  </header>
</template>

<style>
  header {
    top: 0px;
    left: 0px;
    width: 100%;
    z-index: 1000;
    padding: 5px 0px;
    background-color: #ffffff;
    border-bottom: 1px solid #61a375;
    transition: all 0.2s;
  }
  header.active {
    background-color: transparent;
    padding: 20px 0px;
  }
  header:hover {
    background-color: #ffffff;
  }
  header:hover .logo_text,
  header:hover .nav_item,
  header:hover .default_value p,
  .activeSelect .default_value p {
    color: #61a375 !important;
  }
  header:hover svg {
    filter: invert(68%) sepia(18%) saturate(774%) hue-rotate(51deg)
      brightness(92%) contrast(91%) !important;
  }
  .toggle_language {
    position: absolute;
    right: 32px;
    top: 50%;
    transform: translateY(-50%);
  }
  .activeSelect svg {
    filter: invert(68%) sepia(18%) saturate(774%) hue-rotate(51deg)
      brightness(92%) contrast(91%);
  }
</style>
