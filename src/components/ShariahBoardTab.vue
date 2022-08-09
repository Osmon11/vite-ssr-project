<script setup>
  import { onMounted, ref } from "vue";

  import { useStore } from "../store";
  import PersonModal from "./PersonModal.vue";

  const store = useStore();
  const openModal = ref(false);
  const currentPerson = ref(null);

  onMounted(() => {
    store.getShariahBoard({}, (success) => {});
  });

  function setModal(value) {
    openModal.value = value;
  }
  function setCurrentPerson(news) {
    currentPerson.value = news;
    openModal.value = true;
  }
  function deleteNews(news) {
    store.setPromp({
      message: "Подтверждаете удаление новостя ?",
      confirm() {
        store.deleteEmployee({ id: news._id });
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
          <v-img :src="person.avatar" :alt="person.fullname"></v-img></v-avatar
      ></template>
      <v-banner-text
        ><p class="title" style="font-size: 24px">{{ person.fullname }}</p>
        {{ person.biography }}</v-banner-text
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
