<script setup>
  import { useStore } from "../store";
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  import { useI18n } from "vue-i18n";

  const store = useStore();
  const { locale } = useI18n();
</script>

<template>
  <Header />
  <div class="flex-box-center">
    <main style="min-height: 100vh">
      <p class="title py-5 mt-5 text-center" style="width: 100%">Сотрудники</p>
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
            ><p class="title" style="font-size: 24px">
              {{ person[`fullname_${locale}`] }}
            </p>
            {{ person[`biography_${locale}`] }}</v-banner-text
          ></v-banner
        >
      </div>
    </main>
  </div>
  <Footer />
</template>
