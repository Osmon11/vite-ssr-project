<script setup>
  import FeedbackModal from "@/components/FeedbackModal.vue";
  import { useRoute, useRouter } from "vue-router";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";

  const props = defineProps(["scrollIntoHandler"]);
  const { t } = useI18n();
  const { name } = useRoute();
  const navigate = useRouter();
  const openFeedbackModal = ref(false);

  function setFeedbackModal(value) {
    openFeedbackModal.value = value;
  }
  function navigationHandler(path, name, params, scrollInto = false) {
    if (scrollInto) {
      props.scrollIntoHandler(path);
    } else {
      navigate.push({ name, params });
    }
  }
</script>

<template>
  <footer>
    <div class="flex-box-center">
      <div class="footer-content flex-box">
        <div class="flex-box column" style="gap: 20px">
          <img src="/AA_LOGO.png" style="width: 64px" />
          <div>
            <p class="body1 text-footer mb-3">
              {{ t("Консалтинговые услуги по Исламским Финансам.") }}
            </p>
            <div>
              <div class="flex-box" style="gap: 10px">
                <!-- <div class="icon-wrapper">
                  <img
                    :draggable="false"
                    class="social-media-icon"
                    src="/assets/gmail.png"
                    alt="gmail icon"
                    @click="setFeedbackModal(true)"
                  />
                </div> -->
                <a
                  class="body1 text-footer"
                  href="mailto:madalieva@amanatadvisory.kg"
                  >madalieva@amanatadvisory.kg</a
                >
              </div>
              <a class="body1 text-footer" href="tel:996555081071"
                >+996555081071</a
              >
            </div>
          </div>
        </div>
        <div class="column">
          <p
            class="nav-item text-footer"
            @click="
              navigationHandler(
                name === 'home' ? 'about_us' : '/',
                'home',
                { section: 'about_us' },
                name === 'home'
              )
            "
          >
            {{ t("general['О компании']") }}
          </p>
          <p
            v-if="name !== 'our-news'"
            class="nav-item text-footer"
            @click="navigationHandler('/our-news', 'our-news')"
          >
            {{ t("Новости") }}
          </p>
          <p
            class="nav-item text-footer"
            @click="
              navigationHandler(
                name === 'home' ? 'our_services' : '/',
                'home',
                { section: 'our_services' },
                name === 'home'
              )
            "
          >
            {{ t("НАШИ УСЛУГИ") }}
          </p>
          <p
            v-if="name !== 'shariah-board'"
            class="nav-item text-footer"
            @click="navigationHandler('/shariah-board', 'shariah-board')"
          >
            {{ t("ШАРИАТСКИЙ СОВЕТ") }}
          </p>
        </div>
        <div class="column">
          <p class="title" style="padding-bottom: 0">
            {{ t("general.ПРИСОЕДИНЯЙТЕСЬ") }}
          </p>
          <div class="social-media-wrapper flex-box">
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
      {{ t("© 2022 Amanat Advisory. Все права защищены.") }}
    </p>
  </footer>
  <FeedbackModal :open="openFeedbackModal" :onClose="setFeedbackModal" />
</template>

<style scoped>
  footer {
    padding: 70px 0px 35px;
    background: linear-gradient(to bottom, #7e8e8e, #4b5757);
  }
  .footer-content {
    width: 100%;
    max-width: 1250px;
    align-items: start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5%;
  }
  .title {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #c5c5c5;
    text-transform: uppercase;
  }

  .text-footer {
    color: #c5c5c5;
  }
  .column {
    width: 28%;
  }

  @media (min-width: 0px) and (max-width: 600px) {
    .footer-content {
      padding: 0px 15px;
      gap: 20px;
    }
    .column {
      width: fit-content;
    }
  }
  @media (min-width: 600px) and (max-width: 960px) {
    .footer-content {
      padding: 0px 15px;
      gap: 20px;
    }
    .column {
      width: fit-content;
    }
  }
</style>
