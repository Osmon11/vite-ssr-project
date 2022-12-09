<template>
  <PageContainer
    :scrollIntoHandler="scrollIntoHandler"
  >
    <Slider />
    <div
      class="flex-box-center"
      style="background-color: #f5f5f5"
    >
      <main>
        <section
          id="about_us"
          class="flex-box align-start flex-wrap px-4"
          :style="{
            gap: xs ? '16px' : '32px',
          }"
          :ref="
            (el) => {
              if (el) refs['about_us'] = el;
            }
          "
        >
          <div class="column-wrap info-item">
            <div
              class="flex-box"
              style="margin-bottom: 40px"
            >
              <h1 class="title about-us divider">
                {{
                  $t(
                    "lang-d8bf7dcf-c03c-4fd6-ab84-5702e4f0c7b8"
                  )
                }}
              </h1>
            </div>
            <p
              class="body1 text-justify"
              style="margin-bottom: 20px"
            >
              {{
                $t(
                  "lang-de48119e-6e58-4638-9e52-b157c06d43d8"
                )
              }}
            </p>
          </div>
          <div class="column-wrap info-item">
            <div
              class="flex-box"
              style="margin-bottom: 40px"
            >
              <h1 class="title about-us divider">
                {{
                  $t(
                    "lang-81f0a455-136a-4bc6-88f9-a547ccd54059"
                  )
                }}
              </h1>
            </div>
            <p
              class="body1 text-justify"
              :style="{
                marginBottom: '20px',
                textAlign: xs
                  ? 'center'
                  : 'start',
              }"
            >
              {{
                $t(
                  "lang-a18ca12c-fb33-4701-a45f-026ff6403d32"
                )
              }}
            </p>
          </div>
          <div class="column-wrap info-item">
            <div
              class="flex-box"
              style="margin-bottom: 40px"
            >
              <h1 class="title about-us divider">
                {{
                  $t(
                    "lang-b3c2be09-3966-474b-b18d-d647ff918ef1"
                  )
                }}
              </h1>
            </div>
            <div
              class="flex-box gap"
              v-for="index in 5"
              :key="index"
            >
              <span class="dot"></span>
              <p
                class="body1 text-justify"
                :style="{
                  marginBottom: '10px',
                  textAlign: xs
                    ? 'center'
                    : 'start',
                }"
              >
                {{
                  $t(
                    `lang-66a5276b-a9c3-4c30-a282-81e3e62b79c0[${index}]`
                  )
                }}
              </p>
            </div>
          </div>
          <div class="column-wrap info-item">
            <div
              class="flex-box"
              style="margin-bottom: 40px"
            >
              <h1 class="title about-us divider">
                {{
                  $t(
                    "lang-dd4633f2-b1eb-4a43-bcfe-4da9ea11d9ca"
                  )
                }}
              </h1>
            </div>
            <p
              class="body1 text-justify"
              style="margin-bottom: 20px"
            >
              {{
                $t(
                  "lang-68cc1fe1-68ea-4d18-943d-57bfeb401e5f"
                )
              }}
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
      <div
        class="flex-box-center"
        :style="{ margin: '40px 0px' }"
      >
        <h2 class="title divider">
          {{
            $t(
              "lang-ef952636-74de-4f4c-a2b1-df869f04e844"
            )
          }}
        </h2>
      </div>
    </div>
    <section
      style="padding-top: 0px"
      v-if="partners.length"
    >
      <MarqueeText
        class="gallery"
        :repeat="10"
      >
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
            v-for="partner in partners"
            :key="partner._id"
          >
            <img
              class="noselect"
              style="width: auto"
              :src="`${apiUrl}${partner.logo}`"
              :alt="partner.name_ru"
              :draggable="false"
            />
          </div></div
      ></MarqueeText>
      <div
        class="flex-box-center"
        style="
          margin-top: 20px;
          padding: 0px 15px;
        "
      >
        <a
          href="/experiences"
          class="text-decoration-none"
          style="width: 100%; max-width: 1250px"
        >
          <v-btn
            color="#61a375"
            class="text-white"
            style="width: 100%; max-width: 1250px"
          >
            {{
              $t(
                "lang-affa9989-3199-4634-95af-469c8881aca2"
              )
            }}
          </v-btn></a
        >
      </div>
    </section>
    <div class="column-wrap">
      <div
        class="flex-box-center"
        style="margin-bottom: 40px"
      >
        <h2 class="title divider">
          {{
            $t(
              "lang-789737de-eb6a-47de-ab69-33aa5670867e"
            )
          }}
        </h2>
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
            v-if="services.length"
          >
            <v-expansion-panel
              v-for="service in services"
              :key="service._id"
            >
              <v-expansion-panel-title>
                {{
                  service[
                    `name_${locale}` as keyof typeof service
                  ]
                }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div
                  style="padding: 16px"
                  v-html="
                    service[`content_${locale}` as keyof typeof service]
                  "
                ></div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </section>
      </main>
    </div>
    <div class="column-wrap">
      <div
        class="flex-box-center"
        :style="{ margin: '40px 0px' }"
      >
        <h2 class="title divider">
          {{
            $t(
              "lang-43551998-d49d-41a1-8287-25a880594e94"
            )
          }}
        </h2>
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
            class="flex-box flex-wrap flex-md-nowrap"
            style="
              gap: 20px;
              align-items: stretch;
            "
            v-if="newsFeed.length"
          >
            <div
              class="w-100 w-md-33 flex-box mb-5"
              style="align-items: stretch"
              v-for="news in newsFeed.slice(0, 3)"
              :key="news._id"
            >
              <BlogCard :news="news" />
            </div>
          </div>
          <a
            href="/news-feed"
            class="text-decoration-none"
          >
            <v-btn
              color="#61a375"
              class="text-white"
              style="width: 100%"
            >
              {{
                $t(
                  "lang-63175ab7-4c30-4939-94e5-1fe90aeedb86"
                )
              }}
            </v-btn></a
          >
        </section>
      </main>
    </div></PageContainer
  >
  <div
    :ref="
      (el) => {
        if (el) refs['contacts'] = el;
      }
    "
    style="height: 0px"
  ></div>
</template>

<script lang="ts" setup>
  import { useI18n } from "vue-i18n";
  import {
    computed,
    onBeforeUpdate,
    onMounted,
    onUnmounted,
    ref,
  } from "vue";
  import { usePageContext } from "@/renderer/usePageContext";
  import { usePartnerStore } from "@/stores/partner";
  import { useNewsStore } from "@/stores/news";
  import { useServiceStore } from "@/stores/service";

  import Slider from "@/components/general/Slider.vue";
  import MarqueeText from "@/components/general/MarqueeText.vue";
  import BlogCard from "@/components/shared/BlogCard.vue";
  import PageContainer from "@/containers/PageContainer.vue";

  import { apiUrl } from "@/utils/constants";
  import { IIndexable } from "@/types/interfaces";

  const { locale } = useI18n();
  const pageContext = usePageContext();

  const xs = computed(() =>
    import.meta.env.SSR
      ? 0
      : window.innerWidth <= 600
  );

  const refs = ref<IIndexable>({
    about_us: null,
    our_experiences: null,
    our_services: null,
    blog: null,
  });

  const partnerStore = usePartnerStore();
  const newsStore = useNewsStore();
  const serviceStore = useServiceStore();

  const partners = computed(
    () => partnerStore.getPartners
  );
  const newsFeed = computed(
    () => newsStore.getNewsFeed
  );
  const services = computed(
    () => serviceStore.getServiceList
  );

  const activeGoTop = ref(false);

  function handleScroll() {
    activeGoTop.value =
      window.scrollY > window.innerHeight;
  }
  function scrollIntoHandler(key: string) {
    if (refs.value[key]) {
      refs.value[key].scrollIntoView({
        block:
          key === "contacts" ? "end" : "start",
        behavior: "smooth",
      });
    }
  }

  onMounted(() => {
    if (pageContext.urlParsed.search.section) {
      setTimeout(
        () =>
          scrollIntoHandler(
            pageContext.urlParsed.search.section
          ),
        0
      );
    }
    // FETCH DATA
    partnerStore.fetchPartnerList();
    newsStore.fetchNewsFeed();
    serviceStore.fetchServiceList();
    window.addEventListener(
      "scroll",
      handleScroll
    );
  });
  onUnmounted(() => {
    window.removeEventListener(
      "scroll",
      handleScroll
    );
  });
  onBeforeUpdate(() => {
    refs.value = {};
  });
</script>

<style scoped>
  .column-wrap {
    padding: 15px;
  }
  section {
    padding: 80px 0px;
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
      width: 100%;
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
