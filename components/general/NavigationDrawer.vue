<template>
  <v-navigation-drawer
    class="py-5 px-5"
    :style="{
      width: 'fit-content',
      background: '#4b5757',
    }"
    location="right"
    bottom
    temporary
  >
    <div class="top_controle">
      <LanguageSelect />
      <v-icon
        class="close_icon"
        icon="mdi-close"
        color="white"
        @click.stop="props.closeDrawer"
      ></v-icon>
    </div>
    <v-list class="v-list">
      <v-list-item
        v-for="navItem in navItemList"
        class="nav-item"
        rounded="xl"
        @click.stop="
          navHandler(
            navItem.route,
            navItem.section
          )
        "
        :style="{ textTransform: 'uppercase' }"
      >
        {{ $t(navItem.label) }}
      </v-list-item>
      <v-list-item
        class="nav-item"
        rounded="xl"
        @click="props.navHandler('/admin')"
        :style="{ textTransform: 'uppercase' }"
        v-if="isAdmin"
        >{{
          $t(
            "lang-a0924aa2-9523-4a96-88ce-a5292f398c6a"
          )
        }}</v-list-item
      >
    </v-list>
    <div style="padding: 0px 16px">
      <div
        class="flex-box"
        style="gap: 10px; margin-top: 15px"
      >
        <img
          class="contact-icon icon-color-white"
          src="/assets/adress.svg"
          alt="adress icon"
        />
        <p
          class="text-header d-flex align-center"
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
          class="contact-icon icon-color-white"
          src="/assets/tel.svg"
          alt="phone icon"
        />
        <p
          class="text-header d-flex align-center"
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
          class="contact-icon icon-color-white"
          src="/assets/email.svg"
          alt="email icon"
        />
        <p
          class="text-header d-flex align-center"
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
            ><span :data-hover="emailAddress">{{
              emailAddress
            }}</span></a
          >
        </p>
      </div>
      <div
        class="social-media-wrapper flex-box mt-4"
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
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { computed, PropType } from "vue";

  import LanguageSelect from "./LanguageSelect.vue";

  import { navItemList } from "@/utils/constants";

  import { useAuthStore } from "@/stores/auth";

  const phoneNumber = import.meta.env.VITE_PHONE;
  const emailAddress = import.meta.env.VITE_EMAIL;

  const props = defineProps({
    closeDrawer: {
      type: Function as PropType<() => void>,
    },
    navHandler: {
      type: Function as PropType<
        (route: string, section?: string) => void
      >,
    },
  });

  const authStore = useAuthStore();

  const isAdmin = computed(
    () => authStore.isAdmin
  );
</script>

<style scoped>
  .contact-icon {
    width: 14px;
    height: 14px;
  }
  .top_controle {
    position: relative;
  }
  .close_icon {
    position: absolute;
    top: 7px;
    right: 0;
  }
</style>
