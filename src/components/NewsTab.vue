<script setup>
  import { ref } from "vue";

  import EditorModal from "@/components/EditorModal.vue";
  import { useStore } from "../store";

  const store = useStore();
  const openModal = ref(false);

  function setModal(value) {
    openModal.value = value;
  }
</script>

<template>
  <div class="flex-box-between" style="margin-bottom: 16px">
    <p class="title">Список новостей</p>
    <v-btn color="#61a375" class="text-white" @click="setModal(true)"
      >Новая новость</v-btn
    >
  </div>
  <v-expansion-panels style="margin-bottom: 20px" v-if="store.newsFeed.length">
    <v-expansion-panel v-for="newsItem in store.newsFeed" :key="newsItem.id">
      <v-expansion-panel-title>
        {{ newsItem.title }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div style="padding: 16px" v-html="item.details"></div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <div class="flex-box-center" v-else>
    <p class="body1">Новостей пока нет. Создайте новость</p>
  </div>
  <EditorModal :open="openModal" :onClose="setModal" />
</template>
