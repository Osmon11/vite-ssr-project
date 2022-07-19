<script setup>
  import { onMounted, ref } from "vue";
  import { QuillEditor } from "@vueup/vue-quill";

  import EditorModal from "@/components/EditorModal.vue";
  import { useStore } from "../store";

  const store = useStore();
  const openModal = ref(false);
  const currentNews = ref(null);

  onMounted(() => {
    store.getNewsFeed({}, (success) => {});
  });

  function setModal(value) {
    openModal.value = value;
  }
  function setCurrentNews(news) {
    currentNews.value = news;
    openModal.value = true;
  }
  function deleteNews(news) {
    store.setPromp({
      message: "Подтверждаете удаление новостя ?",
      confirm() {
        store.deleteNews({ id: news._id });
      },
    });
  }
  function onCloseModal(value) {
    setModal(value);
    if (currentNews) {
      currentNews.value = null;
    }
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
    <v-expansion-panel v-for="newsItem in store.newsFeed" :key="newsItem._id">
      <v-expansion-panel-title>
        <p class="subtitle">{{ newsItem.title }}</p>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div style="padding: 16px">
          <div class="flex-box" style="align-items: flex-start">
            <img
              class="news-item-img"
              :src="newsItem.imageUrl"
              :alt="newsItem.imageName"
            />
            <p style="display: inline">{{ newsItem.subtitle }}</p>
          </div>
          <QuillEditor
            theme="bubble"
            :readOnly="true"
            :content="JSON.parse(newsItem.content)"
          />
          <div class="flex-box-center">
            <div class="flex-box" style="gap: 20px">
              <v-btn
                color="#61a375"
                class="text-white"
                @click="setCurrentNews(newsItem)"
                >Редактировать</v-btn
              >
              <v-btn
                color="red"
                class="text-white"
                @click="deleteNews(newsItem)"
                >Удалить</v-btn
              >
            </div>
          </div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <div class="flex-box-center" v-else>
    <p class="body1">Новостей пока нет. Создайте новость</p>
  </div>
  <EditorModal
    :open="openModal"
    :onClose="onCloseModal"
    :editNews="currentNews"
  />
</template>

<style scoped>
  .news-item-img {
    width: 200px;
    height: 120px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>
