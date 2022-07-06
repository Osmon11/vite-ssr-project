<script setup>
  import { computed, toRefs } from "vue";
  const props = defineProps([
    "item",
    "number",
    "activeNumber",
    "setActiveNumber",
  ]);
  const { item, number, activeNumber, setActiveNumber } = toRefs(props);
  let active = computed(() => activeNumber.value === number.value);
</script>

<template>
  <div class="accordeon_item">
    <div
      class="flex_box"
      style="cursor: pointer; gap: 7px"
      @click="setActiveNumber(active ? 0 : number)"
    >
      <svg
        class="svg_icon"
        :style="{ transform: `rotate(${active ? 0 : 180}deg)` }"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M62.4 744 520 288 968 744Z" />
      </svg>
      <div class="summary">{{ item.summary }}</div>
    </div>
    <div
      class="details collapse"
      :style="{ paddingBottom: `${active ? 15 : 0}px` }"
      :data-expanded="active"
      v-html="item.details"
    ></div>
  </div>
</template>

<style scoped>
  .accordeon_item {
    width: 100%;
    height: fit-content;
    padding: 0px 15px;
    border-bottom: 1px solid #d4d4d4;
  }
  .summary {
    font-weight: 700;
    line-height: 20px;
    color: #47425d;
    margin: 0;
    padding: 15px 0px;
    outline: none;
  }
  .details {
    height: fit-content;
  }
</style>
