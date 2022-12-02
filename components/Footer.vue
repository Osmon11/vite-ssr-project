<template>
  <footer>
    <div
      class="d-flex justify-center align-center"
    >
      <div
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
            <p
              class="text-footer d-flex align-center"
            >
              {{
                $t(
                  "lang-08f5ef7e-a2f5-40ff-8030-9928c3e9711b"
                )
              }}<a
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
            </p>
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
            <p
              class="text-footer d-flex align-center"
            >
              {{
                $t(
                  "lang-ecf45fc4-2864-49bf-af25-72d4c5cd361d"
                )
              }}<a
                class="hover-effect"
                :href="`tel:${phoneNumber}`"
                ><span
                  :data-hover="`+${phoneNumber}`"
                  >{{ `+${phoneNumber}` }}</span
                ></a
              >
            </p>
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
            <p
              class="text-footer d-flex align-center"
            >
              {{
                $t(
                  "lang-08f5ef7e-a2f5-40ff-8030-9928c3e9711b"
                )
              }}<a
                class="hover-effect"
                :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`"
                target="_blank"
                rel="noopener noreferrer"
                ><span
                  :data-hover="emailAddress"
                  >{{ emailAddress }}</span
                ></a
              >
            </p>
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
            @click="
              navigationHandler(
                routeName === 'home'
                  ? 'about_us'
                  : '/',
                'home',
                { section: 'about_us' },
                routeName === 'home'
              )
            "
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
              navigationHandler(
                routeName === 'home'
                  ? 'our_services'
                  : '/',
                'home',
                { section: 'our_services' },
                routeName === 'home'
              )
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
            @click="
              navigationHandler(
                '/our-news',
                'our-news'
              )
            "
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
            @click="
              navigationHandler(
                '/shariah-board',
                'shariah-board'
              )
            "
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
            @click="feedbackModal = true"
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
  <div class="floating-container">
    <div
      class="floating-button"
      @click="scrollToTop"
    >
      <v-icon icon="mdi-chevron-up"></v-icon>
    </div>
    <div class="element-container">
      <span
        class="float-element flex-box-center tooltip-left"
        ><a
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
        ><a :href="`tel:${phoneNumber}`"
          ><img
            class="icon-color-white contact-icon"
            src="/assets/tel.svg"
            alt="phone icon" /></a
      ></span>
    </div>
  </div>
  <FeedbackModal v-model="feedbackModal" />
</template>

<script lang="ts" setup>
  import { ref, computed } from "@vue/reactivity";
  import { usePageContext } from "@/renderer/usePageContext";

  import FeedbackModal from "@/components/dialogs/FeedbackModal.vue";

  const pageContext = usePageContext();

  const props = defineProps([
    "scrollIntoHandler",
  ]);
  const feedbackModal = ref(false);
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

  function navigationHandler(
    path: string,
    name: string,
    query?: { section: string },
    scrollInto = false
  ) {
    if (scrollInto) {
      props.scrollIntoHandler(path);
    } else {
      console.log({ name, query });
    }
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const phoneNumber = import.meta.env.VITE_PHONE;
  const emailAddress = import.meta.env.VITE_EMAIL;
  const routeName = pageContext.urlPathname;
</script>

<style scoped>
  .hover-effect {
    position: relative;
    display: inline-block;
    outline: none;
    overflow: hidden;
    text-transform: lowercase;
  }
  .hover-effect span {
    position: relative;
    display: inline-block;
    -webkit-transition: -webkit-transform 0.3s;
    -moz-transition: -moz-transform 0.3s;
    transition: transform 0.3s;
  }
  .hover-effect span::before {
    position: absolute;
    top: 100%;
    content: attr(data-hover);
    font-weight: 700;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .hover-effect:hover span,
  .hover-effect:focus span {
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    transform: translateY(-100%);
  }
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

  .text-footer {
    width: fit-content;
    color: #ffffff;
    font-size: 12px;
    font-weight: 300;
    line-height: 20px;
    padding: 0px;
    gap: 5px;
  }
  .text-footer a,
  .text-footer span {
    color: #ffffff;
    font-weight: 500;
  }
  .contact-icon {
    width: 14px;
    height: 14px;
  }
  .column {
    width: fit-content;
  }
  @media (min-width: 0px) and (max-width: 600px) {
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
