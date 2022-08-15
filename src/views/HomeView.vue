<script setup>
  import { ref } from "@vue/reactivity";
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

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    store.getNewsFeed();
    store.getPartnersList();
    store.getServicesList();
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
        block: key === "top" ? "start" : "center",
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
  <div class="flex-box-center">
    <main>
      <!-- <section
        style="text-align: center"
        :ref="
          (el) => {
            if (el) refs['introduction'] = el;
          }
        "
      >
        <div class="column_wrap">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">INTRODUCTION</h3>
          </div>
          <p class="body1" style="margin-bottom: 20px">
            The current financial global crisis emanating from the sub-prime
            meltdown have demonstrated that Islam, properly understood, presents
            a viable alternative to conventional western financial practices for
            managing the modern global economy.
          </p>
          <p class="body1" style="margin-bottom: 20px">
            Some even argued that if Islam offers a viable set of contemporary
            financial and commercial practices, then it also offers an
            appropriate structure for social order as well. Wasn’t the crisis
            the result of riba or the prohibited interest?
          </p>
          <p class="body1" style="margin-bottom: 20px">
            Islamic finance is based primarily on the Quranic and hadith dictate
            on the prohibition of riba, structured upon stringent governance
            standards that emphasizes the importance of universal values and the
            need for real sector growth.
          </p>
        </div>
      </section> -->
      <section
        class="flex-box"
        style="align-items: flex-start"
        :ref="
          (el) => {
            if (el) refs['about_us'] = el;
          }
        "
      >
        <div class="column_wrap" style="width: 33%">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("О НАС") }}</h3>
          </div>
          <p class="body1" style="margin-bottom: 20px">
            {{ t("О компании") }}
          </p>
        </div>
        <div class="column_wrap" style="width: 33%">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("Миссия компании") }}</h3>
          </div>
          <p class="body1" style="margin-bottom: 20px">
            {{
              t(
                "Развитие и популяризация Исламского финансирования в Кыргызстане и в ближнем зарубежье."
              )
            }}
          </p>
        </div>
        <div class="column_wrap" style="width: 33%">
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
      </section>
      <section
        style="padding-bottom: 0px"
        :ref="
          (el) => {
            if (el) refs['our_experiences'] = el;
          }
        "
      >
        <div class="column_wrap">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("НАШ ОПЫТ") }}</h3>
          </div>
        </div>
      </section>
    </main>
  </div>
  <section style="padding-top: 0px" v-if="store.partners.length">
    <MarqueeText class="gallery" :duration="15" :repeat="10">
      <main class="flex-box" style="width: 100vw; gap: 15px">
        <div
          class="gallery_item"
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
        </div></main
    ></MarqueeText>
    <div class="flex-box-center" style="margin-top: 20px">
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
  <div class="flex-box-center">
    <main>
      <section
        :ref="
          (el) => {
            if (el) refs['our_services'] = el;
          }
        "
      >
        <div class="column_wrap">
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
        <div class="column_wrap">
          <div class="flex-box-center" style="margin-bottom: 40px">
            <h3 class="title divider">{{ t("НОВОСТИ") }}</h3>
          </div>
        </div>
        <div class="flex-box" style="gap: 20px" v-if="store.newsFeed.length">
          <BlogCard
            v-for="news in store.newsFeed"
            :key="news._id"
            :news="news"
          />
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
    class="go_top"
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
  <Footer />
</template>

<style scoped>
  .column_wrap {
    padding: 15px;
  }
  section {
    padding: 100px 0px;
  }
  .go_top {
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
  .go_top.show {
    opacity: 1;
    visibility: visible;
    bottom: 11px;
  }
  .gallery {
    width: 100%;
    padding: 100px 0px;
    background-color: #f5f5f5;
  }
  .gallery_item {
    width: 100%;
    max-width: 25%;
    text-align: center;
  }
</style>
