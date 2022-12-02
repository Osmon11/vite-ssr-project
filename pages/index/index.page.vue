<template>
  <Header /><Slider />
  <div
    class="flex-box-center"
    style="background-color: #f5f5f5"
  >
    <main>
      <section
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
              textAlign: xs ? 'center' : 'start',
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
      style="margin-top: 20px; padding: 0px 15px"
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
          {{ $t("general.подробней") }}
        </v-btn></a
      >
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref } from "vue";

  import Header from "@/components/Header.vue";
  import Slider from "@/components/Slider.vue";
  import MarqueeText from "@/components/MarqueeText.vue";

  import { apiUrl } from "@/utils/constants";

  const xs = computed(() =>
    import.meta.env.SSR
      ? 0
      : window.innerWidth <= 600
  );
  // const sm = computed(() =>
  //   import.meta.env.SSR
  //     ? 0
  //     : window.innerWidth <= 960
  // );

  const refs = ref({
    about_us: null,
    our_experiences: null,
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
