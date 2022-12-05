<template>
  <div class="page_container">
    <Header
      :scrollIntoHandler="props.scrollIntoHandler"
    />
    <div class="content"><slot></slot></div>
    <Footer
      :scrollIntoHandler="props.scrollIntoHandler"
    />
  </div>
</template>

<script lang="ts" setup>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  import { PropType } from "vue";

  const props = defineProps({
    scrollIntoHandler: {
      type: Function as PropType<
        (key: string) => void
      >,
      default: () => {},
    },
  });
</script>
