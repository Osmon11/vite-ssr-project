<template>
  <Select
    :value="locale"
    @change="onLocaleChange"
    :class="{
      activeSelect:
        pageContext.urlPathname !== '/',
    }"
    :style="{ margin: '0px 15px' }"
    :icon="false"
    name="language"
  >
    <template #render-value>
      <div
        class="flex-box"
        style="gap: 8px"
      >
        <img
          :src="
            locale === languages.primary
              ? '/assets/united-kingdom.svg'
              : '/assets/russia.svg'
          "
          :alt="
            locale === languages.primary
              ? 'united kingdom flag'
              : 'russian flag'
          "
          style="width: 20px; height: 20px"
        />
        <p>
          {{ locale }}
        </p>
      </div></template
    >
    <template #items="{ handleChange }"
      ><div
        class="select-item"
        :class="{
          active: languages.primary === locale,
        }"
        @click="handleChange(languages.primary)"
      >
        <div
          class="flex-box"
          style="gap: 8px; width: 42px"
        >
          <img
            src="/assets/united-kingdom.svg"
            alt="united kingdom flag"
            style="width: 20px; height: 20px"
          />
          <p>en</p>
        </div>
      </div>
      <div
        class="select-item"
        :class="{
          active: languages.secondary === locale,
        }"
        @click="handleChange(languages.secondary)"
      >
        <div
          class="flex-box"
          style="gap: 8px; width: 42px"
        >
          <img
            src="/assets/russia.svg"
            alt="russian flag"
            style="width: 20px; height: 20px"
          />
          <p>ru</p>
        </div>
      </div>
    </template></Select
  >
</template>

<script lang="ts" setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";
  import { usePageContext } from "@/renderer/usePageContext";

  import Select from "@/components/shared/Select.vue";

  import { useAppStore } from "@/stores/app";

  const { locale } = useI18n();

  const pageContext = usePageContext();

  const appStore = useAppStore();

  // --> SELECT LANGUAGE
  const languages = computed(
    () => appStore.getLanguages
  );
  // on change language
  function onLocaleChange(newlocale: string) {
    locale.value = newlocale;
  }
</script>
