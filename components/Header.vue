<template>
  <header
    :class="{
      sticky: isSticky,
      active: isTransparent,
    }"
  >
    <div class="flex-box-center">
      <div class="row flex-box-between gap">
        <a
          class="logo-wrapper flex-box gap"
          href="/"
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
        </a>
        <nav>
          <div class="flex-box">
            <a
              class="nav-item"
              href="/?section=about_us"
              >{{
                $t(
                  "lang-ebf0cb3f-12e2-4ce5-9184-3d7d8a9936b0"
                )
              }}</a
            >
            <a
              class="nav-item"
              href="/our-news"
              >{{
                $t(
                  "lang-43551998-d49d-41a1-8287-25a880594e94"
                )
              }}</a
            >
            <a
              class="nav-item"
              href="/shariah-board"
              >{{
                $t(
                  "lang-55f459ef-9533-4515-971c-ccd8e9d578be"
                )
              }}</a
            >
            <a
              class="nav-item"
              href="/?section=our_experiences"
              >{{
                $t(
                  "lang-ef952636-74de-4f4c-a2b1-df869f04e844"
                )
              }}</a
            >
            <a
              class="nav-item"
              href="/?section=our_services"
              >{{
                $t(
                  "lang-789737de-eb6a-47de-ab69-33aa5670867e"
                )
              }}</a
            >
            <a
              class="nav-item"
              href="/?section=contacts"
              >{{
                $t(
                  "lang-46a7bb85-b9d4-460e-b0cd-d5b7ac7a870e"
                )
              }}</a
            >
            <a
              class="nav-item"
              href="/admin"
              v-if="isAdmin"
              >{{
                $t(
                  "lang-a0924aa2-9523-4a96-88ce-a5292f398c6a"
                )
              }}</a
            >
            <Select
              :value="locale"
              @change="onLocaleChange"
              :class="{
                activeSelect:
                  pageContext.urlPathname !== '/',
              }"
              :style="{ margin: '0px 15px' }"
              :icon="false"
            >
              <template #render-value>
                <div
                  class="flex-box"
                  style="gap: 8px"
                >
                  <img
                    :src="
                      locale === languages.primary
                        ? '/assets/united-kingdom.svg'
                        : '/assets/russia.svg'
                    "
                    :alt="
                      locale === languages.primary
                        ? 'united kingdom flag'
                        : 'russian flag'
                    "
                    style="
                      width: 20px;
                      height: 20px;
                    "
                  />
                  <p>{{ locale }}</p>
                </div></template
              >
              <template #items="{ handleChange }"
                ><div
                  class="select-item"
                  :class="{
                    active:
                      languages.primary ===
                      locale,
                  }"
                  @click="
                    handleChange(
                      languages.primary
                    )
                  "
                >
                  <div
                    class="flex-box"
                    style="gap: 8px; width: 42px"
                  >
                    <img
                      src="/assets/united-kingdom.svg"
                      alt="united kingdom flag"
                      style="
                        width: 20px;
                        height: 20px;
                      "
                    />
                    <p>en</p>
                  </div>
                </div>
                <div
                  class="select-item"
                  :class="{
                    active:
                      languages.secondary ===
                      locale,
                  }"
                  @click="
                    handleChange(
                      languages.secondary
                    )
                  "
                >
                  <div
                    class="flex-box"
                    style="gap: 8px; width: 42px"
                  >
                    <img
                      src="/assets/russia.svg"
                      alt="russian flag"
                      style="
                        width: 20px;
                        height: 20px;
                      "
                    />
                    <p>ru</p>
                  </div>
                </div>
              </template></Select
            >
          </div>
        </nav>
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
  } from "vue";
  import { useI18n } from "vue-i18n";

  import Select from "./shared/Select.vue";
  import { useAppStore } from "@/stores/app";
  import { usePageContext } from "@/renderer/usePageContext";
  import { useAuthStore } from "@/stores/auth";

  const { locale } = useI18n();
  const pageContext = usePageContext();
  const appStore = useAppStore();
  const authStore = useAuthStore();

  const isAdmin = computed(
    () => authStore.isAdmin
  );
  const isHome = computed(
    () => pageContext.urlPathname === "/"
  );

  // --> HEADER
  const isSticky = ref(isHome.value);
  const isTransparent = ref(isHome.value);

  function handleScroll() {
    if (isHome.value) {
      isTransparent.value = window.scrollY === 0;
      isSticky.value =
        window.scrollY < window.innerHeight - 50;
    }
  }
  onMounted(() => {
    window.addEventListener(
      "scroll",
      handleScroll
    );
  });
  onUnmounted(() => {
    window.removeEventListener(
      "scroll",
      handleScroll
    );
  });

  // --> SELECT LANGUAGE
  const languages = computed(
    () => appStore.getLanguages
  );
  // on change language
  function onLocaleChange(newlocale: string) {
    locale.value = newlocale;
  }
</script>

<style scoped>
  .row {
    width: 100%;
    max-width: 1250px;
    gap: 5vw;
  }
  .logo-wrapper {
    height: 40px;
    gap: 10px;
    padding: 0px 15px;
    cursor: pointer;
  }
  .logout-icon {
    width: 24px;
    height: 24px;
    filter: invert(15%) sepia(89%) saturate(7500%)
      hue-rotate(3deg) brightness(93%)
      contrast(121%);
  }

  .text-header {
    width: fit-content;
    color: #fff;
    font-size: 12px;
    font-weight: 300;
    line-height: 20px;
    padding: 0px;
  }
  .text-header a {
    color: #fff;
    /* font-weight: 500; */
  }
  .contact-icon {
    width: 14px;
    height: 14px;
  }
  @media (min-width: 0px) and (max-width: 600px) {
    .text-header,
    .text-header a {
      font-weight: 400;
    }
  }
  @media (min-width: 600px) and (max-width: 960px) {
    .text-header,
    .text-header a {
      font-weight: 400;
    }
  }
  @media (min-width: 960px) and (max-width: 1264px) {
    .row {
      gap: 20px;
    }
  }
</style>
