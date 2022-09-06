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

  const phoneNumber = import.meta.env.VITE_PHONE;
  const emailAddress = import.meta.env.VITE_EMAIL;
</script>

<template>
  <footer>
    <div class="flex-box-center">
      <div class="footer-content flex-box">
        <div class="column">
          <p class="title">{{ t("general['свяжитесь с нами']") }}</p>
          <div class="social-media-wrapper flex-box">
            <a
              class="icon-wrapper"
              href="https://t.me/+996555081071"
              target="_blank"
            >
              <img
                :draggable="false"
                class="social-media-icon icon-color-white default"
                src="/assets/telegram-white.svg"
                alt="gmail icon" />
              <img
                :draggable="false"
                class="social-media-icon active"
                src="/assets/telegram-colorful.svg"
                alt="gmail icon"
            /></a>
            <a
              class="icon-wrapper"
              href="https://www.instagram.com/amanatadvisory.kg/"
              target="_blank"
            >
              <img
                :draggable="false"
                class="social-media-icon icon-color-white default"
                src="/assets/instagram-white.svg"
                alt="gmail icon" /><img
                :draggable="false"
                class="social-media-icon active"
                src="/assets/instagram-colorful.svg"
                alt="gmail icon"
            /></a>
            <a
              class="icon-wrapper"
              href="https://www.facebook.com/amanatadvisory.kg"
              target="_blank"
            >
              <img
                :draggable="false"
                class="social-media-icon icon-color-white default"
                src="/assets/facebook-white.svg"
                alt="gmail icon" /><img
                :draggable="false"
                class="social-media-icon active"
                src="/assets/facebook-colorful.svg"
                alt="gmail icon"
            /></a>
            <a
              class="icon-wrapper"
              href="https://wa.me/996508081071"
              target="_blank"
            >
              <img
                :draggable="false"
                class="social-media-icon icon-color-white default"
                src="/assets/whatsapp-white.svg"
                alt="gmail icon" /><img
                :draggable="false"
                class="social-media-icon active"
                src="/assets/whatsapp-colorful.svg"
                alt="gmail icon"
            /></a>
          </div>
          <div class="flex-box" style="gap: 10px; margin-top: 15px">
            <img
              class="icon-color-white contact-icon"
              src="/assets/adress.svg"
            />
            <p class="text-footer">
              {{ t("Адрес") }}<span>{{ t("текс-адреса") }}</span>
            </p>
          </div>
          <div class="flex-box" style="gap: 10px">
            <img class="icon-color-white contact-icon" src="/assets/tel.svg" />
            <p class="text-footer">
              {{ t("Телефон") }}<span>{{ `+${phoneNumber}` }}</span>
            </p>
          </div>
          <div class="flex-box" style="gap: 10px">
            <img
              class="icon-color-white contact-icon"
              src="/assets/email.svg"
            />
            <p class="text-footer">
              {{ t("Адрес") }}<span>{{ emailAddress }}</span>
            </p>
          </div>
        </div>
        <div class="column">
          <p class="title">{{ t("Главная") }}</p>
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
            v-if="name !== 'our-news'"
            class="nav-item text-footer"
            @click="navigationHandler('/our-news', 'our-news')"
          >
            {{ t("Новости") }}
          </p>
        </div>
        <div class="column">
          <p class="title">{{ t("general.Штат") }}</p>
          <p
            v-if="name !== 'shariah-board'"
            class="nav-item text-footer"
            @click="navigationHandler('/shariah-board', 'shariah-board')"
          >
            {{ t("ШАРИАТСКИЙ СОВЕТ") }}
          </p>
          <p
            v-if="name !== 'management'"
            class="nav-item text-footer"
            @click="navigationHandler('/management', 'management')"
          >
            {{ t("general.Менеджмент") }}
          </p>
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
    color: #ffffff;
    text-transform: uppercase;
  }

  .text-footer {
    width: fit-content;
    color: #ffffff;
    font-size: 12px;
    font-weight: 300;
    line-height: 20px;
    padding: 0px;
  }
  .text-footer span {
    font-weight: 500;
  }
  .column {
    width: 28%;
  }
  .contact-icon {
    width: 14px;
    height: 14px;
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
