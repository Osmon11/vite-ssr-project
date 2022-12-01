<script setup>
  import { onMounted, ref } from "vue";

  import ServiceModal from "@/components/ServiceModal.vue";
  import appStore from "../store";
  import { useI18n } from "vue-i18n";

  const store = appStore.useStore();
  const { t, locale } = useI18n();
  const openModal = ref(false);
  const currentService = ref(null);

  onMounted(() => {
    store.getServicesList();
  });

  function setCurrentService(service) {
    currentService.value = service;
    setModal(true);
  }
  function setModal(value) {
    openModal.value = value;
    if (!value) {
      currentService.value = null;
    }
  }
  function deleteService(service) {
    store.setPromp({
      message: t(
        "lang-9e461e6a-86a1-4cc4-8265-0768d776da8c"
      ),
      confirm() {
        store.deleteService({ id: service._id });
      },
    });
  }
  function onCloseModal(value) {
    setModal(value);
    if (currentService) {
      currentService.value = null;
    }
  }
</script>

<template>
  <div
    class="flex-box-between"
    style="margin-bottom: 16px"
  >
    <p class="title">
      {{
        t(
          "lang-63796838-a08d-4eba-b900-ce805c2df2ac"
        )
      }}
    </p>
    <v-btn
      color="#61a375"
      class="text-white"
      @click="setModal(true)"
      >{{
        t(
          "lang-d9a9824d-4f4a-4f98-a4a7-cca0102fee59"
        )
      }}</v-btn
    >
  </div>
  <v-expansion-panels
    style="margin-bottom: 20px"
    v-if="store.services.length"
  >
    <v-expansion-panel
      v-for="service in store.services"
      :key="service._id"
    >
      <v-expansion-panel-title>
        <div
          class="flex-box-between"
          style="width: 100%; padding-right: 20px"
        >
          <p class="subtitle">
            {{ service[`name_${locale}`] }}
          </p>
          <div
            class="flex-box"
            style="gap: 20px"
          >
            <v-btn
              color="#61a375"
              class="text-white"
              @click.stop="
                setCurrentService(service)
              "
              >{{
                t(
                  "lang-37a7870d-ae54-4fe1-8767-fa261b98007e"
                )
              }}</v-btn
            >
            <v-btn
              color="#F44336"
              class="text-white"
              @click.stop="deleteService(service)"
              >{{
                t(
                  "lang-3b8a75a6-406e-416b-b06a-ac4a8e9e7690"
                )
              }}</v-btn
            >
          </div>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div style="padding: 16px">
          <div
            class="content"
            v-html="service[`content_${locale}`]"
          ></div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <div
    class="flex-box-center"
    v-else
  >
    <p class="body1">
      {{
        t(
          "lang-40f56028-ec4e-4dc9-a177-6bc817fe50e2"
        )
      }}
    </p>
  </div>
  <ServiceModal
    v-model="openModal"
    :editNews="currentService"
  />
</template>
