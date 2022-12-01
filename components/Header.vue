<template>
  <header
    :class="{
      sticky: isSticky,
      active: isTransparent,
    }"
  >
    <div class="flex-box-center">
      <div class="row flex-box-between gap">
        <Link
          class="logo-wrapper flex-box"
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
        </Link>
        <nav>
          <div class="flex-box">
            <Link
              class="nav-item"
              href="/?section=about_us"
              >О НАС</Link
            >
            <Link
              class="nav-item"
              href="/our-news"
              >Новости</Link
            >
            <Link
              class="nav-item"
              href="/shariah-board"
              >ШАРИАТСКИЙ СОВЕТ</Link
            >
            <Link
              class="nav-item"
              href="/?section=our_experiences"
              >НАШ ОПЫТ</Link
            >
            <Link
              class="nav-item"
              href="/?section=our_services"
              >НАШИ УСЛУГИ</Link
            >
            <Link
              class="nav-item"
              href="/?section=contacts"
              >Контакты</Link
            >
            <Link
              class="nav-item"
              href="/admin"
              v-if="isAdmin"
              >{{
                $t(
                  "lang-a0924aa2-9523-4a96-88ce-a5292f398c6a"
                )
              }}</Link
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

  import Link from "./shared/Link.vue";
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
