<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useMeta } from "vue-meta";

  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  import NewsTab from "@/components/NewsTab.vue";
  import SlidesTab from "@/components/SlidesTab.vue";
  import PartnersTab from "@/components/PartnersTab.vue";
  import ServicesTab from "@/components/ServicesTab.vue";
  import EmployeesTab from "@/components/EmployeesTab.vue";
  import appStore from "../store/index.js";

  const store = appStore.useStore();
  const { t, locale } = useI18n();
  useMeta({
    title: store.defaultAppTitle,
    description: store.defaultAppDescription[locale.value],
    keywords: store.keywords,
  });
  const tabs = ref("news");
</script>

<template>
  <metainfo>
    <template v-slot:title="{ content, metainfo }">{{
      `${content} | ${metainfo.description}`
    }}</template>
  </metainfo>
  <Header />
  <div class="d-flex flex-row admin-wrapper">
    <v-card class="py-10">
      <v-tabs v-model="tabs" direction="vertical" color="#61a375">
        <v-tab value="news">{{ t("Новости") }}</v-tab>
        <v-tab value="slides">{{ t("Слайды") }}</v-tab>
        <v-tab value="partners">{{ t("Партнеры") }}</v-tab>
        <v-tab value="services">{{ t("Услуги") }}</v-tab>
        <v-tab value="employees">{{ t("Сотрудники") }}</v-tab>
      </v-tabs></v-card
    ><v-window v-model="tabs" class="py-10 px-10" style="width: 100%"
      ><v-window-item value="news"><NewsTab /></v-window-item
      ><v-window-item value="slides"><SlidesTab /></v-window-item>
      <v-window-item value="partners"><PartnersTab /></v-window-item>
      <v-window-item value="services"><ServicesTab /></v-window-item>
      <v-window-item value="employees"><EmployeesTab /></v-window-item
    ></v-window>
  </div>
  <Footer />
</template>

<style scoped>
  .admin-wrapper {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 545px);
  }
</style>
