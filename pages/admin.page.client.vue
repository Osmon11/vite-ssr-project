<template>
  <PageContainer>
    <div class="d-flex flex-row admin-wrapper">
      <v-card class="py-10">
        <v-tabs
          v-model="tab"
          direction="vertical"
          color="#61a375"
        >
          <v-tab :value="AdminTabsEnum.News">{{
            $t(
              "lang-43551998-d49d-41a1-8287-25a880594e94"
            )
          }}</v-tab>
          <v-tab :value="AdminTabsEnum.Slides">{{
            $t(
              "lang-a7fbb933-403c-437a-8cb8-96eefb0b8309"
            )
          }}</v-tab>
          <v-tab
            :value="AdminTabsEnum.Partners"
            >{{
              $t(
                "lang-1d767a32-84fc-4c69-9690-8c0578515b97"
              )
            }}</v-tab
          >
          <v-tab
            :value="AdminTabsEnum.Services"
            >{{
              $t(
                "lang-63796838-a08d-4eba-b900-ce805c2df2ac"
              )
            }}</v-tab
          >
          <v-tab
            :value="AdminTabsEnum.Employees"
            >{{
              $t(
                "lang-17988631-887c-48a8-9636-4eafe2657f2d"
              )
            }}</v-tab
          >
        </v-tabs></v-card
      ><v-window
        v-model="tab"
        class="py-10 px-10"
        style="width: 100%"
        ><v-window-item
          :value="AdminTabsEnum.News"
          ><NewsTab
        /></v-window-item>
        <v-window-item
          :value="AdminTabsEnum.Slides"
          ><SlidesTab
        /></v-window-item>
        <v-window-item
          :value="AdminTabsEnum.Partners"
          ><PartnersTab
        /></v-window-item>
        <v-window-item
          :value="AdminTabsEnum.Services"
          ><ServicesTab
        /></v-window-item>
        <v-window-item
          :value="AdminTabsEnum.Employees"
          ><EmployeesTab
        /></v-window-item>
      </v-window>
    </div>
  </PageContainer>
</template>

<script lang="ts" setup>
  import { ref, watch } from "vue";
  // import { useI18n } from "vue-i18n";

  import PageContainer from "@/containers/PageContainer.vue";

  import NewsTab from "@/components/tabs/NewsTab.vue";
  import SlidesTab from "@/components/tabs/SlidesTab.vue";
  import PartnersTab from "@/components/tabs/PartnersTab.vue";
  import ServicesTab from "@/components/tabs/ServicesTab.vue";
  import EmployeesTab from "@/components/tabs/EmployeesTab.vue";

  import { AdminTabsEnum } from "@/types/enums";
  import { useNewsStore } from "@/stores/news";
  import { useSlideStore } from "@/stores/slide";
  import { usePartnerStore } from "@/stores/partner";
  import { useServiceStore } from "@/stores/service";
  import { useEmployeeStore } from "@/stores/employee";

  const tab = ref(AdminTabsEnum.News);

  const newsStore = useNewsStore();
  const slideStore = useSlideStore();
  const partnerStore = usePartnerStore();
  const serviceStore = useServiceStore();
  const employeeStore = useEmployeeStore();

  // fetch default tab data
  newsStore.fetchNewsFeed();

  watch(tab, (value) => {
    switch (value) {
      case AdminTabsEnum.News: {
        newsStore.fetchNewsFeed();
        break;
      }
      case AdminTabsEnum.Slides: {
        slideStore.fetchSlideList();
        break;
      }
      case AdminTabsEnum.Partners: {
        partnerStore.fetchPartnerList();
        break;
      }
      case AdminTabsEnum.Services: {
        serviceStore.fetchServiceList();
        break;
      }
      case AdminTabsEnum.Employees: {
        employeeStore.fetchEmployeeList();
        break;
      }
    }
  });
</script>

<style scoped>
  .admin-wrapper {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 545px);
  }
</style>
