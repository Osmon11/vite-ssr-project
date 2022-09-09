<script setup>
  import FeedbackModal from "@/components/FeedbackModal.vue";
  import { computed, onMounted, onUnmounted } from "@vue/runtime-core";
  import { useRoute, useRouter } from "vue-router";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";
  import cookie_js from "cookie_js";

  import Select from "@/shared/Select.vue";
  import appStore from "../store";

  const props = defineProps(["scrollIntoHandler"]);

  const store = appStore.useStore();
  const { t, locale } = useI18n();
  const navigate = useRouter();
  const { name } = useRoute();
  const homePageNavigation = [
    { label: "О НАС", to: "/", key: "about_us", name: "home" },
    { label: "Новости", to: "our-news", name: "our-news" },
    { label: "ШАРИАТСКИЙ СОВЕТ", to: "/shariah-board", name: "shariah-board" },
    {
      label: "НАШ ОПЫТ",
      to: "/",
      key: "our_experiences",
      name: "home",
    },
    { label: "НАШИ УСЛУГИ", to: "/", key: "our_services", name: "home" },
    { label: "Контакты", to: "/", key: "contacts", name: "home" },
  ];
  const token = cookie_js.get(import.meta.env.VITE_TOKEN_KEY);
  const lang = ref("en");
  const isActive = ref(name === "home");
  const isSticky = ref(name === "home");
  const position = ref("static");
  const drawer = ref(false);
  const openFeedbackModal = ref(false);
  const xs = computed(() => window.innerWidth <= 600);
  const sm = computed(() => window.innerWidth <= 960);
  const md = computed(() => window.innerWidth <= 1264);

  function setFeedbackModal(value) {
    openFeedbackModal.value = value;
    drawer.value = !drawer.value;
  }
  function handleScroll() {
    if (name === "home") {
      isActive.value = window.scrollY === 0;
      isSticky.value = window.scrollY < window.innerHeight - 50;
    }
  }
  function logoClick() {
    if (name === "home") {
      props.scrollIntoHandler("top");
    } else {
      navigate.push("/");
    }
  }
  function navHandler(item) {
    if (item.key && name === "home") {
      props.scrollIntoHandler(item.key);
    } else if (item.key === "contacts") {
      window.scroll({ top: 1000000, behavior: "smooth" });
    } else {
      navigate.push({
        name: item.name,
        params: item.key ? { section: item.key } : null,
        path: item.to,
        query: item.key ? { section: item.key } : null,
      });
    }
    if (xs.value || sm.value) {
      drawer.value = !drawer.value;
    }
  }
  function mobileNavHandler(path) {
    navigate.push(path);
    drawer.value = !drawer.value;
  }
  function setLocale(value) {
    locale.value = value;
  }
  function logout() {
    store.setPromp({
      message: "Подвердите выход ?",
      confirm() {
        store.logout();
      },
    });
  }
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  const phoneNumber = import.meta.env.VITE_PHONE;
  const emailAddress = import.meta.env.VITE_EMAIL;
</script>

<template>
  <header :class="{ active: isActive, sticky: isSticky }">
    <div class="flex-box-center">
      <div class="row flex-box-between">
        <div class="logo-wrapper flex-box" @click="logoClick">
          <img class="logo" src="/assets/AA_LOGO.svg" alt="Amanat Advisory" />
          <p class="logo-text activeLogoText">Amanat Advisory LLC</p>
        </div>
        <v-navigation-drawer
          class="py-5 px-5"
          :style="{ width: 'fit-content', background: '#4b5757' }"
          v-model="drawer"
          location="right"
          bottom
          temporary
          v-if="xs || sm"
        >
          <Select
            :value="locale"
            @change="setLocale"
            :class="{ activeSelect: !isActive }"
            style="padding: 0px 10px"
          >
            <template #render-value>
              <div class="flex-box" style="gap: 8px; width: 42px">
                <img
                  :src="
                    locale === 'en'
                      ? '/assets/united-kingdom.svg'
                      : '/assets/russia.svg'
                  "
                  :alt="
                    locale === 'en' ? 'united kingdom flag' : 'russian flag'
                  "
                  style="width: 20px; height: 20px"
                />
                <p>{{ locale }}</p>
              </div></template
            >
            <template #items="{ handleChange }"
              ><div
                class="select-item"
                :class="{ active: 'en' === locale }"
                @click="handleChange('en')"
              >
                <div class="flex-box" style="gap: 8px; width: 42px">
                  <img
                    src="/assets/united-kingdom.svg"
                    alt="united kingdom flag"
                    style="width: 20px; height: 20px"
                  />
                  <p>en</p>
                </div>
              </div>
              <div
                class="select-item"
                :class="{ active: 'ru' === locale }"
                @click="handleChange('ru')"
              >
                <div class="flex-box" style="gap: 8px; width: 42px">
                  <img
                    src="/assets/russia.svg"
                    alt="russian flag"
                    style="width: 20px; height: 20px"
                  />
                  <p>ru</p>
                </div>
              </div>
            </template></Select
          >
          <v-list class="v-list">
            <v-list-subheader>{{ t("general.Навигация") }}</v-list-subheader>
            <v-list-item
              rounded="xl"
              v-for="item in homePageNavigation"
              :key="item.label"
              @click.stop="navHandler(item)"
              :style="{ textTransform: 'uppercase' }"
            >
              {{ t(item.label) }}
            </v-list-item>
            <v-list-item
              rounded="xl"
              @click="mobileNavHandler('/admin')"
              :style="{ textTransform: 'uppercase' }"
              v-if="token"
              >{{ t("Админ") }}</v-list-item
            >
          </v-list>
          <div style="padding: 0px 16px">
            <v-list-subheader>{{ t("Контакты") }}</v-list-subheader>
            <div class="flex-box" style="gap: 10px">
              <img
                class="contact-icon icon-color-white"
                src="/assets/adress.svg"
                alt="address icon"
              />
              <p class="text-header">
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
                class="contact-icon icon-color-white"
                src="/assets/tel.svg"
                alt="phone icon"
              />
              <p class="text-header">
                {{ t("Телефон")
                }}<a :href="`tel:${phoneNumber}`">{{ `+${phoneNumber}` }}</a>
              </p>
            </div>
            <div class="flex-box" style="gap: 10px">
              <img
                class="contact-icon icon-color-white"
                src="/assets/email.svg"
                alt="email icon"
              />
              <p class="text-header">
                {{ t("Адрес")
                }}<a
                  :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ emailAddress }}</a
                >
              </p>
            </div>
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
          </div>
        </v-navigation-drawer>
        <v-app-bar-nav-icon
          color="white"
          variant="text"
          @click.stop="drawer = !drawer"
          :style="{ margin: '0px 15px' }"
          v-if="xs || sm"
        ></v-app-bar-nav-icon>
        <nav v-else>
          <div class="flex-box">
            <div
              class="nav-item"
              v-for="item in homePageNavigation"
              :key="item.label"
              @click.stop="navHandler(item)"
            >
              {{ t(item.label) }}
            </div>
            <router-link class="nav-item" to="/admin" v-if="token">{{
              t("Админ")
            }}</router-link>
            <Select
              v-if="md"
              :value="locale"
              @change="setLocale"
              :class="{ activeSelect: !isActive }"
              :style="{ margin: '0px 15px' }"
            >
              <template #render-value>
                <div class="flex-box" style="gap: 8px; width: 42px">
                  <img
                    :src="
                      locale === 'en'
                        ? '/assets/united-kingdom.svg'
                        : '/assets/russia.svg'
                    "
                    :alt="
                      locale === 'en' ? 'united kingdom flag' : 'russian flag'
                    "
                    style="width: 20px; height: 20px"
                  />
                  <p>{{ locale }}</p>
                </div></template
              >
              <template #items="{ handleChange }"
                ><div
                  class="select-item"
                  :class="{ active: 'en' === locale }"
                  @click="handleChange('en')"
                >
                  <div class="flex-box" style="gap: 8px; width: 42px">
                    <img
                      src="/assets/united-kingdom.svg"
                      alt="united kingdom flag"
                      style="width: 20px; height: 20px"
                    />
                    <p>en</p>
                  </div>
                </div>
                <div
                  class="select-item"
                  :class="{ active: 'ru' === locale }"
                  @click="handleChange('ru')"
                >
                  <div class="flex-box" style="gap: 8px; width: 42px">
                    <img
                      src="/assets/russia.svg"
                      alt="russian flag"
                      style="width: 20px; height: 20px"
                    />
                    <p>ru</p>
                  </div>
                </div>
              </template></Select
            >
          </div>
        </nav>
      </div>
    </div>
    <div class="toggle-language" v-if="!xs && !sm && !md">
      <Select
        :value="locale"
        @change="setLocale"
        :class="{ activeSelect: !isActive }"
      >
        <template #render-value>
          <div class="flex-box" style="gap: 8px; width: 42px">
            <img
              :src="
                locale === 'en'
                  ? '/assets/united-kingdom.svg'
                  : '/assets/russia.svg'
              "
              :alt="locale === 'en' ? 'united kingdom flag' : 'russian flag'"
              style="width: 20px; height: 20px"
            />
            <p>{{ locale }}</p>
          </div></template
        >
        <template #items="{ handleChange }"
          ><div
            class="select-item"
            :class="{ active: 'en' === locale }"
            @click="handleChange('en')"
          >
            <div class="flex-box" style="gap: 8px; width: 42px">
              <img
                src="/assets/united-kingdom.svg"
                alt="united kingdom flag"
                style="width: 20px; height: 20px"
              />
              <p>en</p>
            </div>
          </div>
          <div
            class="select-item"
            :class="{ active: 'ru' === locale }"
            @click="handleChange('ru')"
          >
            <div class="flex-box" style="gap: 8px; width: 42px">
              <img
                src="/assets/russia.svg"
                alt="russian flag"
                style="width: 20px; height: 20px"
              />
              <p>ru</p>
            </div>
          </div>
        </template></Select
      >
    </div>
    <FeedbackModal v-model="openFeedbackModal" />
  </header>
</template>

<style scoped>
  .row {
    width: 100%;
    max-width: 1250px;
    gap: 5vw;
  }
  .logo-wrapper {
    height: 40px;
    gap: 10px;
    padding: 0px 15px;
    cursor: pointer;
  }
  .logout-icon {
    width: 24px;
    height: 24px;
    filter: invert(15%) sepia(89%) saturate(7500%) hue-rotate(3deg)
      brightness(93%) contrast(121%);
  }

  .text-header {
    width: fit-content;
    color: #fff;
    font-size: 12px;
    font-weight: 300;
    line-height: 20px;
    padding: 0px;
  }
  .text-header a {
    color: #fff;
    font-weight: 500;
  }
  .contact-icon {
    width: 14px;
    height: 14px;
  }
  @media (min-width: 0px) and (max-width: 600px) {
    .text-header,
    .text-header a {
      font-weight: 400;
    }
  }
  @media (min-width: 600px) and (max-width: 960px) {
    .text-header,
    .text-header a {
      font-weight: 400;
    }
  }
  @media (min-width: 960px) and (max-width: 1264px) {
    .row {
      gap: 20px;
    }
  }
</style>
