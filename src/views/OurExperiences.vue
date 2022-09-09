<script setup>
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
</script>

<template>
  <Header />
  <div
    class="flex-box-center"
    style="
      min-height: calc(100vh - 100px);
      align-items: flex-start;
      margin: 50px 0px;
    "
  >
    <main>
      <div class="column-wrap">
        <div class="flex-box-center" style="margin-bottom: 40px">
          <h2 class="title divider">{{ t("НАШ ОПЫТ") }}</h2>
        </div>
        <p class="body1" style="margin-bottom: 20px; padding: 16px">
          {{ t("experiences") }}
        </p>
      </div>
    </main>
  </div>
  <Footer />
</template>
