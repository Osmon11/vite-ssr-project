<script setup>
  import { ref, computed } from "@vue/reactivity";
  import { onBeforeUpdate, onMounted, onUnmounted } from "@vue/runtime-core";
  import MarqueeText from "vue-marquee-text-component";

  import Header from "@/shared/Header.vue";
  import Slider from "@/components/Slider.vue";
  import BlogCard from "@/shared/BlogCard.vue";
  import Footer from "@/shared/Footer.vue";
  import { useStore } from "../store/index.js";
  import { useI18n } from "vue-i18n";

  const store = useStore();
  const refs = ref({});
  const { t, locale } = useI18n();
  const activeGoTop = ref(false);
  const headerPosition = ref("fixed");
  const xs = computed(() => window.innerWidth <= 600);
  const sm = computed(() => window.innerWidth <= 960);

  onMounted(() => {
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
        block: key === "top" ? "start" : key === "contacts" ? "end" : "center",
        behavior: "smooth",
      });
    }
  }
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
  <div class="flex-box-center" :style="{ marginTop: xs ? '30px' : '80px' }">
    <main>
      <section
        class="flex-box"
        :style="{
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
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("Миссия компании") }}</h3>
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
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("О НАС") }}</h3>
          </div>
          <p class="body1" style="margin-bottom: 20px">
            {{ t("О компании") }}
          </p>
        </div>
        <div class="column-wrap info-item">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("ПОЧЕМУ МЫ") }}</h3>
          </div>
          <p class="body1" style="margin-bottom: 20px">
            {{
              t(
                "Наши услуги включают полный цикл процессов, от формирования кадрового состава до поставки программного комплекса по Исламскому Финансированию в кратчайшие сроки. Наша команда состоит из специалистов и членов Совета по надзору за исламскими финансовыми услугами, имеющие теоретические знания исламских принципов финансирования, а также многолетний практический опыт в данной области как в Кыргызстане, так и за рубежом"
              )
            }}
          </p>
        </div>
        <div class="column-wrap info-item">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">
              {{ t("Наши цели в рамках развития ИПФ") }}
            </h3>
          </div>
          <ul>
            <li>
              <p
                class="body1"
                :style="{
                  marginBottom: '10px',
                  textAlign: xs ? 'center' : 'start',
                }"
              >
                {{
                  t(
                    "Стать первым учреждением, охватывающим все аспекты деятельности исламского финансирования;"
                  )
                }}
              </p>
            </li>
            <li>
              <p
                class="body1"
                :style="{
                  marginBottom: '10px',
                  textAlign: xs ? 'center' : 'start',
                }"
              >
                {{
                  t(
                    "Внедрение передового международного опыта путем предоставления стратегических рекомендаций;"
                  )
                }}
              </p>
            </li>
            <li>
              <p
                class="body1"
                :style="{
                  marginBottom: '10px',
                  textAlign: xs ? 'center' : 'start',
                }"
              >
                {{ t("Предоставление качественных услуг;") }}
              </p>
            </li>
            <li>
              <p
                class="body1"
                :style="{
                  marginBottom: '10px',
                  textAlign: xs ? 'center' : 'start',
                }"
              >
                {{ t("Взаимовыгодное партнерство;") }}
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section
        style="padding-bottom: 0px"
        :ref="
          (el) => {
            if (el) refs['our_experiences'] = el;
          }
        "
      >
        <div class="column-wrap">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("НАШ ОПЫТ") }}</h3>
          </div>
        </div>
      </section>
    </main>
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
            :src="partner.logo"
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
  <div
    class="flex-box-center"
    :style="{ marginBottom: xs ? '30px' : '80px', padding: '0px 15px' }"
  >
    <main>
      <section
        :ref="
          (el) => {
            if (el) refs['our_services'] = el;
          }
        "
      >
        <div class="column-wrap">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("НАШИ УСЛУГИ") }}</h3>
          </div>
        </div>
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
      <section
        :ref="
          (el) => {
            if (el) refs['blog'] = el;
          }
        "
      >
        <div class="column-wrap">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("Новости") }}</h3>
          </div>
        </div>
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
  <a
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
  ></a>
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
