<script setup>
  import Header from "@/shared/Header.vue";
  import Footer from "@/shared/Footer.vue";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
</script>

<template>
  <Header />
  <div class="flex-box-center" style="margin: 50px 0px">
    <main>
      <div class="column-wrap">
        <div class="flex-box-center" style="margin-bottom: 40px">
          <h3 class="title divider">{{ t("НАШ ОПЫТ") }}</h3>
        </div>
        <p class="body1" style="margin-bottom: 20px">
          {{ t("experiences") }}
        </p>
      </div>
    </main>
  </div>
  <Footer />
</template>
