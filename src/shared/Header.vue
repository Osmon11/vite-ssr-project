<script setup>
  import FeedbackModal from "@/components/FeedbackModal.vue";
  import { computed, onMounted, onUnmounted } from "@vue/runtime-core";
  import { useRoute, useRouter } from "vue-router";
  import { ref } from "@vue/reactivity";
  import { useI18n } from "vue-i18n";
  import cookie_js from "cookie_js";

  import Select from "@/shared/Select.vue";
  import { useStore } from "../store";

  const props = defineProps(["scrollIntoHandler"]);

  const store = useStore();
  const { t, locale } = useI18n();
  const navigate = useRouter();
  const { name } = useRoute();
  const homePageNavigation = [
    { label: "О НАС", key: "about_us" },
    { label: "Новости", key: "blog" },
    { label: "ШАРИАТСКИЙ СОВЕТ", to: "/shariah-board" },
    {
      label: "НАШ ОПЫТ",
      key: "our_experiences",
    },
    { label: "НАШИ УСЛУГИ", key: "our_services" },
    { label: "Контакты", key: "contacts" },
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
    if (item.key) {
      props.scrollIntoHandler(item.key);
    } else {
      navigate.push(item.to);
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
</script>

<template>
  <header :class="{ active: isActive, sticky: isSticky }">
    <div class="flex-box-center">
      <div class="row flex-box-between">
        <div class="logo-wrapper flex-box" @click="logoClick">
          <img class="logo" src="/assets/AA_LOGO.svg" alt="logo" />
          <p class="logo-text activeLogoText">Amanat Advisory LLC</p>
        </div>
        <v-navigation-drawer
          class="py-5 px-5"
          style="width: fit-content"
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
          <v-list v-if="name === 'home'">
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
          <v-list v-else>
            <v-list-subheader>{{ t("general.Навигация") }}</v-list-subheader>
            <v-list-item
              rounded="xl"
              @click="mobileNavHandler('/')"
              :style="{ textTransform: 'uppercase' }"
              >{{ t("Главная") }}</v-list-item
            >
            <v-list-item
              rounded="xl"
              @click="mobileNavHandler('/our-news')"
              :style="{ textTransform: 'uppercase' }"
              v-if="name !== 'our-news'"
              >{{ t("Новости") }}</v-list-item
            >
            <v-list-item
              rounded="xl"
              @click="mobileNavHandler('/shariah-board')"
              :style="{ textTransform: 'uppercase' }"
              v-if="name !== '/shariah-board'"
              >{{ t("ШАРИАТСКИЙ СОВЕТ") }}</v-list-item
            >
            <v-list-item
              rounded="xl"
              @click="mobileNavHandler('/admin')"
              :style="{ textTransform: 'uppercase' }"
              v-if="name !== 'admin'"
              >{{ t("Админ") }}</v-list-item
            >
            <v-list-item
              rounded="xl"
              @click="logout"
              :style="{ textTransform: 'uppercase' }"
              v-else
              >{{ t("выйти") }}</v-list-item
            >
          </v-list>
          <div style="padding: 0px 16px">
            <v-list-subheader>{{ t("Контакты") }}</v-list-subheader>
            <div style="padding: 8px 0px">
              <a class="body1 text-footer" href="tel:996555081071"
                >+996555081071</a
              >
            </div>
            <div style="padding: 8px 0px">
              <a
                class="body1 text-footer"
                href="mailto:madalieva@amanatadvisory.kg"
                >madalieva@amanatadvisory.kg</a
              >
            </div>
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
        </v-navigation-drawer>
        <v-app-bar-nav-icon
          color="white"
          variant="text"
          @click.stop="drawer = !drawer"
          :style="{ margin: '0px 15px' }"
          v-if="xs || sm"
        ></v-app-bar-nav-icon>
        <nav v-else>
          <span class="flex-box" v-if="name === 'home'">
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
            <!-- <router-link class="nav-item" to="/login" v-else>{{
            t("войти")
          }}</router-link> -->
          </span>
          <span class="flex-box" v-else>
            <router-link class="nav-item" to="/">{{
              t("Главная")
            }}</router-link>
            <router-link
              class="nav-item"
              to="/our-news"
              v-if="name !== 'our-news'"
              >{{ t("Новости") }}</router-link
            >
            <router-link
              class="nav-item"
              to="/shariah-board"
              v-if="name !== 'shariah-board'"
              >{{ t("ШАРИАТСКИЙ СОВЕТ") }}</router-link
            >
            <div v-if="name !== 'admin'">
              <router-link class="nav-item" to="/admin" v-if="token">{{
                t("Админ")
              }}</router-link>
              <!-- <router-link class="nav-item" to="/login" v-else>{{
              t("войти")
            }}</router-link> -->
            </div>
            <div
              class="flex-box"
              style="cursor: pointer"
              @click="logout"
              v-else
            >
              <p class="nav-item" style="padding-right: 10px">
                {{ t("выйти") }}
              </p>
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
              <!-- <img
              class="logout-icon"
              src="/assets/logout-svgrepo-com.svg"
              alt=""
            /> -->
            </div>
          </span>
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
    <FeedbackModal :open="openFeedbackModal" :onClose="setFeedbackModal" />
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
</style>
