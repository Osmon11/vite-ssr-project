<template>
  <footer>
    <div
      class="d-flex justify-center align-center"
    >
      <div
        v-if="xs"
        class="d-flex flex-column justify-center align-center"
      >
        <div
          class="logo-wrapper"
          @click="onLogoClick"
          static
        >
          <img
            class="logo"
            src="/assets/AA_LOGO.svg"
            alt="Amanat Advisory"
          />
        </div>
        <v-divider
          class="w-100 my-4"
          color="white"
        ></v-divider>
        <div
          class="social-media-wrapper flex-box"
        >
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
        <v-btn
          color="#61a375"
          class="text-white mt-4"
          @click="feedbackDialog = true"
          :style="{
            marginTop: xs || sm ? 40 : 0,
          }"
        >
          {{
            $t(
              "lang-a3bed61a-5493-4c37-9959-704e03364489"
            )
          }}
        </v-btn>
      </div>
      <div
        v-if="!xs"
        class="footer-content d-flex flex-row justify-center align-start flex-wrap"
      >
        <div class="column">
          <p class="title">
            {{
              $t(
                "lang-a3bed61a-5493-4c37-9959-704e03364489"
              )
            }}
          </p>
          <div
            class="social-media-wrapper flex-box"
          >
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
          <div
            class="flex-box"
            style="gap: 10px; margin-top: 15px"
          >
            <img
              class="icon-color-white contact-icon"
              src="/assets/adress.svg"
              alt="adress icon"
            />
            <div
              class="d-flex align-center"
              style="gap: 5px"
            >
              <p class="text-footer">
                {{
                  $t(
                    "lang-08f5ef7e-a2f5-40ff-8030-9928c3e9711b"
                  )
                }}
              </p>
              <a
                class="hover-effect"
                :href="`http://maps.google.com/?q=${$t(
                  'lang-81aabe66-1dce-4aa8-b0f2-c8c3ef08ee08'
                )}`"
                target="_blank"
                rel="noopener noreferrer"
                ><span
                  :data-hover="
                    $t(
                      'lang-81aabe66-1dce-4aa8-b0f2-c8c3ef08ee08'
                    )
                  "
                  >{{
                    $t(
                      "lang-81aabe66-1dce-4aa8-b0f2-c8c3ef08ee08"
                    )
                  }}</span
                ></a
              >
            </div>
          </div>
          <div
            class="flex-box"
            style="gap: 10px"
          >
            <img
              class="icon-color-white contact-icon"
              src="/assets/tel.svg"
              alt="phone icon"
            />
            <div
              class="d-flex align-center"
              style="gap: 5px"
            >
              <p class="text-footer">
                {{
                  $t(
                    "lang-ecf45fc4-2864-49bf-af25-72d4c5cd361d"
                  )
                }}
              </p>
              <a
                class="hover-effect"
                :href="`tel:${phoneNumber}`"
                ><span
                  :data-hover="`+${phoneNumber}`"
                  >{{ `+${phoneNumber}` }}</span
                ></a
              >
            </div>
          </div>
          <div
            class="flex-box"
            style="gap: 10px"
          >
            <img
              class="icon-color-white contact-icon"
              src="/assets/email.svg"
              alt="email icon"
            />
            <div
              class="d-flex align-center"
              style="gap: 5px"
            >
              <p class="text-footer">
                {{
                  $t(
                    "lang-08f5ef7e-a2f5-40ff-8030-9928c3e9711b"
                  )
                }}
              </p>
              <a
                class="hover-effect"
                :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`"
                target="_blank"
                rel="noopener noreferrer"
                ><span
                  :data-hover="emailAddress"
                  >{{ emailAddress }}</span
                ></a
              >
            </div>
          </div>
        </div>
        <div class="column">
          <p class="title">
            {{
              $t(
                "lang-9e2584b8-3eac-467b-907a-f571afa1580d"
              )
            }}
          </p>
          <p
            class="nav-item text-footer"
            @click="navHandler('/', 'about_us')"
          >
            {{
              $t(
                "lang-d8bf7dcf-c03c-4fd6-ab84-5702e4f0c7b8"
              )
            }}
          </p>
          <p
            class="nav-item text-footer"
            @click="
              navHandler('/', 'our_services')
            "
          >
            {{
              $t(
                "lang-789737de-eb6a-47de-ab69-33aa5670867e"
              )
            }}
          </p>
          <p
            class="nav-item text-footer"
            @click="navHandler('/news-feed')"
          >
            {{
              $t(
                "lang-43551998-d49d-41a1-8287-25a880594e94"
              )
            }}
          </p>
        </div>
        <div class="column">
          <p class="title">
            {{
              $t(
                "lang-10432732-d2f2-4a3e-8f17-0b26965ee54b"
              )
            }}
          </p>
          <p
            class="nav-item text-footer"
            @click="navHandler('/employees')"
          >
            {{
              $t(
                "lang-55f459ef-9533-4515-971c-ccd8e9d578be"
              )
            }}
          </p>
        </div>
        <div class="column">
          <v-btn
            color="#61a375"
            class="text-white"
            @click="feedbackDialog = true"
            :style="{
              marginTop: xs || sm ? 40 : 0,
            }"
          >
            {{
              $t(
                "lang-a3bed61a-5493-4c37-9959-704e03364489"
              )
            }}
          </v-btn>
        </div>
      </div>
    </div>
    <p
      class="text-caption text-center"
      style="
        width: 100%;
        color: #c5c5c5;
        margin-top: 37px;
      "
    >
      {{
        $t(
          "lang-4a3ec30f-b262-4c79-91a8-2badeb083969"
        )
      }}
    </p>
  </footer>
  <!-- Floating Action Button -->
  <div
    class="floating-container"
    v-if="!isSPAPages"
  >
    <div
      class="floating-button d-flex align-center justify-center"
      @click="scrollToTop"
    >
      <v-icon icon="mdi-chevron-up"></v-icon>
    </div>
    <div class="element-container">
      <span
        class="float-element flex-box-center tooltip-left"
        ><a
          class="d-flex align-center justify-center"
          href="https://www.facebook.com/amanatadvisory.kg"
          target="_blank"
          ><img
            :draggable="false"
            class="social-media-icon active"
            src="/assets/facebook-colorful.svg"
            alt="facebook icon" /></a
      ></span>
      <span class="float-element flex-box-center"
        ><a
          class="d-flex align-center justify-center"
          href="https://wa.me/996508081071"
          target="_blank"
          ><img
            :draggable="false"
            class="social-media-icon active"
            src="/assets/whatsapp-colorful.svg"
            alt="whatsapp icon" /></a
      ></span>
      <span class="float-element flex-box-center"
        ><a
          class="d-flex align-center justify-center"
          href="https://t.me/+996555081071"
          target="_blank"
          ><img
            :draggable="false"
            class="social-media-icon active"
            src="/assets/telegram-colorful.svg"
            alt="telegram icon" /></a
      ></span>
      <span class="float-element flex-box-center"
        ><a
          class="d-flex align-center justify-center"
          href="https://www.instagram.com/amanatadvisory.kg/"
          target="_blank"
          ><img
            :draggable="false"
            class="social-media-icon active"
            src="/assets/instagram-round-color-icon.svg"
            alt="instagram icon" /></a
      ></span>
      <span
        class="float-element flex-box-center tooltip-left"
        ><a
          class="d-flex align-center justify-center"
          :href="`tel:${phoneNumber}`"
          ><img
            class="icon-color-white contact-icon"
            src="/assets/tel.svg"
            alt="phone icon" /></a
      ></span>
    </div>
  </div>
  <FeedbackDialog v-model="feedbackDialog" />
</template>

<script lang="ts" setup>
  import { ref, computed } from "@vue/reactivity";
  // import { navigate } from "vite-plugin-ssr/client/router";

  import FeedbackDialog from "@/components/dialogs/FeedbackDialog.vue";

  import { usePageContext } from "@/renderer/usePageContext";
  import { useNavigate } from "@/utils/useNavigate";

  const phoneNumber = import.meta.env.VITE_PHONE;
  const emailAddress = import.meta.env.VITE_EMAIL;

  const { navigate } = useNavigate();
  const pageContext = usePageContext();

  const props = defineProps([
    "scrollIntoHandler",
  ]);
  const feedbackDialog = ref(false);
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
  const isHome = computed(
    () => pageContext.urlPathname === "/"
  );
  const isSPAPages =
    pageContext.urlOriginal === "/admin" ||
    pageContext.urlOriginal === "/login";

  // --> NAVIGATION
  // action handlers
  function onLogoClick() {
    if (isHome.value) {
      props.scrollIntoHandler("top");
    } else {
      navigate("/");
    }
  }
  function navHandler(
    route: string,
    section?: string
  ) {
    if (section && isHome.value) {
      props.scrollIntoHandler(section);
    } else {
      navigate(route);
    }
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
</script>

<style scoped>
  footer {
    padding: 70px 0px 35px;
    background: #4b5757;
  }
  .footer-content {
    width: 100%;
    max-width: 1250px;
    gap: 50px;
  }
  .title {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    color: #ffffff;
    text-transform: uppercase;
  }

  .text-footer,
  .hover-effect {
    width: fit-content;
    color: #ffffff;
    font-size: 12px;
    font-weight: 300;
    line-height: 20px;
    padding: 0px;
  }
  .hover-effect,
  .hover-effect span {
    color: #ffffff;
    font-weight: 500;
  }
  .logo-wrapper {
    cursor: pointer;
  }
  .logo {
    width: 64px;
    height: 64px;
  }
  .contact-icon {
    width: 14px;
    height: 14px;
  }
  .column {
    width: fit-content;
  }
  @media (min-width: 0px) and (max-width: 600px) {
    footer {
      padding: 40px;
    }
    .footer-content {
      padding: 0px 15px;
      gap: 20px;
      justify-content: flex-start;
    }
    .column {
      width: fit-content;
      min-width: 40%;
    }
  }
  @media (min-width: 600px) and (max-width: 960px) {
    .footer-content {
      padding: 0px 15px;
      gap: 20px;
      justify-content: flex-start;
    }
    .column {
      width: fit-content;
      min-width: calc(25% - 50px);
    }
  }
</style>
