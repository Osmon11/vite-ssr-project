<template>
  <header>
    <div class="flex-box-center">
      <div class="row flex-box-between">
        <Link class="logo-wrapper flex-box" href="/" static>
          <img class="logo" src="/assets/AA_LOGO.svg" alt="Amanat Advisory" />
          <p class="logo-text activeLogoText">Amanat Advisory LLC</p>
        </Link>
        <nav>
          <div class="flex-box">
            <Link class="nav-item" href="/?section=about_us">О НАС</Link>
            <Link class="nav-item" href="/our-news">Новости</Link>
            <Link class="nav-item" href="/shariah-board">ШАРИАТСКИЙ СОВЕТ</Link>
            <Link class="nav-item" href="/?section=our_experiences"
              >НАШ ОПЫТ</Link
            >
            <Link class="nav-item" href="/?section=our_services"
              >НАШИ УСЛУГИ</Link
            >
            <Link class="nav-item" href="/?section=contacts">Контакты</Link>
            <Link class="nav-item" href="/admin" v-if="authorized">{{
              $t("Админ")
            }}</Link>
            <Select
              :value="locale"
              @change="onLocaleChange"
              :class="{ activeSelect: pageContext.urlPathname !== '/' }"
              :style="{ margin: '0px 15px' }"
              :icon="false"
            >
              <template #render-value>
                <div class="flex-box" style="gap: 8px">
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
                    style="width: 20px; height: 20px"
                  />
                  <p>{{ locale }}</p>
                </div></template
              >
              <template #items="{ handleChange }"
                ><div
                  class="select-item"
                  :class="{
                    active: languages.primary === locale,
                  }"
                  @click="handleChange(languages.primary)"
                >
                  <div class="flex-box" style="gap: 8px; width: 42px">
                    <img
                      src="/assets/united-kingdom.svg"
                      alt="united kingdom flag"
                      style="width: 20px; height: 20px"
                    />
                    <p>en</p>
                  </div>
                </div>
                <div
                  class="select-item"
                  :class="{
                    active: languages.secondary === locale,
                  }"
                  @click="handleChange(languages.secondary)"
                >
                  <div class="flex-box" style="gap: 8px; width: 42px">
                    <img
                      src="/assets/russia.svg"
                      alt="russian flag"
                      style="width: 20px; height: 20px"
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
  import Link from "./shared/Link.vue";
  import Select from "./shared/Select.vue";
  import { useAppStore } from "@/stores/app";
  import { computed } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";
  import { usePageContext } from "@/renderer/usePageContext";

  const { locale } = useI18n();
  const pageContext = usePageContext();
  // :class="{ active: isActive, sticky: isSticky }"
  const appStore = useAppStore();

  const authorized = computed(() => appStore.isAdmin);
  const languages = computed(() => appStore.getLanguages);
  console.log(pageContext.urlPathname);

  // on change language
  function onLocaleChange(newlocale: string) {
    locale.value = newlocale;
  }
</script>
