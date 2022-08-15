<script setup>
  import FeedbackModal from "@/components/FeedbackModal.vue";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";

  const props = defineProps(["scrollIntoHandler"]);
  const { t } = useI18n();
  const { name } = useRoute();
  const openFeedbackModal = ref(false);

  function setFeedbackModal(value) {
    openFeedbackModal.value = value;
  }
</script>

<template>
  <footer>
    <div class="flex-box-center">
      <div class="footer-content flex-box" style="gap: 5%">
        <div class="flex-box" style="width: 33%; gap: 20px">
          <img src="/AA_LOGO.png" style="width: 64px" />
          <div>
            <p class="body1 text-footer mb-3">
              {{ t("Консалтинговые услуги по Исламским Финансам.") }}
            </p>
            <div>
              <a class="body1 text-footer" href="tel:996555081071"
                >+996555081071</a
              ><br />
              <a
                class="body1 text-footer"
                href="mailto:madalieva@amanatadvisory.kg"
                >madalieva@amanatadvisory.kg</a
              >
            </div>
          </div>
        </div>
        <div style="width: 33%">
          <p class="title">
            {{ t("general['О компании']") }}
          </p>
          <router-link class="nav-item text-footer" to="/our-news">{{
            t("НОВОСТИ")
          }}</router-link>
          <p
            class="nav-item text-footer"
            @click="props.scrollIntoHandler('our_services')"
            v-if="name === 'home'"
          >
            {{ t("НАШИ УСЛУГИ") }}
          </p>
          <router-link class="nav-item text-footer" to="/shariah-board">{{
            t("ШАРИАТСКИЙ СОВЕТ")
          }}</router-link>
        </div>
        <div style="width: 33%">
          <p class="title">
            {{ t("general.ПРИСОЕДИНЯЙТЕСЬ") }}
          </p>
          <div class="social-media-wrapper flex-box">
            <div class="icon-wrapper">
              <img
                :draggable="false"
                class="social-media-icon"
                src="/assets/gmail.png"
                alt="gmail icon"
                @click="setFeedbackModal(true)"
              />
            </div>
            <a
              class="icon-wrapper"
              href="https://t.me/+996555081071"
              target="_blank"
            >
              <img
                :draggable="false"
                class="social-media-icon"
                src="/assets/telegram.jpg"
                style="border-radius: 50%"
                alt="gmail icon"
            /></a>
            <a
              class="icon-wrapper"
              href="https://www.instagram.com/amanatadvisory.kg/"
              target="_blank"
            >
              <img
                :draggable="false"
                class="social-media-icon"
                src="/assets/instagram.jpg"
                style="border-radius: 50%"
                alt="gmail icon"
            /></a>
            <a
              class="icon-wrapper"
              href="https://www.facebook.com/amanatadvisory.kg"
              target="_blank"
            >
              <img
                :draggable="false"
                class="social-media-icon"
                src="/assets/facebook.jpg"
                style="border-radius: 50%"
                alt="gmail icon"
            /></a>
          </div>
        </div>
      </div>
    </div>
    <p
      class="text-caption text-center"
      style="width: 100%; color: #c5c5c5; margin-top: 37px"
    >
      {{ t("© 2022 Amanat Advisory. Все права защищены. All rights reserved") }}
    </p>
  </footer>
  <FeedbackModal :open="openFeedbackModal" :onClose="setFeedbackModal" />
</template>

<style scoped>
  footer {
    padding: 95px 0px 37px;
    background: linear-gradient(to bottom, #7e8e8e, #4b5757);
  }
  .footer-content {
    width: 100%;
    max-width: 1250px;
    align-items: start;
    gap: 30px;
  }
  .title {
    font-family: "Raleway", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #c5c5c5;
    text-transform: uppercase;
  }

  .text-footer {
    color: #c5c5c5;
  }
</style>
