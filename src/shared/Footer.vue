<script setup>
  import FeedbackModal from "@/components/FeedbackModal.vue";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
  const openFeedbackModal = ref(false);

  function setFeedbackModal(value) {
    openFeedbackModal.value = value;
  }
</script>

<template>
  <footer>
    <div class="flex-box-center">
      <div class="footer-content flex-box">
        <div>
          <p class="title" style="margin-bottom: 24px">{{ t("Наш адрес") }}</p>
          <p class="body1" style="color: #c5c5c5">
            {{
              t(
                "Консалтинговая компания «Amanat Advisory» Оставайтесь на связи."
              )
            }}<br />
            {{ t("ул. Койбагарова, Бишкек, Кыргызстан") }}
          </p>
        </div>
        <div>
          <p class="title" style="margin-bottom: 24px">
            {{ t("Мы в соцсетях") }}
          </p>
          <p class="body1" style="color: #c5c5c5">
            {{ t("Тел +996555081071") }}<br />
            {{ t("Эл почта", { email: "madalieva@amanatadvisory.kg" }) }}
          </p>
          <div class="social-media-wrapper flex-box">
            <div class="icon-wrapper">
              <img
                class="social-media-icon"
                src="/assets/email.png"
                alt="gmail icon"
                @click="setFeedbackModal(true)"
              />
            </div>
            <a
              class="icon-wrapper"
              href="https://t.me/akylmanchik"
              target="_blank"
            >
              <img
                class="social-media-icon"
                src="/assets/telegram.png"
                alt="gmail icon"
            /></a>
            <a
              class="icon-wrapper"
              href="https://api.whatsapp.com/send?phone=996555081071&text=&source=&data=&app_absent="
              target="_blank"
            >
              <img
                class="social-media-icon"
                src="/assets/whatsapp.png"
                alt="gmail icon"
            /></a>
            <a
              class="icon-wrapper"
              href="https://join.skype.com/invite/JV8HXoJwx8Ud"
              target="_blank"
            >
              <img
                class="social-media-icon"
                src="/assets/skype.png"
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
    border-bottom: 30px solid #3d4646;
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
  .social-media-wrapper {
    gap: 20px;
    margin-top: 20px;
  }
  .icon-wrapper {
    width: 40px;
    height: 40px;
    padding: 8px;
    cursor: pointer;
    background: #61a375;
    border: 1px solid #61a375;
  }
  .icon-wrapper:hover {
    background-color: transparent;
  }
  .icon-wrapper:hover .social-media-icon {
    filter: invert(59%) sepia(47%) saturate(340%) hue-rotate(86deg)
      brightness(90%) contrast(84%);
  }
  .social-media-icon {
    width: 24px;
    height: 24px;
    filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(285deg)
      brightness(113%) contrast(104%);
  }
</style>
