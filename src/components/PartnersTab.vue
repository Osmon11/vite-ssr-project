<script setup>
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import { useStore } from "../store";
  import PartnerModal from "./PartnerModal.vue";

  const store = useStore();
  const { t, locale } = useI18n();
  const openModal = ref(false);
  const currentPartner = ref(null);
  const loadedImg = ref({});
  const backendUrl = import.meta.env.VITE_API_URL;

  onMounted(() => {
    store.getPartnersList();
    setTimeout(
      store.partners.forEach(
        (partner) => (loadedImg.value[partner._id] = true),
        10000
      )
    );
  });

  function setCurrentPartner(partner) {
    currentPartner.value = partner;
    setModal(true);
  }
  function setModal(value) {
    openModal.value = value;
    if (!value) {
      currentPartner.value = null;
    }
  }
  function deletePartner(partner) {
    store.setPromp({
      message: t("questions.Подтверждаете_удаление_партнера"),
      confirm() {
        store.deletePartner({ id: partner._id });
      },
    });
  }
  function onLoadImg(id) {
    loadedImg.value[id] = true;
  }
</script>

<template>
  <div class="flex-box-between" style="margin-bottom: 16px">
    <p class="title">{{ t("Партнеры") }}</p>
    <v-btn color="#61a375" class="text-white" @click="setModal(true)">{{
      t("general.Новый_партнер")
    }}</v-btn>
  </div>
  <div v-if="store.partners.length">
    <v-banner
      class="my-4"
      lines="5"
      v-for="person in store.partners"
      :key="person._id"
    >
      <template #prepend
        ><v-avatar size="x-large" rounded="0">
          <v-img
            :src="`${backendUrl}${person.logo}`"
            :alt="person[`name_${locale}`]"
          ></v-img></v-avatar
      ></template>
      <v-banner-text
        ><div class="flex-box-between" style="width: 100%">
          <p class="title" style="font-size: 24px">
            {{ person[`name_${locale}`] }}
          </p>
          <div class="flex-box" style="gap: 20px">
            <v-btn
              color="#61a375"
              class="text-white"
              @click.stop="setCurrentPartner(person)"
              >{{ t("general.редактировать") }}</v-btn
            >
            <v-btn
              color="#F44336"
              class="text-white"
              @click.stop="deletePartner(person)"
              >{{ t("general.удалить") }}</v-btn
            >
          </div>
        </div>
        {{ person[`biography_${locale}`] }}</v-banner-text
      ></v-banner
    >
  </div>
  <div class="flex-box-center" v-else>
    <p class="body1">
      {{ t("errors.Партнеров_пока_нет_Создайте_нового_партнера") }}
    </p>
  </div>
  <PartnerModal v-model="openModal" :editPartner="currentPartner" />
</template>
