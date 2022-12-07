<template>
  <DataContainer
    :noData="!Boolean(newsFeed.length)"
    noDataText="lang-2c5d8a3a-7aa6-4e97-9028-fc8c18aab920"
  >
    <v-expansion-panels
      style="margin-bottom: 20px"
      v-if="newsFeed.length"
    >
      <v-expansion-panel
        v-for="news in newsFeed"
        :key="news._id"
      >
        <v-expansion-panel-title>
          <div
            class="flex-box-between"
            style="
              width: 100%;
              padding-right: 20px;
            "
          >
            <p class="subtitle">
              {{
                news[
                  `title_${locale}` as keyof typeof news
                ]
              }}
            </p>
            <div
              class="flex-box"
              style="gap: 20px"
            >
              <v-btn
                color="#61a375"
                class="text-white"
                @click.stop="onEditClick(news)"
                >{{
                  $t(
                    "lang-37a7870d-ae54-4fe1-8767-fa261b98007e"
                  )
                }}</v-btn
              >
              <v-btn
                color="#F44336"
                class="text-white"
                @click.stop="onDeleteClick(news)"
                >{{
                  $t(
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
                :src="`${apiUrl}${news.imageUrl}`"
                :alt="news.imageName"
              />
              <p style="display: inline">
                {{
                  news[
                    `subtitle_${locale}` as keyof typeof news
                  ]
                }}
              </p>
            </div>
            <div
              class="content"
              v-html="news[`content_${locale}` as keyof typeof news]"
            ></div>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </DataContainer>
</template>

<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import { computed } from "vue";

  import DataContainer from "@/containers/DataContainer.vue";

  import { INews } from "@/api/index.types";
  import { apiUrl } from "@/utils/constants";

  import { useNotification } from "@/utils/useNotification";
  import { useNewsStore } from "@/stores/news";

  const emit = defineEmits(["edit-click"]);

  const { locale } = useI18n();
  const { setPromp } = useNotification();

  const newsStore = useNewsStore();

  const newsFeed = computed(
    () => newsStore.getNewsFeed
  );

  function onEditClick(news: INews) {
    newsStore.setForm(news);
    emit("edit-click");
  }
  function onDeleteClick(news: INews) {
    setPromp({
      message:
        "lang-241de744-3917-4521-b15d-81aba17a4857",
      confirm() {
        newsStore.delete(news._id);
      },
    });
  }
</script>

<style scoped>
  .news-item-img {
    width: 40%;
    margin-right: 20px;
    margin-bottom: 20px;
  }
</style>
