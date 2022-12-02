<template>
  <Header />
  <div class="flex-box-center py-5 px-5">
    <!-- <main>
      <p
        class="title divider text-center full-width my-5"
      >
        {{ store.currentNews[`title_${locale}`] }}
      </p>
      <p class="text-caption">
        {{
          store.currentNews.createdAt.split(
            " "
          )[0]
        }}
      </p>
      <img
        :src="`${apiUrl}${store.currentNews.imageUrl}`"
        :alt="store.currentNews.imageName"
      />
      <p class="text-subtitle py-5">
        {{
          store.currentNews[`subtitle_${locale}`]
        }}
      </p>
      <div
        class="content"
        v-html="
          store.currentNews[`content_${locale}`]
        "
      ></div>
    </main> -->
  </div>
  <Footer />
</template>

<script lang="ts" setup>
  // import { useI18n } from "vue-i18n";
  // import { apiUrl } from "@/utils/constants";

  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
</script>
