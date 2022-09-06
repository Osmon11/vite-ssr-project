<script setup>
  import { onMounted, ref } from "vue";

  import ServiceModal from "@/components/ServiceModal.vue";
  import { useStore } from "../store";
  import { useI18n } from "vue-i18n";

  const store = useStore();
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
  }
  function deleteService(service) {
    store.setPromp({
      message: t("questions.Подтверждаете_удаление_услуги"),
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
  <div class="flex-box-between" style="margin-bottom: 16px">
    <p class="title">{{ t("Услуги") }}</p>
    <v-btn color="#61a375" class="text-white" @click="setModal(true)">{{
      t("general.Добавить_услуги")
    }}</v-btn>
  </div>
  <v-expansion-panels style="margin-bottom: 20px" v-if="store.services.length">
    <v-expansion-panel v-for="service in store.services" :key="service._id">
      <v-expansion-panel-title>
        <div class="flex-box-between" style="width: 100%; padding-right: 20px">
          <p class="subtitle">{{ service[`name_${locale}`] }}</p>
          <div class="flex-box" style="gap: 20px">
            <v-btn
              color="#61a375"
              class="text-white"
              @click.stop="setCurrentService(service)"
              >{{ t("general.редактировать") }}</v-btn
            >
            <v-btn
              color="#F44336"
              class="text-white"
              @click.stop="deleteService(service)"
              >{{ t("general.удалить") }}</v-btn
            >
          </div>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div style="padding: 16px">
          <div class="content" v-html="service[`content_${locale}`]"></div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <div class="flex-box-center" v-else>
    <p class="body1">{{ t("errors.Список_пуст_Добавьте_услуги") }}</p>
  </div>
  <ServiceModal v-model="openModal" :editNews="currentService" />
</template>
