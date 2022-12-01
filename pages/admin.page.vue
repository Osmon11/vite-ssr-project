<template>
  <Header />
  <div class="d-flex flex-row admin-wrapper">
    <v-card class="py-10">
      <v-tabs
        v-model="tabs"
        direction="vertical"
        color="#61a375"
      >
        <v-tab value="news">{{
          t(
            "lang-43551998-d49d-41a1-8287-25a880594e94"
          )
        }}</v-tab>
        <v-tab value="slides">{{
          t(
            "lang-a7fbb933-403c-437a-8cb8-96eefb0b8309"
          )
        }}</v-tab>
        <v-tab value="partners">{{
          t(
            "lang-1d767a32-84fc-4c69-9690-8c0578515b97"
          )
        }}</v-tab>
        <v-tab value="services">{{
          t(
            "lang-63796838-a08d-4eba-b900-ce805c2df2ac"
          )
        }}</v-tab>
        <v-tab value="employees">{{
          t(
            "lang-17988631-887c-48a8-9636-4eafe2657f2d"
          )
        }}</v-tab>
      </v-tabs></v-card
    ><v-window
      v-model="tabs"
      class="py-10 px-10"
      style="width: 100%"
      ><v-window-item value="news"
        ><NewsTab /></v-window-item
      ><v-window-item value="slides"
        ><SlidesTab
      /></v-window-item>
      <v-window-item value="partners"
        ><PartnersTab
      /></v-window-item>
      <v-window-item value="services"
        ><ServicesTab
      /></v-window-item>
      <v-window-item value="employees"
        ><EmployeesTab /></v-window-item
    ></v-window>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";

  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  import NewsTab from "@/components/NewsTab.vue";
  import SlidesTab from "@/components/SlidesTab.vue";
  import PartnersTab from "@/components/PartnersTab.vue";
  import ServicesTab from "@/components/ServicesTab.vue";
  import EmployeesTab from "@/components/EmployeesTab.vue";

  const { t, locale } = useI18n();
  const tabs = ref("news");
</script>

<style scoped>
  .admin-wrapper {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 545px);
  }
</style>
