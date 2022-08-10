<script setup>
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";

  import { useStore } from "../store";
  import PersonModal from "./PersonModal.vue";

  const store = useStore();
  const { locale } = useI18n();
  const openModal = ref(false);
  const currentPerson = ref(null);

  onMounted(() => {
    store.getShariahBoard({}, (success) => {});
  });

  function setModal(value) {
    openModal.value = value;
  }
  function setCurrentPerson(person) {
    currentPerson.value = person;
    openModal.value = true;
  }
  function deletePerson(person) {
    store.setPromp({
      message: "Подтверждаете удаление сотрудника ?",
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
    <p class="title">Список сотрудников</p>
    <v-btn color="#61a375" class="text-white" @click="setModal(true)"
      >Добавить сотрудника</v-btn
    >
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
            :src="person.avatar"
            :alt="person[`fullname_${locale}`]"
          ></v-img></v-avatar
      ></template>
      <v-banner-text
        ><div class="flex-box-between" style="width: 100%">
          <p class="title" style="font-size: 24px">
            {{ person[`fullname_${locale}`] }}
          </p>
          <div class="flex-box" style="gap: 20px">
            <v-btn
              color="#61a375"
              class="text-white"
              @click.stop="setCurrentPerson(person)"
              >Редактировать</v-btn
            >
            <v-btn
              color="red"
              class="text-white"
              @click.stop="deletePerson(person)"
              >Удалить</v-btn
            >
          </div>
        </div>
        {{ person[`biography_${locale}`] }}</v-banner-text
      ></v-banner
    >
  </div>
  <div class="flex-box-center" v-else>
    <p class="body1">Список пуст! Добавьте сотрудника.</p>
  </div>
  <PersonModal
    :open="openModal"
    :onClose="onCloseModal"
    :editPerson="currentPerson"
  />
</template>

<style scoped>
  .news-item-img {
    width: 20%;
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>
