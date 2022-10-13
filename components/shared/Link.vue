<template>
  <a
    :class="{
      active: pageContext.urlPathname === $attrs.href && !props.static,
    }"
  >
    <slot />
  </a>
</template>
<style scoped>
  a {
    text-decoration: none;
    padding: 3px 10px;
  }
  a.active {
    color: #006625;
    text-decoration: underline;
  }
</style>
<script lang="ts" setup>
  import { usePageContext } from "@/renderer/usePageContext";
  const pageContext = usePageContext();

  const props = defineProps({ static: { type: Boolean, default: false } });
</script>
