<script setup>
  import { onMounted, ref } from "vue";

  import EditorModal from "@/components/NewsModal.vue";
  import appStore from "../store";
  import { useI18n } from "vue-i18n";

  const store = appStore.useStore();
  const { t, locale } = useI18n();
  const openModal = ref(false);
  const currentNews = ref(null);

  onMounted(() => {
    store.getNewsFeed();
  });

  function setCurrentNews(news) {
    currentNews.value = news;
    setModal(true);
  }
  function setModal(value) {
    openModal.value = value;
    if (!value) {
      currentNews.value = null;
    }
  }
  function deleteNews(news) {
    store.setPromp({
      message: t(
        "lang-241de744-3917-4521-b15d-81aba17a4857"
      ),
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
  <div
    class="flex-box-between"
    style="margin-bottom: 16px"
  >
    <p class="title">
      {{
        t(
          "lang-43551998-d49d-41a1-8287-25a880594e94"
        )
      }}
    </p>
    <v-btn
      color="#61a375"
      class="text-white"
      @click="setModal(true)"
      >{{
        t(
          "lang-c7c4caaa-a029-4b61-9837-ee2f3711a07a"
        )
      }}</v-btn
    >
  </div>
  <v-expansion-panels
    style="margin-bottom: 20px"
    v-if="store.newsFeed.length"
  >
    <v-expansion-panel
      v-for="newsItem in store.newsFeed"
      :key="newsItem._id"
    >
      <v-expansion-panel-title>
        <div
          class="flex-box-between"
          style="width: 100%; padding-right: 20px"
        >
          <p class="subtitle">
            {{ newsItem[`title_${locale}`] }}
          </p>
          <div
            class="flex-box"
            style="gap: 20px"
          >
            <v-btn
              color="#61a375"
              class="text-white"
              @click.stop="
                setCurrentNews(newsItem)
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
              @click.stop="deleteNews(newsItem)"
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
            class="flex-box"
            style="align-items: flex-start"
          >
            <img
              class="news-item-img"
              :src="`${store.backendUrl}${newsItem.imageUrl}`"
              :alt="newsItem.imageName"
            />
            <p style="display: inline">
              {{ newsItem[`subtitle_${locale}`] }}
            </p>
          </div>
          <div
            class="content"
            v-html="newsItem[`content_${locale}`]"
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
          "lang-2c5d8a3a-7aa6-4e97-9028-fc8c18aab920"
        )
      }}
    </p>
  </div>
  <EditorModal
    v-model="openModal"
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
