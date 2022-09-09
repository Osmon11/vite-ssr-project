<script setup>
  import { ref, computed } from "@vue/reactivity";
  import { onBeforeUpdate, onMounted, onUnmounted } from "@vue/runtime-core";
  import MarqueeText from "vue-marquee-text-component";

  import Header from "@/shared/Header.vue";
  import Slider from "@/components/Slider.vue";
  import BlogCard from "@/shared/BlogCard.vue";
  import Footer from "@/shared/Footer.vue";
  import appStore from "../store/index.js";
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";

  const store = appStore.useStore();
  const { t, locale } = useI18n();
  const route = useRoute();
  const refs = ref({});
  const activeGoTop = ref(false);
  const headerPosition = ref("fixed");
  const backendUrl = import.meta.env.VITE_API_URL;
  const xs = computed(() => window.innerWidth <= 600);
  const sm = computed(() => window.innerWidth <= 960);

  onMounted(() => {
    if (route.query) {
      setTimeout(() => scrollIntoHandler(route.query.section), 0);
    }
    store.getNewsFeed();
    store.getPartnersList();
    store.getServicesList();
    window.addEventListener("scroll", handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
  onBeforeUpdate(() => {
    refs.value = {};
  });

  function handleScroll() {
    activeGoTop.value = window.scrollY > window.innerHeight;
    headerPosition.value =
      window.scrollY > window.innerHeight - 50 ? "fixed" : "fixed";
  }
  function scrollIntoHandler(key) {
    if (refs.value[key]) {
      refs.value[key].scrollIntoView({
        block:
          key === "top" || key === "about_us"
            ? "start"
            : key === "contacts"
            ? "end"
            : "center",
        behavior: "smooth",
      });
    }
  }

  const companyGoals = [
    "lang-28dc5e63-dc50-42ba-aad9-6e3dc49a0b0b",
    "lang-ee090b3a-b8da-496f-8b2a-266675b14d99",
    "lang-dbedc239-b6e9-44ae-bc60-b71a5dc7caeb",
    "lang-cd5985f4-4c1c-4a54-96b7-88bac0aaa28c",
    "lang-3f74141c-349b-4418-9765-a1e1501270dd",
    "lang-f4991c13-f04c-48de-a96e-b066ec9f2dcf",
  ];
</script>

<template>
  <span
    :ref="
      (el) => {
        if (el) refs['top'] = el;
      }
    "
  ></span>
  <Header
    :scrollIntoHandler="scrollIntoHandler"
    :headerPosition="headerPosition"
  />
  <Slider />
  <div class="flex-box-center" style="background-color: #f5f5f5">
    <main>
      <section
        class="flex-box"
        :style="{
          paddingLeft: '15px',
          paddingRight: '15px',
          alignItems: 'flex-start',
          gap: xs ? '16px' : '32px',
          flexWrap: 'wrap',
        }"
        :ref="
          (el) => {
            if (el) refs['about_us'] = el;
          }
        "
      >
        <div class="column-wrap info-item">
          <div class="flex-box" style="margin-bottom: 40px">
            <h3 class="title about-us divider">
              {{ t("general['О компании']") }}
            </h3>
          </div>
          <p class="body1" style="margin-bottom: 20px">
            {{ t("О компании") }}
          </p>
        </div>
        <div class="column-wrap info-item">
          <div class="flex-box" style="margin-bottom: 40px">
            <h3 class="title about-us divider">{{ t("Миссия компании") }}</h3>
          </div>
          <p
            class="body1"
            :style="{
              marginBottom: '20px',
              textAlign: xs ? 'center' : 'start',
            }"
          >
            {{
              t(
                "Развитие и популяризация Исламского финансирования в Кыргызстане и в ближнем зарубежье."
              )
            }}
          </p>
        </div>
        <div class="column-wrap info-item">
          <div class="flex-box" style="margin-bottom: 40px">
            <h3 class="title about-us divider">
              {{ t("Цели компании") }}
            </h3>
          </div>
          <div
            class="flex-box"
            style="gap: 20px"
            v-for="goal in companyGoals"
            :key="goal"
          >
            <span class="dot"></span>
            <p
              class="body1"
              :style="{
                marginBottom: '10px',
                textAlign: xs ? 'center' : 'start',
              }"
            >
              {{ t(goal) }}
            </p>
          </div>
        </div>
        <div class="column-wrap info-item">
          <div class="flex-box" style="margin-bottom: 40px">
            <h3 class="title about-us divider">{{ t("ПОЧЕМУ МЫ?") }}</h3>
          </div>
          <p class="body1" style="margin-bottom: 20px">
            {{ t("leng-32b348ac-d056-4e10-8437-993e2f81f112") }}
          </p>
        </div>
      </section>
    </main>
  </div>
  <div
    class="column-wrap"
    :ref="
      (el) => {
        if (el) refs['our_experiences'] = el;
      }
    "
  >
    <div class="flex-box-center" :style="{ margin: '40px 0px' }">
      <h2 class="title divider">{{ t("НАШ ОПЫТ") }}</h2>
    </div>
  </div>
  <section style="padding-top: 0px" v-if="store.partners.length">
    <MarqueeText class="gallery" :repeat="10">
      <div
        class="flex-box"
        :style="{
          width: 'auto',
          gap: xs ? '32px' : '16px',
          marginRight: xs ? '32px' : '16px',
          justifyContent: 'space-around',
        }"
      >
        <div
          class="gallery-item"
          v-for="partner in store.partners"
          :key="partner._id"
        >
          <img
            class="noselect"
            style="width: auto"
            :src="`${backendUrl}${partner.logo}`"
            :alt="partner[`name_${locale}`]"
            :draggable="false"
          />
        </div></div
    ></MarqueeText>
    <div class="flex-box-center" style="margin-top: 20px; padding: 0px 15px">
      <router-link
        to="/experiences"
        class="text-decoration-none"
        style="width: 100%; max-width: 1250px"
      >
        <v-btn
          color="#61a375"
          class="text-white"
          style="width: 100%; max-width: 1250px"
        >
          {{ t("general.подробней") }}
        </v-btn></router-link
      >
    </div>
  </section>
  <div class="column-wrap">
    <div class="flex-box-center" style="margin-bottom: 40px">
      <h2 class="title divider">{{ t("НАШИ УСЛУГИ") }}</h2>
    </div>
  </div>
  <div
    class="flex-box-center"
    :style="{
      paddingBottom: xs ? '30px' : '80px',
      padding: '0px 15px',
      backgroundColor: '#f5f5f5',
    }"
  >
    <main>
      <section
        :ref="
          (el) => {
            if (el) refs['our_services'] = el;
          }
        "
      >
        <v-expansion-panels
          style="margin-bottom: 20px"
          v-if="store.services.length"
        >
          <v-expansion-panel
            v-for="service in store.services"
            :key="service._id"
          >
            <v-expansion-panel-title>
              {{ service[`name_${locale}`] }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div
                style="padding: 16px"
                v-html="service[`content_${locale}`]"
              ></div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- <router-link to="/our-services" class="text-decoration-none">
          <v-btn color="#61a375" class="text-white" style="width: 100%">
            {{ t("general.смотреть_все") }}
          </v-btn></router-link
        > -->
      </section>
    </main>
  </div>
  <div class="column-wrap">
    <div class="flex-box-center" :style="{ margin: '40px 0px' }">
      <h2 class="title divider">{{ t("Новости") }}</h2>
    </div>
  </div>
  <div
    class="flex-box-center"
    :style="{
      paddingBottom: xs ? '30px' : '80px',
      padding: '0px 15px',
      backgroundColor: '#f5f5f5',
    }"
  >
    <main>
      <section
        :ref="
          (el) => {
            if (el) refs['blog'] = el;
          }
        "
      >
        <div
          class="flex-box"
          style="gap: 20px; align-items: stretch"
          v-if="store.newsFeed.length"
        >
          <div
            class="flex-box mb-5"
            style="align-items: stretch"
            :style="{ width: xs || sm ? '50%' : '33%' }"
            v-for="news in store.newsFeed.slice(0, xs || sm ? 2 : 3)"
            :key="news._id"
          >
            <BlogCard :news="news" />
          </div>
        </div>
        <router-link to="/our-news" class="text-decoration-none">
          <v-btn color="#61a375" class="text-white" style="width: 100%">
            {{ t("general.посмотреть_все_новости") }}
          </v-btn></router-link
        >
      </section>
    </main>
  </div>
  <span
    class="go-top"
    :class="{ show: activeGoTop }"
    @click="scrollIntoHandler('top')"
    ><svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
        fill="currentColor"
      /></svg
  ></span>
  <Footer :scrollIntoHandler="scrollIntoHandler" />
  <div
    :ref="
      (el) => {
        if (el) refs['contacts'] = el;
      }
    "
    style="height: 0px"
  ></div>
</template>

<style scoped>
  .column-wrap {
    padding: 15px;
  }
  section {
    padding: 80px 0px;
  }
  .go-top {
    position: fixed !important;
    right: 20px;
    bottom: -45px;
    color: #fff;
    display: block;
    font-size: 22px;
    line-height: 35px;
    text-align: center;
    width: 40px;
    height: 40px;
    visibility: hidden;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    opacity: 0;
    z-index: 9999;
    cursor: pointer;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    -o-border-radius: 2px;
    border-radius: 2px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    text-decoration: none;
    background-color: #61a375;
    padding: 8px;
  }
  .go-top.show {
    opacity: 1;
    visibility: visible;
    bottom: 11px;
  }
  .gallery {
    width: 100%;
    padding: 100px 0px;
    background-color: #f5f5f5;
  }
  .gallery-item {
    display: inline-block;
    width: 25vw;
    text-align: center;
  }
  .gallery-item img {
    width: auto;
    max-width: 100%;
  }
  .info-item {
    width: calc(50% - 16px);
  }

  @media (min-width: 0px) and (max-width: 600px) {
    section {
      padding: 30px 0px;
    }
    .info-item {
      width: calc(50% - 16px);
    }
    .gallery {
      padding: 50px 0px;
    }
    .gallery-item {
      width: 30vw;
    }
  }
  @media (min-width: 600px) and (max-width: 960px) {
    section {
      padding: 40px 0px;
    }
    .gallery {
      padding: 70px 0px;
    }
  }
</style>
