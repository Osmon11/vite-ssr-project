<template>
  <nav>
    <div class="flex-box">
      <p
        v-for="navItem in navItemList"
        @click="
          props.navHandler(
            navItem.route,
            navItem.section
          )
        "
        class="nav-item"
      >
        {{ $t(navItem.label) }}
      </p>
      <p
        @click="
          props.navHandler(
            '/?section=contacts',
            'contacts'
          )
        "
        class="nav-item"
      >
        {{
          $t(
            "lang-46a7bb85-b9d4-460e-b0cd-d5b7ac7a870e"
          )
        }}
      </p>
      <p
        @click="props.navHandler('/admin')"
        class="nav-item"
        v-if="isAdmin"
      >
        {{
          $t(
            "lang-a0924aa2-9523-4a96-88ce-a5292f398c6a"
          )
        }}
      </p>
      <LanguageSelect />
    </div>
  </nav>
</template>

<script lang="ts" setup>
  import { computed, PropType } from "vue";

  import LanguageSelect from "./LanguageSelect.vue";

  import { navItemList } from "@/utils/constants";

  import { useAuthStore } from "@/stores/auth";

  const props = defineProps({
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
