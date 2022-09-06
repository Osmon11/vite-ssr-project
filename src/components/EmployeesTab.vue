<script setup>
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import { useStore } from "../store";
  import EmployeeModal from "./EmployeeModal.vue";

  const store = useStore();
  const { t, locale } = useI18n();
  const openModal = ref(false);
  const currentPerson = ref(null);
  const backendUrl = import.meta.env.VITE_API_URL;

  onMounted(() => {
    store.getShariahBoard();
  });

  function setCurrentPerson(person) {
    currentPerson.value = person;
    setModal(true);
  }
  function setModal(value) {
    openModal.value = value;
  }
  function deletePerson(person) {
    store.setPromp({
      message: t("questions.Подтверждаете_удаление_сотрудника"),
      confirm() {
        store.deleteEmployee({ id: person._id });
      },
    });
  }
  function onCloseModal(value) {
    setModal(value);
    if (currentPerson) {
      currentPerson.value = null;
    }
  }
</script>

<template>
  <div class="flex-box-between" style="margin-bottom: 16px">
    <p class="title">{{ t("Сотрудники") }}</p>
    <v-btn color="#61a375" class="text-white" @click="setModal(true)">{{
      t("general.Добавить_сотрудника")
    }}</v-btn>
  </div>
  <div v-if="store.shariahBoard.length">
    <v-banner
      class="my-4"
      lines="5"
      v-for="person in store.shariahBoard"
      :key="person._id"
    >
      <template #prepend
        ><v-avatar size="x-large">
          <v-img
            :src="`${backendUrl}${person.avatar}`"
            :alt="person[`fullname_${locale}`]"
          ></v-img></v-avatar
      ></template>
      <v-banner-text
        ><div class="flex-box-between" style="width: 100%; margin-bottom: 15px">
          <p class="title" style="font-size: 24px; padding-bottom: 0px">
            {{ person[`fullname_${locale}`] }}
          </p>
          <div class="flex-box" style="gap: 20px">
            <v-btn
              color="#61a375"
              class="text-white"
              @click.stop="setCurrentPerson(person)"
              >{{ t("general.редактировать") }}</v-btn
            >
            <v-btn
              color="#F44336"
              class="text-white"
              @click.stop="deletePerson(person)"
              >{{ t("general.удалить") }}</v-btn
            >
          </div>
        </div>
        {{ person[`biography_${locale}`] }}</v-banner-text
      ></v-banner
    >
  </div>
  <div class="flex-box-center" v-else>
    <p class="body1">{{ t("errors.Список_пуст_Добавьте_сотрудника") }}</p>
  </div>
  <EmployeeModal v-model="openModal" :editPerson="currentPerson" />
</template>

<style scoped>
  .news-item-img {
    width: 20%;
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>
