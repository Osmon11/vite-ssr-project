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
              <h3 class="title about-us divider">
                {{
                  $t(
                    "lang-d8bf7dcf-c03c-4fd6-ab84-5702e4f0c7b8"
                  )
                }}
              </h3>
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
              <h3 class="title about-us divider">
                {{
                  $t(
                    "lang-81f0a455-136a-4bc6-88f9-a547ccd54059"
                  )
                }}
              </h3>
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
              <h3 class="title about-us divider">
                {{
                  $t(
                    "lang-b3c2be09-3966-474b-b18d-d647ff918ef1"
                  )
                }}
              </h3>
            </div>
            <div
              class="flex-box gap"
              v-for="ourGoal in companyGoals"
              :key="ourGoal"
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
                {{ $t(ourGoal) }}
              </p>
            </div>
          </div>
          <div class="column-wrap info-item">
            <div
              class="flex-box"
              style="margin-bottom: 40px"
            >
              <h3 class="title about-us divider">
                {{
                  $t(
                    "lang-dd4633f2-b1eb-4a43-bcfe-4da9ea11d9ca"
                  )
                }}
              </h3>
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
            class="flex-box"
            style="
              gap: 20px;
              align-items: stretch;
            "
            v-if="newsFeed.length"
          >
            <div
              class="flex-box mb-5"
              style="align-items: stretch"
              :style="{
                width: xs || sm ? '50%' : '33%',
              }"
              v-for="news in newsFeed.slice(
                0,
                xs || sm ? 2 : 3
              )"
              :key="news._id"
            >
              <BlogCard :news="news" />
            </div>
          </div>
          <a
            href="/our-news"
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

  import Slider from "@/components/Slider.vue";
  import MarqueeText from "@/components/MarqueeText.vue";
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
  const sm = computed(() =>
    import.meta.env.SSR
      ? 0
      : window.innerWidth <= 960
  );

  const refs = ref<IIndexable>({
    about_us: null,
    our_experiences: null,
    our_services: null,
    blog: null,
  });

  const companyGoals = [
    "lang-66a5276b-a9c3-4c30-a282-81e3e62b79c0",
    "lang-23c845cb-d7b8-461b-97f8-9c0e9f70bb3f",
    "lang-38f9059b-308e-461c-b1cf-6575cd0482f5",
    "lang-4af24972-5c28-489f-8d0a-c3a74fa0a033",
    "lang-64cf57cf-7fbc-4d45-ab78-ecc0ca8df0db",
    "lang-35e41beb-397e-4d59-b316-b260f5d7a575",
  ];
  const partners = [
    {
      _id: "6315b5da3209f437e7b856da",
      logo: "/image/e37b8f4f-b03e-491d-b0ee-c257bc9e98fc.png",
      name_en: "Bakai Bank",
      name_ru: "Бакай Банк",
      __v: 0,
    },
    {
      _id: "6315bdff3209f437e7b85717",
      logo: "/image/3dbe7d4b-ed4b-4a67-b078-0aa11bbfd876.png",
      name_en: "Commercial Bank Kyrgyzstan",
      name_ru: "Коммерческий банк КЫРГЫЗСТАН",
      __v: 0,
    },
    {
      _id: "632d578feb84e6277da48bc1",
      logo: "/image/cde00331-ce5c-46d6-863e-a1bbf553308c.png",
      name_en: "RSK Bank",
      name_ru: "РСК Банк",
      __v: 0,
    },
  ];
  const newsFeed = [
    {
      _id: "6315ce6c3209f437e7b857c4",
      title_en: "Islamic Finance issues",
      subtitle_en:
        "On August 29, 2022, a meeting on the development of Islamic principles of financing in the field of the stock market (sukuk) and insurance (takaful) was held in the small hall of the Ministry of Economy and Trade.",
      content_en:
        "<p>There were representatives of commercial banks, government agencies such as the National Bank, Financial Supervision, representatives of the stock exchange. Important questions were raised regarding the significance of the transition to Islamic finance and its impact on all areas of society. The opinions of representatives of commercial banks and organizations were heard.</p><p>As a result of the meeting, it was decided to create a working group, which in turn will begin to study the practical part of the IPF.</p><p>&nbsp;</p><p>&nbsp;</p>",
      title_ru:
        "Проблемы Исламского Финансирования",
      subtitle_ru:
        "29 августа 2022 года в малом зале Министерства экономики и торговли было проведено собрание по вопросу развития исламских принципах финансирования в сфере фондового рынка (сукук) и страхования (такафул). ",
      content_ru:
        "<p>На заседании присутствовали представители комбанков, государственных структур таких как Нацбанк, Финнадзор, представители фондовой биржи. Поднимались важные вопросы касающиеся значимости перехода на исламское финансирование и его влияние на все сферы общества. Были выслушаны мнения представителей коммерческих банков и организаций.<br>По итогам собрания, было принято решение о создании рабочей группы, которая в свою очередь приступит к изучению практической части ИПФ.</p>",
      imageName: "photo_2022-09-09_11-55-37.jpg",
      imageUrl:
        "/image/fd9d29aa-a24d-46b0-a238-2d5cab187229.jpeg",
      createdAt: "05.09.2022 05:48:51",
      __v: 0,
    },
    {
      _id: "6315bd5f3209f437e7b85714",
      title_en: "Islamic Financing",
      subtitle_en:
        "Opportunities and challenges of Islamic banking in the CIS regions.",
      content_en:
        "<p>In June of this year, the international conference Astana Finance Days 2022 was held in Nur-Sultan. The theme of the conference was “Opportunities and Challenges of Islamic Banking in the CIS Regions”, which raised topical issues regarding the commonality between Islamic financial and socially responsible markets, and what they can learn from each other. And the social responsibility of Islamic banks. We, as a company interested in the development of Islamic finance, took an active part in the conference and discovered new opportunities in this direction.</p>",
      title_ru: "Исламские Финансы",
      subtitle_ru:
        "Возможности и вызовы исламского банкинга в регионах СНГ.",
      content_ru:
        "<p>В июне этого года, в Нур-Султане прошла международная конференция Astana Finance Days 2022. Темой конференции была “Возможности и вызовы исламского банкинга в регионах СНГ”, где поднимались актуальные вопросы, касательно общности между исламским финансовым и социально ответственным рынками, чем они могут учиться друг у друга. О социальной ответственности исламских банков. Мы, как компания, заинтересованная в развитии Исламских финансов, приняла активное участие в конференции и открыла для себя новые возможности в данном направлении.</p>",
      imageName: "photo_2022-09-09_11-55-04.jpg",
      imageUrl:
        "/image/b28016b0-59ab-48b7-b4d7-fa39ba308717.jpeg",
      createdAt: "05.09.2022 05:48:51",
      __v: 0,
    },
    {
      _id: "6315b9ba3209f437e7b85711",
      title_en: "Consulting",
      subtitle_en:
        "We are exited to annouce, we've started accepting requests for Islamic Finance consulations.",
      content_en:
        "<p>Consulting includes complete list of questions, where terms and cost of project realization are negotiated. We take on such key moments as preparation of permits and its approvement by the National Bank, conducting employee training events, developing banking regulations etc. You can find the full list of services on our website, in the “Our Services” section.</p><p>&nbsp;</p>",
      title_ru: "Консультации",
      subtitle_ru:
        "Рады сообщить что мы начали принимать заявки на консультации по Исламским финансам.",
      content_ru:
        "<p>Консультирование включает в себя полный перечень вопросов, где обговариваются срок и стоимость реализации проекта. Мы берем на себя такие ключевые моменты как подготовка разрешительных документов и их одобрение со стороны Национального Банка, проведение мероприятий по обучению сотрудников, разработка банковских положений и прочее. Ознакомиться с полным перечнем услуг, Вы можете у нас на сайте, в разделе Наши услуги.</p>",
      imageName: "services.png",
      imageUrl:
        "/image/b99ac917-67ce-4b99-b3d6-36a183320722.png",
      createdAt: "05.09.2022 05:48:51",
      __v: 0,
    },
  ];
  const services = [
    {
      _id: "6315b6923209f437e7b856e7",
      name_en: "Personnel formation",
      name_ru: "Формирование кадрового состава",
      content_en:
        "<ul><li>Assistance in selection and training of the staff, the creation of the Shariah department;&nbsp;</li><li>Providing the services of the Shariah Supervisory Board, if necessary;&nbsp;</li><li>Resolving issues related to the formation of key positions in the department;</li><li>Staff training includes taking into account all the risks associated with financing.</li></ul>",
      content_ru:
        "<ul><li>Содействие в подборе и обучении персонала, создании Шариатского отдела;&nbsp;</li><li>Предоставление услуг Шариатского наблюдательного Совета при необходимости;&nbsp;</li><li>Решение вопросов по формированию ключевых должностей в отделе;&nbsp;</li><li>Обучение персонала включает учет всех рисков, связанных с финансированием.</li></ul>",
      __v: 0,
    },
    {
      _id: "6315b6cc3209f437e7b856ea",
      name_en:
        "Strategic and operational planning",
      name_ru:
        "Стратегическое и операционное планирование",
      content_en:
        "<ul><li>Preparation of a development plan and organizational structure;</li><li>Development of job descriptions and staff lists;&nbsp;</li><li>Conducting analysis based on the results of business processes, making practical recommendations.</li></ul>",
      content_ru:
        "<ul><li>Подготовка плана развития и организационной структуры;</li><li>Разработка должностных инструкций и штатного расписания сотрудников;</li><li>Проведение анализа по результатам бизнес процессов, внесение практических рекомендаций</li></ul>",
      __v: 0,
    },
    {
      _id: "6315b6e93209f437e7b856ed",
      name_en: "Formation of methodological base",
      name_ru:
        "Формирование методологической базы",
      content_en:
        "<p>Writing an internal regulatory framework:&nbsp;</p><ul><li>regulations;&nbsp;</li><li>procedures;&nbsp;</li><li>policies;&nbsp;</li><li>instructions;</li><li>methodologies on the Islamic Principle of Financing.</li></ul>",
      content_ru:
        "<ul><li>Написание внутренней нормативной базы:&nbsp;</li><li>положений;&nbsp;</li><li>процедур;&nbsp;</li><li>политик;&nbsp;</li><li>инструкций;&nbsp;</li><li>методик по Исламскому Принципу Финансирования.</li></ul>",
      __v: 0,
    },
    {
      _id: "6315b7123209f437e7b856f0",
      name_en: "Practical base",
      name_ru: "Практическая база",
      content_en:
        "<ul><li>Implementation of all business procedures from issuance of finance to deposit products;&nbsp;</li><li>Preparation of tariff plans and operational activity.</li></ul>",
      content_ru:
        "<ul><li>Реализация всех бизнес процессов от выдачи финансирований до депозитных продуктов;&nbsp;</li><li>Разработка тарифного плана и налаживание операционной работы.</li></ul>",
      __v: 0,
    },
    {
      _id: "6315b7353209f437e7b856f3",
      name_en: "External Communication",
      name_ru: "Внешняя коммуникация",
      content_en:
        "<ul><li>We also represent the interests of the financial institution on local and international platforms;&nbsp;</li><li>Negotiations with the international financial institutions to attract investment.</li></ul>",
      content_ru:
        "<ul><li>Мы также предоставляем интересы финансового учреждения на международных и местных площадках;&nbsp;</li><li>Проведение переговоров для привлечения инвестиций с международными финансовыми институтами.</li></ul>",
      __v: 0,
    },
    {
      _id: "6315b75d3209f437e7b856f6",
      name_en:
        "Software Supply for Islamic banking (window)",
      name_ru:
        "Поставка программного комплекса по ИПФ",
      content_en:
        "<ul><li>Supply of the automated banking system “iCore TumarBank”;</li><li>Support IPF in accordance with international AAOIFI standards;&nbsp;</li><li>Technical support of the software is&nbsp; provided as well.</li></ul>",
      content_ru:
        "<ul><li>Поставка автоматизированной банковской системы «iCore TumarBank»;</li><li>Поддержка ИПФ по международным стандартам AAOIFI;</li><li>Техническое сопровождение программного комплекса.</li></ul>",
      __v: 0,
    },
  ];

  const activeGoTop = ref(false);

  function handleScroll() {
    activeGoTop.value =
      window.scrollY > window.innerHeight;
  }
  function scrollIntoHandler(key: string) {
    if (refs.value[key]) {
      refs.value[key].scrollIntoView({
        block:
          key === "about_us"
            ? "start"
            : key === "contacts"
            ? "end"
            : "center",
        behavior: "smooth",
      });
    }
  }

  onMounted(() => {
    console.log(pageContext);
    if (pageContext.urlParsed.search.section) {
      setTimeout(
        () =>
          scrollIntoHandler(
            pageContext.urlParsed.search.section
          ),
        0
      );
    }
    // store.getNewsFeed();
    // store.getPartnersList();
    // store.getServicesList();
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
