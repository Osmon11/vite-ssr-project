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
  const { t } = useI18n();
  const activeGoTop = ref(false);
  const headerPosition = ref("relative");

  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    store.getNewsFeed({}, (success) => {});
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
      window.scrollY > window.innerHeight - 50 ? "fixed" : "relative";
  }
  function scrollIntoHandler(key) {
    if (refs.value[key]) {
      refs.value[key].scrollIntoView({
        block: key === "top" ? "start" : "center",
        behavior: "smooth",
      });
    }
  }

  const accordeons = [
    {
      summary: "Islamic Finance Consultancy",
      details: `<div style="color: #47425d">
          <ol>
            <li>
              <p class="body1">
                Establishment of Islamic financial institutions
              </p>
            </li>
             <li>
              <p class="body1">
               Migration of conventional banking to Islamic banking operations
              </p>
            </li>
             <li>
              <p class="body1">
                Provision of support and advisory services related to Shari’ah-based financial / banking operations covering inter alia:-
              </p>
            </li>
          </ol>
          <ul style="padding-top: 15px; margin-left: 15px">
            <li>
              <p class="body1">
                Shari’ah advisory and consultancy
              </p>
            </li>
             <li>
              <p class="body1">
                Corporate governance
              </p>
            </li>
             <li>
              <p class="body1">
                Risk management and compliance
              </p>
            </li>
             <li>
              <p class="body1">
                High level policy and procedure
              </p>
            </li>
             <li>
              <p class="body1">
                IT system, design and implementation.
              </p>
            </li>
             <li>
              <p class="body1">
                New product design and development.
              </p>
            </li>
             <li>
              <p class="body1">
                Fund management product design.
              </p>
            </li>
             <li>
              <p class="body1">
                Capital Market.
              </p>
            </li>
             <li>
              <p class="body1">
               Wealth Management
              </p>
            </li>
          </ul>
        </div>`,
    },
    {
      summary: "Takaful Consultancy",
      details: `<ul> <li>
              <p class="body1">
                Setting up of takaful operations.
              </p>
            </li> <li>
              <p class="body1">
                Best practice standards.
              </p>
            </li> <li>
              <p class="body1">
                Product development and designs.
              </p>
            </li> <li>
              <p class="body1">
                Risk and actuarial advisory.
              </p>
            </li> <li>
              <p class="body1">
                Arrangement of retakaful needs
              </p>
            </li></ul>`,
    },
    {
      summary: "Project & Corporate Advisory",
      details: `<span class="body1" style="text-decoration: underline; font-weight: 700">Project Advisory Services</span>
            <ul style="margin: 10px 0px"> <li>
              <p class="body1">
               Preparation and/or evaluation of financial feasibility studies (incl. structuring financial needs)
              </p>
            </li> <li>
              <p class="body1">
                Fund raising related activities (sourcing of financing & negotiation with funders)
              </p></li>
           </ul>
           <span class="body1" style="text-decoration: underline; font-weight: 700">Corporate Advisory Services</span>
            <ul style="margin: 10px 0px"> <li>
              <p class="body1">
               Mergers & acquisition advisory and corporate finance functions
              </p>
            </li> <li>
              <p class="body1">
                Transformation/conversion of conventional banks/insurance into Islamic banks/takaful
              </p></li>
              <li>
              <p class="body1">
               Project management of financial institutions initiatives
              </p></li>
           </ul>
           <span class="body1" style="text-decoration: underline; font-weight: 700">Due Diligence Services</span>
            <ul style="margin: 10px 0px"> 
            <li>
              <p class="body1">
               Financial, operation, technology and shariah due diligence
              </p>
            </li> <li>
              <p class="body1">
                Risk evaluations, control measures and risk management
              </p></li>
              <li>
              <p class="body1">
               Client evaluation & milestone achievements and testing of financial models
              </p>
            </li> <li>
              <p class="body1">
                Market reassessment, monitoring and evaluation processes
              </p></li>
           </ul>`,
    },
    {
      summary: "Capacity Building",
      details: `
      <ul> <li>
              <p class="body1">
                Design and conducting of training programme on Islamic banking, finance and takaful
              </p>
            </li> <li>
              <p class="body1">
                Compilation, assembling and writing of training materials for products and operation
              </p>
            </li> <li>
              <p class="body1">
                Review, amend and update of training materials and modules including Shariah discussions and deliberations
              </p>
            </li> <li>
              <p class="body1">
                Facilitating customised and specialised teaching and guiding on the job training
              </p>
            </li> <li>
              <p class="body1">
                Sourcing for and undertaking management staff recruitment for Islamic banking and takaful as well as Shariah personnel.
              </p>
            </li></ul>`,
    },
    {
      summary: "Shari’ah Framework Advisory",
      details: `
      <ul> <li>
              <p class="body1">
                Interpretation of the Shari‟ah differs between various schools of jurisprudences. In some countries, these rules are established centrally whereas in others they are open to local interpretation. There is no internationally agreed standard approach.
              </p>
            </li> <li>
              <p class="body1">
                For banks or takaful operators creating new products, this presents the first challenge – even to those with established Islamic financial services.
              </p>
            </li> <li>
              <p class="body1">
                Assist in drawing up the framework for Shari‟ah decisions and the governance principles for compliance requirements and the Shari‟ah audit processes.
              </p>
            </li></ul>`,
    },
    {
      summary: "Specialised Training",
      details: `
      <ul> <li>
              <p class="body1">
                Takaful
              </p>
            </li> <li>
              <p class="body1">
                Islamic Finance
              </p>
            </li> <li>
              <p class="body1">
                Islamic Capital Market
              </p>
            </li> <li>
              <p class="body1">
                Shariah Audit and Compliance
              </p>
            </li> <li>
              <p class="body1">
                Corporate Finance
              </p>
            </li>
            <li>
              <p class="body1">
                Microfinance and Governance
              </p>
            </li> <li>
              <p class="body1">
                Islamic Wealth Management
              </p>
            </li>
        </ul>`,
    },
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
  <section style="padding-top: 0px">
    <MarqueeText class="gallery" :duration="15" :repeat="10">
      <main class="flex-box" style="width: 100vw; gap: 15px">
        <div class="gallery_item">
          <img src="/assets/9.png" style="width: auto" alt="" />
        </div>
        <div class="gallery_item">
          <img src="/assets/7.png" style="width: auto" alt="" />
        </div>
        <div class="gallery_item">
          <img src="/assets/partnerre-logo.png" style="width: auto" alt="" />
        </div>
        <div class="gallery_item">
          <img src="/assets/8.png" style="width: auto" alt="" />
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
          подробней
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
        <v-expansion-panels style="margin-bottom: 20px">
          <v-expansion-panel v-for="item in accordeons" :key="item.summary">
            <v-expansion-panel-title>
              {{ item.summary }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div style="padding: 16px" v-html="item.details"></div>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <router-link to="/our-services" class="text-decoration-none">
          <v-btn color="#61a375" class="text-white" style="width: 100%">
            Смотреть все
          </v-btn></router-link
        >
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
            Посмотреть все новости
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
