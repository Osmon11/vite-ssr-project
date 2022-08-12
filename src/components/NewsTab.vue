<script setup>
  import { onMounted, ref } from "vue";

  import EditorModal from "@/components/NewsModal.vue";
  import { useStore } from "../store";
  import { useI18n } from "vue-i18n";

  const store = useStore();
  const { t, locale } = useI18n();
  const openModal = ref(false);
  const currentNews = ref(null);

  onMounted(() => {
    store.getNewsFeed();
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
      message: t("questions.Подтверждаете_удаление_новостя"),
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
    <p class="title">{{ t("НОВОСТИ") }}</p>
    <v-btn color="#61a375" class="text-white" @click="setModal(true)">{{
      t("general.добавить_новость")
    }}</v-btn>
  </div>
  <v-expansion-panels style="margin-bottom: 20px" v-if="store.newsFeed.length">
    <v-expansion-panel v-for="newsItem in store.newsFeed" :key="newsItem._id">
      <v-expansion-panel-title>
        <div class="flex-box-between" style="width: 100%; padding-right: 20px">
          <p class="subtitle">{{ newsItem[`title_${locale}`] }}</p>
          <div class="flex-box" style="gap: 20px">
            <v-btn
              color="#61a375"
              class="text-white"
              @click.stop="setCurrentNews(newsItem)"
              >{{ t("general.редактировать") }}</v-btn
            >
            <v-btn
              color="#F44336"
              class="text-white"
              @click.stop="deleteNews(newsItem)"
              >{{ t("general.удалить") }}</v-btn
            >
          </div>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div style="padding: 16px">
          <div class="flex-box" style="align-items: flex-start">
            <img
              class="news-item-img"
              :src="newsItem.imageUrl"
              :alt="newsItem.imageName"
            />
            <p style="display: inline">{{ newsItem[`subtitle_${locale}`] }}</p>
          </div>
          <div class="content" v-html="newsItem[`content_${locale}`]"></div>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <div class="flex-box-center" v-else>
    <p class="body1">{{ t("errors.Новостей_пока_нет_Добавьте_новость") }}</p>
  </div>
  <EditorModal
    :open="openModal"
    :onClose="onCloseModal"
    :editNews="currentNews"
  />
</template>

<style scoped>
  .news-item-img {
    width: 40%;
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>
