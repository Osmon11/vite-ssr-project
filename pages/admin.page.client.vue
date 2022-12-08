<template>
  <PageContainer>
    <div
      class="d-flex align-center justify-space-between w-100 px-10 px-xs-4 pt-10 pt-xs-4 pb-10 pb-xs-4"
    >
      <v-tabs
        v-model="tab"
        color="secondary"
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
        <v-tab :value="AdminTabsEnum.Partners">{{
          $t(
            "lang-1d767a32-84fc-4c69-9690-8c0578515b97"
          )
        }}</v-tab>
        <v-tab :value="AdminTabsEnum.Services">{{
          $t(
            "lang-63796838-a08d-4eba-b900-ce805c2df2ac"
          )
        }}</v-tab>
        <v-tab :value="AdminTabsEnum.Employees">{{
          $t(
            "lang-17988631-887c-48a8-9636-4eafe2657f2d"
          )
        }}</v-tab>
      </v-tabs>
      <v-btn
        color="#61a375"
        class="text-white"
        @click="openDialog"
        >{{
          $t(
            "lang-2729514f-a39b-4cf6-981d-956ca5e814eb"
          )
        }}</v-btn
      >
    </div>
    <div class="w-100 px-8 px-xs-2 pb-10 pb-xs-4">
      <v-window
        v-model="tab"
        class="w-100 h-screen fixed-height pa-2"
        ><v-window-item
          :value="AdminTabsEnum.News"
          ><NewsTab @edit-click="openDialog"
        /></v-window-item>
        <v-window-item
          :value="AdminTabsEnum.Slides"
          ><SlidesTab @edit-click="openDialog"
        /></v-window-item>
        <v-window-item
          :value="AdminTabsEnum.Partners"
          ><PartnersTab @edit-click="openDialog"
        /></v-window-item>
        <v-window-item
          :value="AdminTabsEnum.Services"
          ><ServicesTab @edit-click="openDialog"
        /></v-window-item>
        <v-window-item
          :value="AdminTabsEnum.Employees"
          ><EmployeesTab @edit-click="openDialog"
        /></v-window-item>
      </v-window>
    </div>

    <NewsDialog v-model="newsDialog" />
    <SlideDialog v-model="slideDialog" />
    <EmployeeDialog v-model="employeeDialog" />
    <PartnerDialog v-model="partnerDialog" />
    <ServiceDialog v-model="serviceDialog" />
  </PageContainer>
</template>

<script lang="ts" setup>
  import { ref, watch } from "vue";
  import cookie_js from "cookie_js";
  import { navigate } from "vite-plugin-ssr/client/router";

  import PageContainer from "@/containers/PageContainer.vue";

  import NewsTab from "@/components/tabs/NewsTab.vue";
  import SlidesTab from "@/components/tabs/SlidesTab.vue";
  import PartnersTab from "@/components/tabs/PartnersTab.vue";
  import ServicesTab from "@/components/tabs/ServicesTab.vue";
  import EmployeesTab from "@/components/tabs/EmployeesTab.vue";

  import NewsDialog from "@/components/dialogs/NewsDialog.vue";
  import SlideDialog from "@/components/dialogs/SlideDialog.vue";
  import PartnerDialog from "@/components/dialogs/PartnerDialog.vue";
  import ServiceDialog from "@/components/dialogs/ServiceDialog.vue";
  import EmployeeDialog from "@/components/dialogs/EmployeeDialog.vue";

  import { useNotification } from "@/utils/useNotification";

  import { AdminTabsEnum } from "@/types/enums";

  import { useNewsStore } from "@/stores/news";
  import { useSlideStore } from "@/stores/slide";
  import { usePartnerStore } from "@/stores/partner";
  import { useServiceStore } from "@/stores/service";
  import { useEmployeeStore } from "@/stores/employee";

  const { setAlert } = useNotification();

  if (
    !cookie_js.get(import.meta.env.VITE_TOKEN_KEY)
  ) {
    setAlert({
      type: "warning",
      message:
        "lang-6642980e-c5ab-4f92-bbee-e1070c6c2a5b",
    });
    setTimeout(() => navigate("/login"), 3000);
  }

  const tab = ref(AdminTabsEnum.News);

  const newsDialog = ref(false);
  const slideDialog = ref(false);
  const partnerDialog = ref(false);
  const serviceDialog = ref(false);
  const employeeDialog = ref(false);

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

  function openDialog() {
    switch (tab.value) {
      case AdminTabsEnum.News: {
        newsDialog.value = true;
        break;
      }
      case AdminTabsEnum.Slides: {
        slideDialog.value = true;
        break;
      }
      case AdminTabsEnum.Partners: {
        partnerDialog.value = true;
        break;
      }
      case AdminTabsEnum.Services: {
        serviceDialog.value = true;
        break;
      }
      case AdminTabsEnum.Employees: {
        employeeDialog.value = true;
        break;
      }
    }
  }
</script>
