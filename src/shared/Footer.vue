<script setup>
  import FeedbackModal from "@/components/FeedbackModal.vue";
  import { useRoute, useRouter } from "vue-router";
  import { ref, computed } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";

  const props = defineProps(["scrollIntoHandler"]);
  const { t } = useI18n();
  const { name } = useRoute();
  const navigate = useRouter();
  const openFeedbackModal = ref(false);
  const xs = computed(() => window.innerWidth <= 600);
  const sm = computed(() => window.innerWidth <= 960);

  function setFeedbackModal(value) {
    openFeedbackModal.value = value;
  }
  function navigationHandler(path, name, query, scrollInto = false) {
    if (scrollInto) {
      props.scrollIntoHandler(path);
    } else {
      navigate.push({ name, query });
    }
  }
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const phoneNumber = import.meta.env.VITE_PHONE;
  const emailAddress = import.meta.env.VITE_EMAIL;
</script>

<template>
  <footer>
    <div class="floating-container">
      <div class="floating-button" @click="scrollToTop">
        <v-icon icon="$chevronUp"></v-icon>
      </div>
      <div class="element-container">
        <span class="float-element flex-box-center tooltip-left"
          ><a href="https://www.facebook.com/amanatadvisory.kg" target="_blank"
            ><img
              :draggable="false"
              class="social-media-icon active"
              src="/assets/facebook-colorful.svg"
              alt="facebook icon" /></a
        ></span>
        <span class="float-element flex-box-center"
          ><a href="https://wa.me/996508081071" target="_blank"
            ><img
              :draggable="false"
              class="social-media-icon active"
              src="/assets/whatsapp-colorful.svg"
              alt="whatsapp icon" /></a
        ></span>
        <span class="float-element flex-box-center"
          ><a href="https://t.me/+996555081071" target="_blank"
            ><img
              :draggable="false"
              class="social-media-icon active"
              src="/assets/telegram-colorful.svg"
              alt="telegram icon" /></a
        ></span>
        <span class="float-element flex-box-center"
          ><a
            href="https://www.instagram.com/amanatadvisory.kg/"
            target="_blank"
            ><img
              :draggable="false"
              class="social-media-icon active"
              src="/assets/instagram-round-color-icon.svg"
              alt="instagram icon" /></a
        ></span>
        <span class="float-element flex-box-center tooltip-left"
          ><a :href="`tel:${phoneNumber}`"
            ><img
              class="icon-color-white contact-icon"
              src="/assets/tel.svg"
              alt="phone icon" /></a
        ></span>
      </div>
    </div>
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
                alt="telegram icon" />
              <img
                :draggable="false"
                class="social-media-icon active"
                src="/assets/telegram-colorful.svg"
                alt="telegram icon"
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
                alt="instagram icon" /><img
                :draggable="false"
                class="social-media-icon active"
                src="/assets/instagram-colorful.svg"
                alt="instagram icon"
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
                alt="facebook icon" /><img
                :draggable="false"
                class="social-media-icon active"
                src="/assets/facebook-colorful.svg"
                alt="facebook icon"
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
                alt="whatsapp icon" /><img
                :draggable="false"
                class="social-media-icon active"
                src="/assets/whatsapp-colorful.svg"
                alt="whatsapp icon"
            /></a>
          </div>
          <div class="flex-box" style="gap: 10px; margin-top: 15px">
            <img
              class="icon-color-white contact-icon"
              src="/assets/adress.svg"
              alt="adress icon"
            />
            <p class="text-footer">
              {{ t("Адрес")
              }}<a
                :href="`http://maps.google.com/?q=${t('текс-адреса')}`"
                target="_blank"
                rel="noopener noreferrer"
                >{{ t("текс-адреса") }}</a
              >
            </p>
          </div>
          <div class="flex-box" style="gap: 10px">
            <img
              class="icon-color-white contact-icon"
              src="/assets/tel.svg"
              alt="phone icon"
            />
            <p class="text-footer">
              {{ t("Телефон")
              }}<a :href="`tel:${phoneNumber}`">{{ `+${phoneNumber}` }}</a>
            </p>
          </div>
          <div class="flex-box" style="gap: 10px">
            <img
              class="icon-color-white contact-icon"
              src="/assets/email.svg"
              alt="email icon"
            />
            <p class="text-footer">
              {{ t("Адрес")
              }}<a
                :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`"
                target="_blank"
                rel="noopener noreferrer"
                >{{ emailAddress }}</a
              >
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
            class="nav-item text-footer"
            @click="navigationHandler('/our-news', 'our-news')"
          >
            {{ t("Новости") }}
          </p>
        </div>
        <div class="column">
          <p class="title">{{ t("general.Штат") }}</p>
          <p
            class="nav-item text-footer"
            @click="navigationHandler('/shariah-board', 'shariah-board')"
          >
            {{ t("ШАРИАТСКИЙ СОВЕТ") }}
          </p>
          <!-- <p
            v-if="name !== 'management'"
            class="nav-item text-footer"
            @click="navigationHandler('/management', 'management')"
          >
            {{ t("general.Менеджмент") }}
          </p> -->
        </div>
        <div class="column">
          <v-btn
            color="#61a375"
            class="text-white"
            @click="setFeedbackModal(true)"
            :style="{ marginTop: xs || sm ? 40 : 0 }"
          >
            {{ t("general['свяжитесь с нами']") }}
          </v-btn>
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
  <FeedbackModal v-model="openFeedbackModal" />
</template>

<style scoped>
  footer {
    padding: 70px 0px 35px;
    background: #4b5757;
  }
  .footer-content {
    width: 100%;
    max-width: 1250px;
    align-items: start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 50px;
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
  .text-footer a {
    color: #ffffff;
    font-weight: 500;
  }
  .contact-icon {
    width: 14px;
    height: 14px;
  }
  .column {
    width: fit-content;
  }
  @media (min-width: 0px) and (max-width: 600px) {
    .footer-content {
      padding: 0px 15px;
      gap: 20px;
      justify-content: flex-start;
    }
    .column {
      width: fit-content;
      min-width: 40%;
    }
  }
  @media (min-width: 600px) and (max-width: 960px) {
    .footer-content {
      padding: 0px 15px;
      gap: 20px;
      justify-content: flex-start;
    }
    .column {
      width: fit-content;
      min-width: calc(25% - 50px);
    }
  }
</style>
